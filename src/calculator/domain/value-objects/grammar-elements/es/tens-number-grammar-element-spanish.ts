import {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {Language} from "@/calculator/domain/value-objects/language.ts";


export class TensNumberGrammarElementSpanish extends GrammarElement {
    protected override _id = 'T';
    protected override _language: Language = Language.SPANISH;
    protected override _elements = {
        'treinta': 30,
        'cuarenta': 40,
        'cincuenta': 50,
        'sesenta': 60,
        'setenta': 70,
        'ochenta': 80,
        'noventa': 90,
    };
}