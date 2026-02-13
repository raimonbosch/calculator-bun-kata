import type {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {InvalidGrammarError} from "@/calculator/domain/exceptions/invalid-grammar.error.ts";
import type {Operation} from "@/calculator/domain/value-objects/operations/operation.ts";
import {InvalidGrammarIdError} from "@/calculator/domain/exceptions/invalid-grammar-id.error.ts";

export class Grammar {
    constructor(
        private readonly grammarId: string,
        private readonly grammarElements: GrammarElement[],
        private readonly operation: Operation) {
        this.validateGrammarElements(grammarElements)
    }

    apply(list: string[]): number {
        let numbers = []
        for (const index in list) {
            if (!this.grammarElements[index]) {
                throw new InvalidGrammarError();
            }

            numbers.push(
                this.grammarElements[index].value(list[index] ?? '')
            )
        }

        return this.operation.apply(numbers);
    }

    private validateGrammarElements(list: GrammarElement[])
    {
        const grammarIdParts = this.grammarId.split('-');
        if (list.length === 0 || (grammarIdParts[1] && grammarIdParts[1].length !== list.length)) {
            throw new InvalidGrammarError();
        }

        // @ts-ignore
        const language = list[0].language();

        let currentGrammarId = language + "-";
        for (const element of list) {
            currentGrammarId += element.id()
        }

        if (this.grammarId !== currentGrammarId) {
            throw new InvalidGrammarIdError();
        }
    }
}