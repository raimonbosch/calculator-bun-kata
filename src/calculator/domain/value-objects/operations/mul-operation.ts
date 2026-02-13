import type {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {Operation} from "@/calculator/domain/value-objects/operations/operation.ts";

export class MulOperation extends Operation {
    apply(elements: number[]): number {
        let result = 1;
        for(const index of this.indexes) {
            const element = elements[index];
            if (element !== undefined) {
                result *= element;
            }
        }

        return result;
    }
}