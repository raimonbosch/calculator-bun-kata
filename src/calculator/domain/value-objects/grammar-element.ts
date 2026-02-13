import type {Language} from "@/calculator/domain/value-objects/language.ts";
import {GrammarValueNotFoundError} from "@/calculator/domain/exceptions/grammar-value-not-found.error.ts";

export abstract class GrammarElement {
    protected abstract _id: string;
    protected abstract _language: Language;
    protected abstract _elements: Record<string, number>;

    id(): string {
        return this._id;
    }

    language(): Language {
        return this._language;
    }

    elements(): Record<string, number> {
        return this._elements;
    }

    matches(text: string): boolean {
        const elements = this.elements()
        return !!elements[text];
    }

    value(text: string): number {
        const elements = this.elements()
        if (!elements[text]) {
            throw new GrammarValueNotFoundError()
        }
        return elements[text];
    }
}