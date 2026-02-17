import {describe, it, expect, beforeAll} from "bun:test";
import {SpanishTranslatorService} from "@/calculator/domain/services/translation/spanish-translator.service.ts";
import { es } from "n2words";
import {
    SingleNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/single-number-grammar-element-spanish.ts";
import {
    HundredNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/hundred-number-grammar-element-spanish.ts";
import {
    TensNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/tens-number-grammar-element-spanish.ts";

function normalize(str: string) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "") // remove accents
        .replace(/\s+/g, " ")
        .trim();
}

describe("Spanish conversion (0-999)", () => {
    let sut: SpanishTranslatorService;
    beforeAll(async () => {
        sut = new SpanishTranslatorService(
            new SingleNumberGrammarElementSpanish(),
            new TensNumberGrammarElementSpanish(),
            new HundredNumberGrammarElementSpanish(),
        )
    });
    it("conversion matches reference library", () => {
        for (let i = 0; i <= 999; i++) {
            const expected = es(i).replaceAll('ciento ', 'cien ');
            const actual = sut.translate(i);

            expect(normalize(actual)).toBe(normalize(expected));
        }
    });
});