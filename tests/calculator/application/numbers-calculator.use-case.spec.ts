import {beforeAll, describe, expect, it} from "bun:test";
import {NumbersCalculatorUseCase} from "@/calculator/application/numbers-calculator.use-case.ts";
import {en, es} from "n2words";

function normalize(str: string) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "") // remove accents
        .replace(/\s+/g, " ")
        .trim();
}
describe("NumbersCalculatorUseCase", () => {
    let sut: NumbersCalculatorUseCase;
    beforeAll(async () => {
        sut = await NumbersCalculatorUseCase.getInstance()
    });
    describe("calculates 0..999 correctly", () => {
        it("calculates 0..999 texts in english", async () => {
            for (let i = 0; i <= 999; i++) {
                const expected = en(i).replaceAll(' hundred and ', ' hundred ');
                const actual = await sut.execute(expected);
                expect(normalize(actual)).toBe(normalize(expected));
            }
        });

        it("calculates 0..999 texts in spanish", async () => {
            for (let i = 0; i <= 999; i++) {
                const expected = es(i).replaceAll('ciento ', 'cien ');
                const actual = await sut.execute(expected);
                expect(normalize(actual)).toBe(normalize(expected));
            }
        });

        it("calculates 0..999 in numeric", async () => {
            for (let i = 0; i <= 999; i++) {
                const actual = await sut.execute(String(i));
                expect(actual).toBe(String(i));
            }
        });
    });
});