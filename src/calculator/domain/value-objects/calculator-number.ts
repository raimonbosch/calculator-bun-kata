import {OutOfRangeException} from "@/calculator/domain/exceptions/out-of-range-exception.ts";
import {UnknownNumberException} from "@/calculator/domain/exceptions/unknown-number-exception.ts";

export class CalculatorNumber {
    private value: number;

    constructor(value: string) {
        if (isNaN(Number(value))) {
            throw new UnknownNumberException();
        }

        const numericValue = Number(value);

        if (numericValue < 0 || numericValue >= 1000) {
            throw new OutOfRangeException();
        }

        this.value = Math.floor(numericValue);
    }

    add(number: CalculatorNumber): void {
        this.setValue(this.getValue() + number.getValue());
    }

    getValue(): number {
        return this.value;
    }

    protected setValue(value: number): void {
        this.value = value;
    }
}