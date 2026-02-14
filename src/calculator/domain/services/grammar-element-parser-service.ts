import type {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {GrammarElementsNotFoundError} from "@/calculator/domain/exceptions/grammar-elements-not-found.error.ts";
import {
    ConjunctionGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/conjunction-grammar-element-spanish.ts";
import {
    HundredNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/hundred-number-grammar-element-spanish.ts";
import {
    SingleNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/single-number-grammar-element-spanish.ts";
import {
    TensNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/tens-number-grammar-element-spanish.ts";
import {
    NegativeNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/negative-number-grammar-element-spanish.ts";
import {
    ThousandNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/thousand-number-grammar-element-spanish.ts";
import {
    ConjunctionGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/conjunction-grammar-element-english.ts";
import {
    HundredNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/hundred-number-grammar-element-english.ts";
import {
    SingleNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/single-number-grammar-element-english.ts";
import {
    TensNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/tens-number-grammar-element-english.ts";
import {
    NegativeNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/negative-number-grammar-element-english.ts";
import {
    ThousandNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/thousand-number-grammar-element-english.ts";

export class GrammarElementParserService {
    private static instance: GrammarElementParserService;
    private static defaultGrammarElements = [
        new ConjunctionGrammarElementSpanish(),
        new HundredNumberGrammarElementSpanish(),
        new SingleNumberGrammarElementSpanish(),
        new TensNumberGrammarElementSpanish(),
        new NegativeNumberGrammarElementSpanish(),
        new ThousandNumberGrammarElementSpanish(),
        new ConjunctionGrammarElementEnglish(),
        new HundredNumberGrammarElementEnglish(),
        new SingleNumberGrammarElementEnglish(),
        new TensNumberGrammarElementEnglish(),
        new NegativeNumberGrammarElementEnglish(),
        new ThousandNumberGrammarElementEnglish(),
    ];

    constructor(
        private readonly defaultGrammarElements: GrammarElement[],
    ) {
    }
    parse(text: string): GrammarElement[] {
        const grammarElements: GrammarElement[] = [];
        const parts = text.split(/(\s)+/iu);
        for (const part of parts) {
            for (const grammarElement of this.defaultGrammarElements) {
                if (grammarElement.matches(part)) {
                    grammarElements.push(grammarElement);
                }
            }
        }

        if (grammarElements.length === 0) {
            throw new GrammarElementsNotFoundError();
        }

        return grammarElements;
    }

    public static async getInstance(): Promise<GrammarElementParserService> {
        if (GrammarElementParserService.instance) {
            return GrammarElementParserService.instance;
        }

        GrammarElementParserService.instance = new GrammarElementParserService(
            GrammarElementParserService.defaultGrammarElements
        );

        return GrammarElementParserService.instance;
    }
}