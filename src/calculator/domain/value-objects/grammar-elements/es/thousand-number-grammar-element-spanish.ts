import {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {Language} from "@/calculator/domain/value-objects/language.ts";


export class ThousandNumberGrammarElementSpanish extends GrammarElement {
    protected override _id = 'M';
    protected override _language: Language = Language.SPANISH;
    protected override _elements = {
        'mil': 1000,
    };
}