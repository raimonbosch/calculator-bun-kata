
import {describe, it, expect, beforeAll} from "bun:test";
import { en } from "n2words";
import {EnglishTranslatorService} from "@/calculator/domain/services/translation/english-translator.service.ts";

function normalize(str: string) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "") // remove accents
        .replace(/\s+/g, " ")
        .trim();
}

describe("English conversion (0-999)", () => {
    let sut: EnglishTranslatorService;
    beforeAll(async () => {
        sut = new EnglishTranslatorService()
    });
    it("conversion matches reference library", () => {
        for (let i = 0; i <= 999; i++) {
            const expected = en(i).replaceAll(' hundred and ', ' hundred ');
            const actual = sut.translate(i);

            expect(normalize(actual)).toBe(normalize(expected));
        }
    });
});