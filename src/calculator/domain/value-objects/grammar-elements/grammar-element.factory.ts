import {Language} from "@/calculator/domain/value-objects/language.ts";
import {
    ConjunctionGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/conjunction-grammar-element-spanish.ts";
import {
    HundredNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/hundred-number-grammar-element-spanish.ts";
import {
    TensNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/tens-number-grammar-element-spanish.ts";
import {
    SingleNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/single-number-grammar-element-spanish.ts";
import type {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {GrammarElementsNotFoundError} from "@/calculator/domain/exceptions/grammar-elements-not-found.error.ts";
import {
    ConjunctionGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/conjunction-grammar-element-english.ts";
import {
    HundredNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/hundred-number-grammar-element-english.ts";
import {
    TensNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/tens-number-grammar-element-english.ts";
import {
    SingleNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/single-number-grammar-element-english.ts";
import {
    ThousandNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/thousand-number-grammar-element-spanish.ts";
import {
    ThousandNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/thousand-number-grammar-element-english.ts";
import {
    NegativeNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/negative-number-grammar-element-english.ts";
import {
    NegativeNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/negative-number-grammar-element-spanish.ts";

export class GrammarElementFactory {
    public static async getInstance(grammarElement: string, language: Language): Promise<GrammarElement> {
        if (language === Language.SPANISH) {
            switch(grammarElement) {
                case 'a':
                    return new ConjunctionGrammarElementSpanish();
                case 'H':
                    return new HundredNumberGrammarElementSpanish();
                case 'T':
                    return new TensNumberGrammarElementSpanish();
                case 'U':
                    return new SingleNumberGrammarElementSpanish();
                case 'M':
                    return new ThousandNumberGrammarElementSpanish();
                case 'm':
                    return new NegativeNumberGrammarElementSpanish();
            }
        }

        if (language === Language.ENGLISH) {
            switch(grammarElement) {
                case 'a':
                    return new ConjunctionGrammarElementEnglish();
                case 'H':
                    return new HundredNumberGrammarElementEnglish();
                case 'T':
                    return new TensNumberGrammarElementEnglish();
                case 'U':
                    return new SingleNumberGrammarElementEnglish();
                case 'M':
                    return new ThousandNumberGrammarElementEnglish();
                case 'm':
                    return new NegativeNumberGrammarElementEnglish();
            }
        }

        throw new GrammarElementsNotFoundError();
    }
}