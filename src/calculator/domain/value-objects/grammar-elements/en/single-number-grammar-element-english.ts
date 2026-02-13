import {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {Language} from "@/calculator/domain/value-objects/language.ts";


export class SingleNumberGrammarElementEnglish extends GrammarElement {
    protected override _id = 'U';
    protected override _language: Language = Language.ENGLISH;
    protected override _elements = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        'ten': 10,
        'eleven': 11,
        'twelve': 12,
        'thirteen': 13,
        'fourteen': 14,
        'fifteen': 15,
        'sixteen': 16,
        'seventeen': 17,
        'eighteen': 18,
        'nineteen': 19,
    };
}