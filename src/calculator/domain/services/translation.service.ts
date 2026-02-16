import {Language} from "@/calculator/domain/value-objects/language.ts";
import {SpanishTranslatorService} from "@/calculator/domain/services/translation/spanish-translator.service.ts";
import {EnglishTranslatorService} from "@/calculator/domain/services/translation/english-translator.service.ts";
import {
    SingleNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/single-number-grammar-element-spanish.ts";
import {
    TensNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/tens-number-grammar-element-spanish.ts";
import {
    HundredNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/hundred-number-grammar-element-spanish.ts";
import {
    SingleNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/single-number-grammar-element-english.ts";
import {
    TensNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/tens-number-grammar-element-english.ts";

export class TranslationService {
    constructor(
        private readonly spanishTranslatorService: SpanishTranslatorService,
        private readonly englishTranslatorService: EnglishTranslatorService,
    ) {}
    translate(input: number, language: Language): string {
        if (language === Language.SPANISH) {
            return this.spanishTranslatorService.translate(input);
        }
        if (language === Language.ENGLISH) {
            return this.englishTranslatorService.translate(input);
        }

        return ""
    }

    public static async getInstance(): Promise<TranslationService> {
        return new TranslationService(
            new SpanishTranslatorService(
                new SingleNumberGrammarElementSpanish(),
                new TensNumberGrammarElementSpanish(),
                new HundredNumberGrammarElementSpanish()
            ),
            new EnglishTranslatorService(
                new SingleNumberGrammarElementEnglish(),
                new TensNumberGrammarElementEnglish()
            )
        );
    }
}