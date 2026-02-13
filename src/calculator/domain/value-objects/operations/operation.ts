import type {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";

export abstract class Operation {
    public constructor(public readonly indexes: number[]) {
    }

    abstract apply(elements: number[]): number;
}