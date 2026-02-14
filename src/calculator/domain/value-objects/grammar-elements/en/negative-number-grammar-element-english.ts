import {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {Language} from "@/calculator/domain/value-objects/language.ts";


export class NegativeNumberGrammarElementEnglish extends GrammarElement {
    protected override _id = 'm';
    protected override _language: Language = Language.ENGLISH;
    protected override _elements = {
        'minus': -1,
    };
}