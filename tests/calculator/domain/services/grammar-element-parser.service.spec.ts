import {beforeAll, describe, expect, it} from "bun:test";
import {Language} from "@/calculator/domain/value-objects/language.ts";
import {GrammarElementParserService} from "@/calculator/domain/services/grammar-element-parser.service.ts";
import {GrammarElementFactory} from "@/calculator/domain/factories/grammar-element.factory.ts";
import type {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {OutOfRangeError} from "@/calculator/domain/exceptions/out-of-range.error.ts";
import {GrammarElementsNotFoundError} from "@/calculator/domain/exceptions/grammar-elements-not-found.error.ts";

describe("GrammarElementParserService", () => {
    let sut: GrammarElementParserService;

    let grammarElementH_es: GrammarElement;
    let grammarElementT_es: GrammarElement;
    let grammarElementa_es: GrammarElement;
    let grammarElementU_es: GrammarElement;
    let grammarElementm_es: GrammarElement;
    let grammarElementM_es: GrammarElement;

    let grammarElementH_en: GrammarElement;
    let grammarElementT_en: GrammarElement;
    let grammarElementa_en: GrammarElement;
    let grammarElementU_en: GrammarElement;
    let grammarElementm_en: GrammarElement;
    let grammarElementM_en: GrammarElement;

    beforeAll(async () => {
        sut = await GrammarElementParserService.getInstance()

        grammarElementH_es = await GrammarElementFactory.getInstance('H', Language.SPANISH);
        grammarElementT_es = await GrammarElementFactory.getInstance('T', Language.SPANISH);
        grammarElementa_es = await GrammarElementFactory.getInstance('a', Language.SPANISH);
        grammarElementU_es = await GrammarElementFactory.getInstance('U', Language.SPANISH);
        grammarElementm_es = await GrammarElementFactory.getInstance('m', Language.SPANISH);
        grammarElementM_es = await GrammarElementFactory.getInstance('M', Language.SPANISH);

        grammarElementH_en = await GrammarElementFactory.getInstance('H', Language.ENGLISH);
        grammarElementT_en = await GrammarElementFactory.getInstance('T', Language.ENGLISH);
        grammarElementa_en = await GrammarElementFactory.getInstance('a', Language.ENGLISH);
        grammarElementU_en = await GrammarElementFactory.getInstance('U', Language.ENGLISH);
        grammarElementm_en = await GrammarElementFactory.getInstance('m', Language.ENGLISH);
        grammarElementM_en = await GrammarElementFactory.getInstance('M', Language.ENGLISH);
    });
    describe("parsing in spanish", () => {
        it("parsing spanish grammar HTaU correctly", () => {
            const result: GrammarElement[] = sut.parse("doscientos ochenta y dos");
            expect(result).toBe([
                grammarElementH_es,
                grammarElementT_es,
                grammarElementa_es,
                grammarElementU_es,
            ]);
        });

        it("parsing spanish grammar U correctly", () => {
            const result: GrammarElement[] = sut.parse("uno");
            expect(result).toBe([
                grammarElementU_es,
            ]);
        });

        it("parsing spanish grammar T correctly", () => {
            const result: GrammarElement[] = sut.parse("ochenta");
            expect(result).toBe([
                grammarElementT_es,
            ]);
        });

        it("parsing spanish grammar TaU correctly", () => {
            const result: GrammarElement[] = sut.parse("treinta y dos");
            expect(result).toBe([
                grammarElementT_es,
                grammarElementa_es,
                grammarElementU_es,
            ]);
        });

        it("parsing spanish grammar mU correctly", () => {
            const result: GrammarElement[] = sut.parse("menos uno");
            expect(result).toBe([
                grammarElementm_es,
                grammarElementU_es,
            ]);
        });
    });

    describe("parsing in english", () => {
        it("parsing english grammar UH correctly", () => {
            const result: GrammarElement[] = sut.parse("three hundred");
            expect(result).toBe([
                grammarElementU_en,
                grammarElementH_en,
            ]);
        });

        it("parsing english grammar U correctly", () => {
            const result: GrammarElement[] = sut.parse("fourteen");
            expect(result).toBe([
                grammarElementU_en,
            ]);
        });

        it("parsing english grammar T correctly", () => {
            const result: GrammarElement[] = sut.parse("sixty");
            expect(result).toBe([
                grammarElementT_en,
            ]);
        });

        it("parsing english grammar UHTaU correctly", () => {
            const result: GrammarElement[] = sut.parse("one hundred eighty-two");
            expect(result).toBe([
                grammarElementU_en,
                grammarElementH_en,
                grammarElementT_en,
                grammarElementa_en,
                grammarElementU_en,
            ]);
        });

        it("parsing english grammar UHT", () => {
            const result: GrammarElement[] = sut.parse("eight hundred fifty");
            expect(result).toBe([
                grammarElementU_en,
                grammarElementH_en,
                grammarElementT_en,
            ]);
        });

        it("parsing invalid english grammar UHT", () => {
            expect(() => {
                sut.parse("whatever whatever");
            }).toThrow(GrammarElementsNotFoundError);
        });
    });
});