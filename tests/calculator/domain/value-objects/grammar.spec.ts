import { describe, it, expect } from "bun:test";
import {Grammar} from "@/calculator/domain/value-objects/grammar.ts";
import {
    TensNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/tens-number-grammar-element-spanish.ts";
import {SumOperation} from "@/calculator/domain/value-objects/operations/sum-operation.ts";
import {
    ConjunctionGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/conjunction-grammar-element-spanish.ts";
import {
    HundredNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/hundred-number-grammar-element-spanish.ts";
import {
    SingleNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/single-number-grammar-element-spanish.ts";
import {
    NegativeNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/negative-number-grammar-element-spanish.ts";
import {OutOfRangeError} from "@/calculator/domain/exceptions/out-of-range.error.ts";
import {OutOfRangeOperation} from "@/calculator/domain/value-objects/operations/out-of-range-operation.ts";
import {
    ThousandNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/thousand-number-grammar-element-spanish.ts";
import {
    SingleNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/single-number-grammar-element-english.ts";
import {
    HundredNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/hundred-number-grammar-element-english.ts";
import {
    TensNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/tens-number-grammar-element-english.ts";
import {
    ConjunctionGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/conjunction-grammar-element-english.ts";
import {MulSumOperation} from "@/calculator/domain/value-objects/operations/mul-sum-operation.ts";
import {MulOperation} from "@/calculator/domain/value-objects/operations/mul-operation.ts";
import {
    NegativeNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/negative-number-grammar-element-english.ts";
import {
    ThousandNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/thousand-number-grammar-element-english.ts";


describe("Grammar", () => {
    let sut: Grammar;
    describe("apply in spanish", () => {
        it("applies spanish grammar HTaU correctly", () => {
            sut = new Grammar(
                'es-HTaU',
                [
                    new HundredNumberGrammarElementSpanish(),
                    new TensNumberGrammarElementSpanish(),
                    new ConjunctionGrammarElementSpanish(),
                    new SingleNumberGrammarElementSpanish()
                ],
                new SumOperation([0, 1, 3])
            );
            const result = sut.apply(["doscientos", "ochenta", "y", "dos"])
            expect(result).toBe(282);
        });

        it("applies spanish grammar U correctly", () => {
            sut = new Grammar(
                'es-U',
                [
                    new SingleNumberGrammarElementSpanish()
                ],
                new SumOperation([0])
            );
            const result = sut.apply(["uno"])
            expect(result).toBe(1);
        });

        it("applies spanish grammar T correctly", () => {
            sut = new Grammar(
                'es-T',
                [new TensNumberGrammarElementSpanish()],
                new SumOperation([0])
            );
            const result = sut.apply(["ochenta"])
            expect(result).toBe(80);
        });

        it("applies spanish grammar TaU correctly", () => {
            sut = new Grammar(
                'es-TaU',
                [
                    new TensNumberGrammarElementSpanish(),
                    new ConjunctionGrammarElementSpanish(),
                    new SingleNumberGrammarElementSpanish(),
                ],
                new SumOperation([0, 2])
            );
            const result = sut.apply(["treinta", "y", "dos"])
            expect(result).toBe(32);
        });

        it("applies spanish grammar mU gives out of range", () => {
            sut = new Grammar(
                'es-mU',
                [
                    new NegativeNumberGrammarElementSpanish(),
                    new SingleNumberGrammarElementSpanish(),
                ],
                new OutOfRangeOperation([0, 1])
            );

            expect(() => {
                sut.apply(["menos", "tres"]);
            }).toThrow(OutOfRangeError);
        });

        it("applies spanish grammar M gives out of range", () => {
            sut = new Grammar(
                'es-M',
                [
                    new ThousandNumberGrammarElementSpanish(),
                ],
                new OutOfRangeOperation([0])
            );

            expect(() => {
                sut.apply(["mil"]);
            }).toThrow(OutOfRangeError);
        });

        it("applies spanish grammar UM gives out of range", () => {
            sut = new Grammar(
                'es-UM',
                [
                    new SingleNumberGrammarElementSpanish(),
                    new ThousandNumberGrammarElementSpanish(),
                ],
                new OutOfRangeOperation([0, 1])
            );

            expect(() => {
                sut.apply(["tres", "mil"]);
            }).toThrow(OutOfRangeError);
        });
    });

    describe("apply in english", () => {
        it("applies english grammar UH correctly", () => {
            sut = new Grammar(
                'en-UH',
                [
                    new SingleNumberGrammarElementEnglish(),
                    new HundredNumberGrammarElementEnglish(),
                ],
                new MulOperation([0, 1])
            );
            const result = sut.apply(["three", "hundred"]);
            expect(result).toBe(300);
        });

        it("applies english grammar U correctly", () => {
            sut = new Grammar(
                'en-U',
                [
                    new SingleNumberGrammarElementEnglish(),
                ],
                new SumOperation([0])
            );
            const result = sut.apply(["fourteen"]);
            expect(result).toBe(14);
        });

        it("applies english grammar T correctly", () => {
            sut = new Grammar(
                'en-T',
                [
                    new TensNumberGrammarElementEnglish(),
                ],
                new SumOperation([0])
            );
            const result = sut.apply(["sixty"]);
            expect(result).toBe(60);
        });

        it("applies english grammar UHTaU correctly", () => {
            sut = new Grammar(
                'en-UHTaU',
                [
                    new SingleNumberGrammarElementEnglish(),
                    new HundredNumberGrammarElementEnglish(),
                    new TensNumberGrammarElementEnglish(),
                    new ConjunctionGrammarElementEnglish(),
                    new SingleNumberGrammarElementEnglish()
                ],
                new MulSumOperation(new MulOperation([0, 1]), new SumOperation([2, 4]))
            );
            const result = sut.apply(["one", "hundred", "eighty", "-", "two"]);
            expect(result).toBe(182);
        });

        it("applies english grammar UHT", () => {
            sut = new Grammar(
                'en-UHT',
                [
                    new SingleNumberGrammarElementEnglish(),
                    new HundredNumberGrammarElementEnglish(),
                    new TensNumberGrammarElementEnglish()
                ],
                new MulSumOperation(new MulOperation([0, 1]), new SumOperation([2]))
            );
            const result = sut.apply(["eight", "hundred", "fifty"]);
            expect(result).toBe(850);
        });

        it("applies english grammar mU gives out of range", () => {
            sut = new Grammar(
                'en-mU',
                [
                    new NegativeNumberGrammarElementEnglish(),
                    new SingleNumberGrammarElementEnglish(),
                ],
                new OutOfRangeOperation([0, 1])
            );

            expect(() => {
                sut.apply(["minus", "seven"]);
            }).toThrow(OutOfRangeError);
        });

        it("applies english grammar aU gives out of range", () => {
            sut = new Grammar(
                'en-aU',
                [
                    new ConjunctionGrammarElementEnglish(),
                    new SingleNumberGrammarElementEnglish(),
                ],
                new OutOfRangeOperation([0, 1])
            );

            expect(() => {
                sut.apply(["-", "nine"]);
            }).toThrow(OutOfRangeError);
        });

        it("applies english grammar M gives out of range", () => {
            sut = new Grammar(
                'en-M',
                [
                    new ThousandNumberGrammarElementEnglish(),
                ],
                new OutOfRangeOperation([0])
            );

            expect(() => {
                sut.apply(["thousand"]);
            }).toThrow(OutOfRangeError);
        });

        it("applies english grammar UM gives out of range", () => {
            sut = new Grammar(
                'en-UM',
                [
                    new SingleNumberGrammarElementEnglish(),
                    new ThousandNumberGrammarElementEnglish(),
                ],
                new OutOfRangeOperation([0])
            );

            expect(() => {
                sut.apply(["eight", "thousand"]);
            }).toThrow(OutOfRangeError);
        });
    });
});