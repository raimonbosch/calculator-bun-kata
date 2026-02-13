import {CalculatorNumber} from "@/calculator/domain/value-objects/calculator-number.ts";

export class NumberExtractionService {
    extractNumberFromText(text: string): CalculatorNumber {
        return new CalculatorNumber('0');
    }
}