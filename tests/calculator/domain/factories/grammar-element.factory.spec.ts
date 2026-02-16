import {describe, expect, it} from "bun:test";
import {Language} from "@/calculator/domain/value-objects/language.ts";
import {GrammarElementFactory} from "@/calculator/domain/factories/grammar-element.factory.ts";
import {GrammarElementsNotFoundError} from "@/calculator/domain/exceptions/grammar-elements-not-found.error.ts";
import {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";

describe("GrammarElementFactory", () => {
    describe("valid grammar element from factory", () => {
        it("grammar elements not found error", async () => {
            const result: GrammarElement = await GrammarElementFactory.getInstance('U', Language.ENGLISH);
            expect(result).toBeInstanceOf(GrammarElement)
        });
    });
    describe("invalid grammar element from factory", () => {
        it("grammar elements not found error", () => {
            expect(async () => {
                await GrammarElementFactory.getInstance('W', Language.ENGLISH);
            }).toThrow(GrammarElementsNotFoundError);
        });
    });
});