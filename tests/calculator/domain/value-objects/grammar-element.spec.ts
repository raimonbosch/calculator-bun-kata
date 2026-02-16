import {beforeAll, describe, expect, it} from "bun:test";
import {Language} from "@/calculator/domain/value-objects/language.ts";
import type {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {GrammarElementFactory} from "@/calculator/domain/factories/grammar-element.factory.ts";
import {GrammarValueNotFoundError} from "@/calculator/domain/exceptions/grammar-value-not-found.error.ts";
import {GrammarTextNotFoundError} from "@/calculator/domain/exceptions/grammar-text-not-found.error.ts";


describe("GrammarElement", () => {
    let sut: GrammarElement;
    beforeAll(async () => {
        sut = await GrammarElementFactory.getInstance('H', Language.SPANISH);
    });
    describe("invalid grammar element", () => {
        it("grammar value not found error", () => {
            expect(() => {
                sut.value("two");
            }).toThrow(GrammarValueNotFoundError);
        });

        it("grammar text not found error", () => {
            expect(() => {
                sut.text(2);
            }).toThrow(GrammarTextNotFoundError);
        });
    });
});