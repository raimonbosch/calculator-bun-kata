import {Operation} from "@/calculator/domain/value-objects/operations/operation.ts";
import {OutOfRangeException} from "@/calculator/domain/exceptions/out-of-range-exception.ts";

export class OutOfRangeOperation extends Operation {
    apply(elements: number[]): number {
        throw new OutOfRangeException();
    }
}