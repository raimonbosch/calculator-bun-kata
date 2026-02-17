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

        it("calculates 0..999 sums in english", async () => {
            for (let i = 0; i <= 999; i++) {
                const part1 = en(i).replaceAll(' hundred and ', ' hundred ');
                const part2 = en(999 - i).replaceAll(' hundred and ', ' hundred ');
                const result = await sut.execute(part1 + " plus " +  part2);
                expect(result).toBe("nine hundred ninety-nine");
            }
        });

        it("calculates 0..999 texts in spanish", async () => {
            for (let i = 0; i <= 999; i++) {
                const expected = es(i).replaceAll('ciento ', 'cien ');
                const actual = await sut.execute(expected);
                expect(normalize(actual)).toBe(normalize(expected));
            }
        });

        it("calculates 0..999 sums in spanish", async () => {
            for (let i = 0; i <= 999; i++) {
                const part1 = es(i).replaceAll(' hundred and ', ' hundred ');
                const part2 = es(999 - i).replaceAll(' hundred and ', ' hundred ');
                const result = await sut.execute(part1 + " plus " +  part2);
                expect(result).toBe("novecientos noventa y nueve");
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