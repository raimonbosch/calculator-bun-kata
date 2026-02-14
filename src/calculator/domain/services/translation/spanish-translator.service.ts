import type {TranslateNumberToText} from "@/calculator/domain/services/translation/translate-number-to-text.ts";
import {
    SingleNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/single-number-grammar-element-spanish.ts";
import type {
    HundredNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/hundred-number-grammar-element-spanish.ts";
import {UnknownNumberError} from "@/calculator/domain/exceptions/unknown-number.error.ts";
import type {
    TensNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/tens-number-grammar-element-spanish.ts";

export class SpanishTranslatorService implements TranslateNumberToText {
    constructor(
        private readonly singleNumberGrammarElement: SingleNumberGrammarElementSpanish,
        private readonly tensNumberGrammarElement: TensNumberGrammarElementSpanish,
        private readonly hundredNumberGrammarElement: HundredNumberGrammarElementSpanish
    ) {
    }
    translate(value: number): string {
        let numberOut = "";
        const numbers = value.toString().split("");

        // 1 digit
        if (numbers.length === 1 && numbers[0]) {
            return this.singleNumberGrammarElement.text(
                parseInt(numbers[0], 10)
            );
        }

        // 2 digits
        if (numbers.length === 2 && numbers[0] && numbers[1]) {
            if (value < 30) {
                return this.singleNumberGrammarElement.text(
                    value
                );
            }

            if (value >= 30 && value % 10 === 0) {
                return this.tensNumberGrammarElement.text(
                    value
                );
            }

            return (
                this.tensNumberGrammarElement.text(
                    10 * parseInt(numbers[0], 10)
                ) +
                " y " +
                this.singleNumberGrammarElement.text(
                    parseInt(numbers[1], 10)
                )
            );
        }

        // 3 digits
        if (numbers.length === 3 && numbers[0] && numbers[1] && numbers[2]) {
            numberOut += this.hundredNumberGrammarElement.text(
                100 * parseInt(numbers[0], 10)
            );

            if (parseInt(numbers[1], 10) >= 3 && value % 10 !== 0) {
                numberOut +=
                    " " +
                    this.tensNumberGrammarElement.text(
                        10 * parseInt(numbers[1], 10)
                    ) +
                    " y " +
                    this.singleNumberGrammarElement.text(
                        parseInt(numbers[2], 10)
                    );

                return numberOut;
            }

            numberOut +=
                " " +
                this.singleNumberGrammarElement.text(
                    parseInt(numbers[1] + numbers[2], 10)
                );

            return numberOut;
        }

        throw new UnknownNumberError();
    }
}