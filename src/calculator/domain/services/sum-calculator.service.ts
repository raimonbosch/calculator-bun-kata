import {CalculatorNumber} from "@/calculator/domain/value-objects/calculator-number.ts";

export class SumCalculatorService {
    sum(number: CalculatorNumber) {

    }

    getTotal(): CalculatorNumber {
        return new CalculatorNumber('0')
    }
}