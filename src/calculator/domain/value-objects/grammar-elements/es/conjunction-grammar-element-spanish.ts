import {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {Language} from "@/calculator/domain/value-objects/language.ts";


export class ConjunctionGrammarElementSpanish extends GrammarElement {
    protected override _id = 'a';
    protected override _language: Language = Language.SPANISH;
    protected override _elements: Record<string, number> = {
        y: 0,
    };
}