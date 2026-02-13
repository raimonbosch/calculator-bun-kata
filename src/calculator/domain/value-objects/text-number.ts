import {CalculatorNumber} from "@/calculator/domain/value-objects/calculator-number.ts";
import type {Language} from "@/calculator/domain/value-objects/language.ts";

export class TextNumber extends CalculatorNumber {
    private readonly language: Language;
    private readonly text: string;

    constructor(value: string, language: Language, text: string) {
        super(value);
        this.language = language;
        this.text = text;
    }

    getLanguage(): Language {
        return this.language;
    }

    getText(): string {
        return this.text;
    }
}