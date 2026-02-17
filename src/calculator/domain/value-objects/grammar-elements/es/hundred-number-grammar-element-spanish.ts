import {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {Language} from "@/calculator/domain/value-objects/language.ts";


export class HundredNumberGrammarElementSpanish extends GrammarElement {
    protected override _id = 'H';
    protected override _language: Language = Language.SPANISH;
    protected override _elements: Record<string, number> = {
        'cien': 100,
        'ciento': 100,
        'doscientos': 200,
        'trescientos': 300,
        'cuatrocientos': 400,
        'quinientos': 500,
        'seiscientos': 600,
        'setecientos': 700,
        'ochocientos': 800,
        'novecientos': 900,
    };
}