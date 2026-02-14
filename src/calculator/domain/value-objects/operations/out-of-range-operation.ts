import {Operation} from "@/calculator/domain/value-objects/operations/operation.ts";
import {OutOfRangeError} from "@/calculator/domain/exceptions/out-of-range.error.ts";

export class OutOfRangeOperation extends Operation {
    apply(elements: number[]): number {
        throw new OutOfRangeError();
    }
}