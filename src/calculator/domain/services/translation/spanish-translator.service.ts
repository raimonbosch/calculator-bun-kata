import type {TranslateNumberToText} from "@/calculator/domain/services/translation/translate-number-to-text.ts";

export class SpanishTranslatorService implements TranslateNumberToText {
    translate(number: Number): string {
        throw new Error("Method not implemented.");
    }

}