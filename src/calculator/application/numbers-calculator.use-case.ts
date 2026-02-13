import {OutOfRangeException} from "@/calculator/domain/exceptions/out-of-range-exception.ts";
import {UnknownCategoryException} from "@/calculator/domain/exceptions/unknown-category-exception.ts";
import {UnknownGrammarException} from "@/calculator/domain/exceptions/unknown-grammar-exception.ts";
import {CannotCalculateNumberException} from "@/calculator/domain/exceptions/cannot-calculate-number-exception.ts";
import {SpanishTranslatorService} from "@/calculator/domain/services/translation/spanish-translator.service.ts";
import {EnglishTranslatorService} from "@/calculator/domain/services/translation/english-translator.service.ts";
import {TranslationService} from "@/calculator/domain/services/translation.service.ts";
import {GrammarElementParserService} from "@/calculator/domain/services/grammar-element-parser-service.ts";
import {GrammarJsonRepository} from "@/calculator/infrastructure/repository/grammar-json-repository.ts";
import type {GrammarRepository} from "@/calculator/domain/repositories/grammar-repository.ts";

export class NumbersCalculatorUseCase {
    private static instance: NumbersCalculatorUseCase;
    constructor(
        private readonly grammarElementParserService: GrammarElementParserService,
        private readonly grammarRepository: GrammarRepository,
        private readonly translatorService: TranslationService,
    ) {}

    async execute(input: string): Promise<string> {
        try {
            return this.tryExecute(input);
        } catch (e) {
            if (e instanceof OutOfRangeException) {
                return "some number is out of range (0-999)";
            }

            if (
                e instanceof UnknownCategoryException ||
                e instanceof UnknownGrammarException ||
                e instanceof CannotCalculateNumberException
            ) {
                return "invalid string";
            }

            throw e; // rethrow unexpected errors
        }
    }

    public static async getInstance(): Promise<NumbersCalculatorUseCase> {
        if (!NumbersCalculatorUseCase.instance) {
            NumbersCalculatorUseCase.instance =
                new NumbersCalculatorUseCase(
                    await GrammarElementParserService.getInstance(),
                    await GrammarJsonRepository.getInstance(),
                    new TranslationService(
                        new SpanishTranslatorService(),
                        new EnglishTranslatorService()
                    )
                );
        }

        return NumbersCalculatorUseCase.instance;
    }

    private tryExecute(input: string): string {
        if (!input || input.trim() === "") {
            return "empty input";
        }

        const parts = input.split(/( más | mas | plus | \+ )/iu);

        let result: number = 0;
        for (const part of parts) {
            const trimmed = part.trim();

            if (!trimmed || /^(más|mas|plus|\+)$/iu.test(trimmed)) {
                continue;
            }

            const grammarList = this.grammarElementParserService.parse(
                trimmed
            );

            // @ts-ignore
            const language = grammarList[0].language();

            const grammar = this.grammarRepository.find(grammarList, language);

            result += grammar.apply(trimmed.split(/[\s]+/iu));
        }

        //this.translatorService.translate(result, result.getLanguage());

        return String(result);
    }
}