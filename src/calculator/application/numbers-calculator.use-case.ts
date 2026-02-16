import {OutOfRangeError} from "@/calculator/domain/exceptions/out-of-range.error.ts";
import {SpanishTranslatorService} from "@/calculator/domain/services/translation/spanish-translator.service.ts";
import {EnglishTranslatorService} from "@/calculator/domain/services/translation/english-translator.service.ts";
import {TranslationService} from "@/calculator/domain/services/translation.service.ts";
import {GrammarElementParserService} from "@/calculator/domain/services/grammar-element-parser-service.ts";
import {GrammarJsonRepository} from "@/calculator/infrastructure/repositories/grammar-json-repository.ts";
import type {GrammarRepository} from "@/calculator/domain/repositories/grammar-repository.ts";
import {GrammarElementsNotFoundError} from "@/calculator/domain/exceptions/grammar-elements-not-found.error.ts";
import {
    SingleNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/single-number-grammar-element-spanish.ts";
import {
    HundredNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/hundred-number-grammar-element-spanish.ts";
import {
    SingleNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/single-number-grammar-element-english.ts";
import {Language} from "@/calculator/domain/value-objects/language.ts";
import {
    TensNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/tens-number-grammar-element-spanish.ts";
import {GrammarNotFoundError} from "@/calculator/domain/exceptions/grammar-not-found.error.ts";
import {
    TensNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/tens-number-grammar-element-english.ts";

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
            if (e instanceof OutOfRangeError) {
                return "some number is out of range (0-999)";
            }

            if (
                e instanceof GrammarElementsNotFoundError ||
                e instanceof GrammarNotFoundError
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
                    await TranslationService.getInstance(),
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
        let language: Language = Language.ENGLISH;
        let isNumeric: boolean = false;
        for (const part of parts) {
            let trimmed = part.trim();

            if (!trimmed || /^(más|mas|plus|\+)$/iu.test(trimmed)) {
                continue;
            }

            if (this.isNumeric(trimmed)) {
                const partNumber = Number(trimmed);
                if (partNumber < 0 || partNumber >= 1000) {
                    throw new OutOfRangeError();
                }
                result += partNumber;
                isNumeric = true;
                continue;
            }

            trimmed = this.prepareInput(trimmed);

            const grammarList = this.grammarElementParserService.parse(
                trimmed
            );

            if (grammarList[0]) {
                language = grammarList[0].language();

                const grammar = this.grammarRepository.find(grammarList, language);

                result += grammar.apply(trimmed.split(/[\s]+/iu));
            }
        }

        if (result < 0 || result >= 1000) {
            throw new OutOfRangeError();
        }

        if (isNumeric) {
            return String(result);
        }

        return this.translatorService.translate(result, language);
    }

    private isNumeric(value: string): boolean {
        return value.trim() !== "" && !isNaN(Number(value));
    }

    private prepareInput(input: string): string {
        return input.replaceAll('-', ' - ');
    }
}