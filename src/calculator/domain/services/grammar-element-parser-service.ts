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

export class GrammarElementParserService {
    private static instance: GrammarElementParserService;

    constructor(
        private readonly defaultGrammarElements: GrammarElement[],
    ) {
    }
    parse(text: string): GrammarElement[] {
        const grammarElements: GrammarElement[] = [];
        const parts = text.split(/(\s)+/iu);
        for (const part of parts) {
            for (const grammarElement of this.defaultGrammarElements) {
                if (grammarElement.matches(text)) {
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

        GrammarElementParserService.instance = new GrammarElementParserService([
            new ConjunctionGrammarElementSpanish(),
            new HundredNumberGrammarElementSpanish(),
            new SingleNumberGrammarElementSpanish(),
            new TensNumberGrammarElementSpanish(),
        ]);

        return GrammarElementParserService.instance;
    }
}