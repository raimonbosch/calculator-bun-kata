
export abstract class Operation {
    public constructor(public readonly indexes: number[]) {
    }

    abstract apply(elements: number[]): number;
}