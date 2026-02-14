import {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {Language} from "@/calculator/domain/value-objects/language.ts";


export class NegativeNumberGrammarElementSpanish extends GrammarElement {
    protected override _id = 'm';
    protected override _language: Language = Language.SPANISH;
    protected override _elements = {
        'menos': -1,
    };
}