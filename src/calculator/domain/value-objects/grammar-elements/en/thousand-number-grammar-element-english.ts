import {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {Language} from "@/calculator/domain/value-objects/language.ts";


export class ThousandNumberGrammarElementEnglish extends GrammarElement {
    protected override _id = 'M';
    protected override _language: Language = Language.ENGLISH;
    protected override _elements = {
        'thousand': 1000,
    };
}