import {beforeAll, describe, expect, it} from "bun:test";
import {OutOfRangeError} from "@/calculator/domain/exceptions/out-of-range.error.ts";
import {GrammarJsonRepository} from "@/calculator/infrastructure/repositories/grammar-json-repository.ts";
import {GrammarElementFactory} from "@/calculator/domain/factories/grammar-element.factory.ts";
import {Language} from "@/calculator/domain/value-objects/language.ts";
import {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import type {GrammarRepository} from "@/calculator/domain/repositories/grammar-repository.ts";

describe("GrammarJsonRepository", () => {
    let sut: GrammarRepository;

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
        sut = await GrammarJsonRepository.getInstance();
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
    describe("apply in spanish", async () => {
        it("applies spanish grammar HTaU correctly", () => {
            const result = sut
                .find([grammarElementH_es, grammarElementT_es, grammarElementa_es, grammarElementU_es], Language.SPANISH)
                .apply(["doscientos", "ochenta", "y", "dos"])
            expect(result).toBe(282);
        });

        it("applies spanish grammar HU correctly", () => {
            const result = sut
                .find([grammarElementH_es, grammarElementU_es], Language.SPANISH)
                .apply(["cuatrocientos", "cuatro"])
            expect(result).toBe(404);
        });

        it("applies spanish grammar HT correctly", () => {
            const result = sut
                .find([grammarElementH_es, grammarElementT_es], Language.SPANISH)
                .apply(["cuatrocientos", "ochenta"])
            expect(result).toBe(480);
        });

        it("applies spanish grammar U correctly", () => {
            const result = sut.find([grammarElementU_es], Language.SPANISH).apply(["uno"])
            expect(result).toBe(1);
        });

        it("applies spanish grammar T correctly", () => {
            const result = sut.find([grammarElementT_es], Language.SPANISH).apply(["ochenta"])
            expect(result).toBe(80);
        });

        it("applies spanish grammar TaU correctly", () => {
            const result = sut
                .find([grammarElementT_es, grammarElementa_es, grammarElementU_es], Language.SPANISH)
                .apply(["treinta", "y", "dos"])
            expect(result).toBe(32);
        });

        it("applies spanish grammar mU gives out of range", () => {
            expect(() => {
                sut.find([grammarElementm_es, grammarElementU_es], Language.SPANISH).apply(["menos", "tres"]);
            }).toThrow(OutOfRangeError);
        });

        it("applies spanish grammar M gives out of range", () => {
            expect(() => {
                sut.find([grammarElementM_es], Language.SPANISH).apply(["mil"]);
            }).toThrow(OutOfRangeError);
        });

        it("applies spanish grammar UM gives out of range", () => {
            expect(() => {
                sut.find([grammarElementU_es, grammarElementM_es], Language.SPANISH).apply(["tres", "mil"]);
            }).toThrow(OutOfRangeError);
        });
    });

    describe("apply in english", () => {
        it("applies english grammar UH correctly", () => {
            const result = sut
                .find([grammarElementU_en, grammarElementH_en], Language.ENGLISH)
                .apply(["three", "hundred"]);
            expect(result).toBe(300);
        });

        it("applies english grammar U correctly", () => {
            const result = sut.find([grammarElementU_en], Language.ENGLISH).apply(["fourteen"]);
            expect(result).toBe(14);
        });

        it("applies english grammar T correctly", () => {
            const result = sut.find([grammarElementT_en], Language.ENGLISH).apply(["sixty"]);
            expect(result).toBe(60);
        });

        it("applies english grammar UHTaU correctly", () => {
            const result = sut.find(
                [
                    grammarElementU_en,
                    grammarElementH_en,
                    grammarElementT_en,
                    grammarElementa_en,
                    grammarElementU_en
                ],
                Language.ENGLISH
            ).apply(["one", "hundred", "eighty", "-", "two"]);
            expect(result).toBe(182);
        });

        it("applies english grammar UHT", () => {
            const result = sut
                .find([grammarElementU_en, grammarElementH_en, grammarElementT_en], Language.ENGLISH)
                .apply(["eight", "hundred", "fifty"]);
            expect(result).toBe(850);
        });

        it("applies english grammar UHU", () => {
            const result = sut
                .find([grammarElementU_en, grammarElementH_en, grammarElementU_en], Language.ENGLISH)
                .apply(["five", "hundred", "seven"]);
            expect(result).toBe(507);
        });

        it("applies english grammar mU gives out of range", () => {
            expect(() => {
                sut.find([grammarElementm_en, grammarElementU_en], Language.ENGLISH).apply(["minus", "seven"]);
            }).toThrow(OutOfRangeError);
        });

        it("applies english grammar aU gives out of range", () => {
            expect(() => {
                sut.find([grammarElementa_en, grammarElementU_en], Language.ENGLISH).apply(["-", "nine"]);
            }).toThrow(OutOfRangeError);
        });

        it("applies english grammar M gives out of range", () => {
            expect(() => {
                sut.find([grammarElementM_en], Language.ENGLISH).apply(["thousand"]);
            }).toThrow(OutOfRangeError);
        });

        it("applies english grammar UM gives out of range", () => {
            expect(() => {
                sut.find([grammarElementU_en, grammarElementM_en], Language.ENGLISH).apply(["eight", "thousand"]);
            }).toThrow(OutOfRangeError);
        });
    });
});