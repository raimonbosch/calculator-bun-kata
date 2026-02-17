import type {TranslateNumberToText} from "@/calculator/domain/services/translation/translate-number-to-text.ts";
import type {
    SingleNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/single-number-grammar-element-english.ts";
import type {
    TensNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/tens-number-grammar-element-english.ts";

export class EnglishTranslatorService implements TranslateNumberToText {
    constructor(
        private readonly singleNumber: SingleNumberGrammarElementEnglish,
        private readonly tenNumbers: TensNumberGrammarElementEnglish,
    ) {
    }
    translate(n: number): string {
        if (n === 0) return "zero";

        let result = "";

        const hundred = Math.floor(n / 100);
        const remainder = n % 100;

        if (hundred > 0) {
            result += this.singleNumber.text(hundred) + " hundred";
            if (remainder > 0) result += " ";
        }

        if (remainder >= 10 && remainder < 20) {
            result += this.singleNumber.text(remainder);
        } else {
            const ten = Math.floor(remainder / 10);
            const one = remainder % 10;

            if (ten > 0) {
                result += this.tenNumbers.text(10*ten);
                if (one > 0) result += "-";
            }

            if (one > 0) {
                result += this.singleNumber.text(one);
            }
        }

        return result;
    }

}