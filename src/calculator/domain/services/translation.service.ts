import {Language} from "@/calculator/domain/value-objects/language.ts";
import {SpanishTranslatorService} from "@/calculator/domain/services/translation/spanish-translator.service.ts";
import {EnglishTranslatorService} from "@/calculator/domain/services/translation/english-translator.service.ts";

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
}