import {SumOperation} from "@/calculator/domain/value-objects/operations/sum-operation.ts";
import {MulOperation} from "@/calculator/domain/value-objects/operations/mul-operation.ts";
import {MulSumOperation} from "@/calculator/domain/value-objects/operations/mul-sum-operation.ts";
import {UnavailableOperationError} from "@/calculator/domain/exceptions/unavailable-operation.error.ts";
import {OutOfRangeException} from "@/calculator/domain/exceptions/out-of-range-exception.ts";
import {OutOfRangeOperation} from "@/calculator/domain/value-objects/operations/out-of-range-operation.ts";

export class OperationFactory {
    public static getInstance(operation: string, elements1: number[], elements2: number[]) {
        switch (operation.toLowerCase()) {
            case "sum":
                return new SumOperation(elements1);
            case "mul":
                return new MulOperation(elements1);
            case "mulsum":
                return new MulSumOperation(new MulOperation(elements1), new SumOperation(elements2));
            case "out-of-range":
                return new OutOfRangeOperation(elements1);
        }

        throw new UnavailableOperationError();
    }
}