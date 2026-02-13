import {Operation} from "@/calculator/domain/value-objects/operations/operation.ts";
import type {MulOperation} from "@/calculator/domain/value-objects/operations/mul-operation.ts";
import type {SumOperation} from "@/calculator/domain/value-objects/operations/sum-operation.ts";


//TODO: Find a better way of doing nested operations
export class MulSumOperation extends Operation{
    public constructor(
        protected readonly mulOperation: MulOperation,
        protected readonly sumOperation: SumOperation
    ) {
        super(sumOperation.indexes)
    }

    apply(elements: number[]): number {
        return this.mulOperation.apply(elements) + this.sumOperation.apply(elements);
    }
}