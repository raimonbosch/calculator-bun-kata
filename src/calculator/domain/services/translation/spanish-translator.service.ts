import type {TranslateNumberToText} from "@/calculator/domain/services/translation/translate-number-to-text.ts";

const units = [
    "", "uno", "dos", "tres", "cuatro",
    "cinco", "seis", "siete", "ocho", "nueve"
];

const teens = [
    "diez", "once", "doce", "trece", "catorce", "quince"
];

const twenties = [
    "", "veintiuno", "veintidós", "veintitrés", "veinticuatro",
    "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"
];

const tens = [
    "", "", "veinte", "treinta", "cuarenta",
    "cincuenta", "sesenta", "setenta", "ochenta", "noventa"
];

const hundreds = [
    "", "ciento", "doscientos", "trescientos",
    "cuatrocientos", "quinientos", "seiscientos",
    "setecientos", "ochocientos", "novecientos"
];

export class SpanishTranslatorService implements TranslateNumberToText {
    constructor() {
    }
    translate(n: number): string {
        if (n === 0) return "cero";
        if (n === 100) return "cien";

        let result = "";

        const hundred = Math.floor(n / 100);
        const remainder = n % 100;

        if (hundred > 0) {
            result += hundreds[hundred];
            if (remainder > 0) result += " ";
        }

        if (remainder >= 10 && remainder <= 15) {
            result += teens[remainder - 10];
        } else if (remainder >= 16 && remainder <= 19) {
            result += "dieci" + units[remainder - 10];
        } else if (remainder === 20) {
            result += "veinte";
        } else if (remainder >= 21 && remainder <= 29) {
            result += twenties[remainder - 20];
        } else {
            const ten = Math.floor(remainder / 10);
            const unit = remainder % 10;

            if (ten > 0) {
                result += tens[ten];
                if (unit > 0) result += " y ";
            }

            if (unit > 0) {
                result += units[unit];
            }
        }

        return result.trim();
    }
}