import {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {Language} from "@/calculator/domain/value-objects/language.ts";


export class TensNumberGrammarElementEnglish extends GrammarElement {
    protected override _id = 'T';
    protected override _language: Language = Language.ENGLISH;
    protected override _elements = {
        'twenty': 20,
        'thirty': 30,
        'forty': 40,
        'fifty': 50,
        'sixty': 60,
        'seventy': 70,
        'eighty': 80,
        'ninety': 90,
    };
}