import { describe, it, expect, beforeAll } from "bun:test";
import {Grammar} from "@/calculator/domain/value-objects/grammar.ts";
import {
    TensNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/tens-number-grammar-element-spanish.ts";
import {SumOperation} from "@/calculator/domain/value-objects/operations/sum-operation.ts";
import {
    HundredNumberGrammarElementEnglish
} from "@/calculator/domain/value-objects/grammar-elements/en/hundred-number-grammar-element-english.ts";
import {
    ConjunctionGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/conjunction-grammar-element-spanish.ts";
import {
    HundredNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/hundred-number-grammar-element-spanish.ts";
import {
    SingleNumberGrammarElementSpanish
} from "@/calculator/domain/value-objects/grammar-elements/es/single-number-grammar-element-spanish.ts";


describe("Grammar", () => {
    let sut: Grammar;
    describe("apply in spanish", () => {
        it("applies grammar HTaU correctly", () => {
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

        it("applies grammar T correctly", () => {
            sut = new Grammar(
                'es-T',
                [new TensNumberGrammarElementSpanish()],
                new SumOperation([0])
            );
            const result = sut.apply(["ochenta"])
            expect(result).toBe(80);
        });
    });
});