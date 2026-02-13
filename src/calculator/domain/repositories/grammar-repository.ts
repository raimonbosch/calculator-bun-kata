import type {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import type {Grammar} from "@/calculator/domain/value-objects/grammar.ts";
import type {Language} from "@/calculator/domain/value-objects/language.ts";

export interface GrammarRepository {
    find(list: GrammarElement[], language: Language): Grammar;
}