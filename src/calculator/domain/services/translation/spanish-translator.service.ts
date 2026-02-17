import type {TranslateNumberToText} from "@/calculator/domain/services/translation/translate-number-to-text.ts";
import type {
    SingleNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/single-number-grammar-element-spanish.ts";
import type {
    HundredNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/hundred-number-grammar-element-spanish.ts";
import type {
    TensNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/tens-number-grammar-element-spanish.ts";

export class SpanishTranslatorService implements TranslateNumberToText {
    constructor(
        private readonly singleNumbers: SingleNumberGrammarElementSpanish,
        private readonly tenNumbers: TensNumberGrammarElementSpanish,
        private readonly hundredNumbers: HundredNumberGrammarElementSpanish,
    ) {
    }
    translate(n: number): string {
        if (n === 0) return "cero";
        if (n === 100) return "cien";

        let result = "";

        const hundred = Math.floor(n / 100);
        const remainder = n % 100;

        if (hundred > 0) {
            result += this.hundredNumbers.text(100*hundred);
            if (remainder > 0) result += " ";
        }

        if (remainder >= 10 && remainder <= 29) {
            result += this.singleNumbers.text(remainder);
        } else {
            const ten = Math.floor(remainder / 10);
            const unit = remainder % 10;

            if (ten > 0) {
                result += this.tenNumbers.text(10*ten);
                if (unit > 0) result += " y ";
            }

            if (unit > 0) {
                result += this.singleNumbers.text(unit);
            }
        }

        return result.trim();
    }
}