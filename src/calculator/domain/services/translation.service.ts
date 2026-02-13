import type {Language} from "@/calculator/domain/value-objects/language.ts";
import type {SpanishTranslatorService} from "@/calculator/domain/services/translation/spanish-translator.service.ts";
import type {EnglishTranslatorService} from "@/calculator/domain/services/translation/english-translator.service.ts";
import type { TextNumber } from "../value-objects/text-number";

export class TranslationService {
    constructor(
        private readonly spanishTranslatorService: SpanishTranslatorService,
        private readonly englishTranslatorService: EnglishTranslatorService,
    ) {}
    translate(input: TextNumber, language: Language): string {
        return ""
    }
}