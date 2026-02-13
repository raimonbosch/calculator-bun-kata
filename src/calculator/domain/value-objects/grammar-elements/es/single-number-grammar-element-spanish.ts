import {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {Language} from "@/calculator/domain/value-objects/language.ts";


export class SingleNumberGrammarElementSpanish extends GrammarElement {
    protected override _id = 'U';
    protected override _language: Language = Language.SPANISH;
    protected override _elements = {
        'uno': 1,
        'dos': 2,
        'tres': 3,
        'cuatro': 4,
        'cinco': 5,
        'seis': 6,
        'siete': 7,
        'ocho': 8,
        'nueve': 9,
        'diez': 10,
        'once': 11,
        'doce': 12,
        'trece': 13,
        'catorce': 14,
        'quince': 15,
        'dieciseis': 16,
        'diecisiete': 17,
        'dieciocho': 18,
        'diecinueve': 19,
        'veinte': 20,
        'veintiuno': 21,
        'veintidos': 22,
        'veintitres': 23,
        'veinticuatro': 24,
        'veinticinco': 25,
        'veintiseis': 26,
        'veintisiete': 27,
        'veintiocho': 28,
        'veintinueve': 29,
    };
}