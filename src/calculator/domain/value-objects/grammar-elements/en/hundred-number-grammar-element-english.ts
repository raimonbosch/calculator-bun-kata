import {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {Language} from "@/calculator/domain/value-objects/language.ts";


export class HundredNumberGrammarElementEnglish extends GrammarElement {
    protected override _id = 'H';
    protected override _language: Language = Language.ENGLISH;
    protected override _elements: Record<string, number> = {
        'hundred': 100,
    };
}