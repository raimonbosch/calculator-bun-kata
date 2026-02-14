import type {TranslateNumberToText} from "@/calculator/domain/services/translation/translate-number-to-text.ts";
import {UnknownNumberError} from "@/calculator/domain/exceptions/unknown-number.error.ts";
import type {
    SingleNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/single-number-grammar-element-english.ts";
import type {
    TensNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/tens-number-grammar-element-english.ts";

export class EnglishTranslatorService implements TranslateNumberToText {
    constructor(
        private readonly singleNumberGrammarElement: SingleNumberGrammarElementEnglish,
        private readonly tensNumberGrammarElement: TensNumberGrammarElementEnglish
    ) {
    }
    translate(value: number): string {
        let numberOut = "";
        const numbers = value.toString().split("");

        if (numbers.length === 1 && numbers[0]) {
            return this.singleNumberGrammarElement.text(
                parseInt(numbers[0], 10)
            );
        }

        if (numbers.length === 2 && numbers[0] && numbers[1]) {
            if (value <= 20) {
                return this.singleNumberGrammarElement.text(
                    value
                );
            }

            if (value % 10 === 0) {
                return this.tensNumberGrammarElement.text(
                    value
                );
            }

            return (
                this.tensNumberGrammarElement.text(
                    10 * parseInt(numbers[0], 10)
                ) +
                "-" +
                this.singleNumberGrammarElement.text(
                    parseInt(numbers[1], 10)
                )
            );
        }

        if (numbers.length === 3 && numbers[0] && numbers[1] && numbers[2]) {
            numberOut +=
                this.singleNumberGrammarElement.text(
                    parseInt(numbers[0], 10)
                ) + " hundred";

            if (parseInt(numbers[1], 10) >= 2 && value % 10 !== 0) {
                numberOut +=
                    " " +
                    this.tensNumberGrammarElement.text(
                        10 * parseInt(numbers[1], 10)
                    ) +
                    "-" +
                    this.singleNumberGrammarElement.text(
                        parseInt(numbers[2], 10)
                    );
            }

            if (value % 10 === 0) {
                numberOut +=
                    " " +
                    this.tensNumberGrammarElement.text(
                        10 * parseInt(numbers[1], 10)
                    );
            }

            /*numberOut +=
                " " +
                this.singleNumberGrammarElement.text(
                    parseInt(numbers[1] + numbers[2], 10)
                );*/

            return numberOut;
        }

        throw new UnknownNumberError();
    }

}