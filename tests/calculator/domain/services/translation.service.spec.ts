import {beforeAll, describe, expect, it} from "bun:test";
import {TranslationService} from "@/calculator/domain/services/translation.service.ts";
import {Language} from "@/calculator/domain/value-objects/language.ts";

describe("TranslationService", () => {
    let sut: TranslationService;
    beforeAll(async () => {
        sut = await TranslationService.getInstance()
    });
    describe("translates in spanish", () => {
        it("translates spanish grammar HTaU correctly", () => {
            const result = sut.translate(282, Language.SPANISH);
            expect(result).toBe("doscientos ochenta y dos");
        });

        it("translates spanish grammar U correctly", () => {
            const result = sut.translate(1, Language.SPANISH);
            expect(result).toBe("uno");
        });

        it("translates spanish grammar T correctly", () => {
            const result = sut.translate(80, Language.SPANISH)
            expect(result).toBe("ochenta");
        });

        it("translates spanish grammar TaU correctly", () => {
            const result = sut.translate(32, Language.SPANISH)
            expect(result).toBe("treinta y dos");
        });
    });

    describe("translates in english", () => {
        it("translates english grammar UH correctly", () => {
            const result = sut.translate(300, Language.ENGLISH);
            expect(result).toBe("three hundred");
        });

        it("translates english grammar U correctly", () => {
            const result = sut.translate(14, Language.ENGLISH);
            expect(result).toBe("fourteen");
        });

        it("translates english grammar T correctly", () => {
            const result = sut.translate(60, Language.ENGLISH);
            expect(result).toBe("sixty");
        });

        it("translates english grammar UHTaU correctly", () => {
            const result = sut.translate(182, Language.ENGLISH);
            expect(result).toBe("one hundred eighty-two");
        });

        it("translates english grammar UHT", () => {
            const result = sut.translate(850, Language.ENGLISH);
            expect(result).toBe("eight hundred fifty");
        });
    });
});