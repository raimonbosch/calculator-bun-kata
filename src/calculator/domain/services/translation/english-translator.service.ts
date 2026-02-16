import type {TranslateNumberToText} from "@/calculator/domain/services/translation/translate-number-to-text.ts";

const ones = [
    "", "one", "two", "three", "four",
    "five", "six", "seven", "eight", "nine"
];

const teens = [
    "ten", "eleven", "twelve", "thirteen", "fourteen",
    "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
];

const tens = [
    "", "", "twenty", "thirty", "forty",
    "fifty", "sixty", "seventy", "eighty", "ninety"
];
export class EnglishTranslatorService implements TranslateNumberToText {
    constructor() {
    }
    translate(n: number): string {
        if (n === 0) return "zero";

        let result = "";

        const hundred = Math.floor(n / 100);
        const remainder = n % 100;

        if (hundred > 0) {
            result += ones[hundred] + " hundred";
            if (remainder > 0) result += " ";
        }

        if (remainder >= 10 && remainder < 20) {
            result += teens[remainder - 10];
        } else {
            const ten = Math.floor(remainder / 10);
            const one = remainder % 10;

            if (ten > 0) {
                result += tens[ten];
                if (one > 0) result += "-";
            }

            if (one > 0) {
                result += ones[one];
            }
        }

        return result;
    }

}