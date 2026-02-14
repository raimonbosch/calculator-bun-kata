
import { promises as fs } from "fs";
import path from "path";
import {Grammar} from "@/calculator/domain/value-objects/grammar.ts";
import {GrammarElement} from "@/calculator/domain/value-objects/grammar-element.ts";
import {GrammarNotFoundError} from "@/calculator/domain/exceptions/grammar-not-found.error.ts";
import type {GrammarRepository} from "@/calculator/domain/repositories/grammar-repository.ts";
import type {Language} from "@/calculator/domain/value-objects/language.ts";
import type {Operation} from "@/calculator/domain/value-objects/operations/operation.ts";
import {OperationFactory} from "@/calculator/domain/factories/operation.factory.ts";
import {GrammarElementFactory} from "@/calculator/domain/factories/grammar-element.factory.ts";

export class GrammarJsonRepository implements GrammarRepository{
    private static instance: GrammarJsonRepository;
    constructor(private readonly grammars: Record<string, Grammar>) {
        this.grammars = grammars;
    }

    find(list: GrammarElement[], language: Language): Grammar {
        let grammarId = language + "-";
        for (const element of list) {
            grammarId += element.id()
        }

        const grammar = this.grammars[grammarId]
        if (!grammar) {
            throw new GrammarNotFoundError();
        }

        return grammar;
    }

    public static async getInstance(): Promise<GrammarRepository> {
        if (GrammarJsonRepository.instance) {
            return GrammarJsonRepository.instance;
        }
        try {
            let grammars: Record<string, Grammar> = {}
            const filePath = path.join(__dirname, "grammars.json");
            const data = await fs.readFile(filePath, "utf-8");
            const grammarsByLanguage = JSON.parse(data);

            for (const language in grammarsByLanguage) {
                for (const grammarId in grammarsByLanguage[language]) {
                    const operation = grammarsByLanguage[language][grammarId];
                    const grammarElements = await this.getGrammarElementsFromString(grammarId, language as Language);
                    grammars[language + "-" + grammarId] = new Grammar(
                        language + "-" + grammarId,
                        grammarElements,
                        await this.getOperationFromString(operation)
                    )
                }
            }

            GrammarJsonRepository.instance = new GrammarJsonRepository(grammars);

            return GrammarJsonRepository.instance;
        } catch (err) {
            console.error("Failed to load grammar JSON:", err);
            throw err;
        }
    }

    private static async getOperationFromString(operationString: string): Promise<Operation> {
        const parts = operationString.split(';');

        let operation: string = "invalid";
        if (parts[0]) {
            operation = parts[0].trim().toLowerCase();
        }

        let elements1: number[] = []
        if (parts[1]) {
            elements1 = parts[1].trim().split(',').map((item) => {
                return Number(item.trim());
            });
        }

        let elements2: number[] = [];
        if (parts[2]) {
            elements2 = parts[2].trim().split(',').map((item) => {
                return Number(item.trim());
            });
        }

        return OperationFactory.getInstance(operation, elements1, elements2);
    }

    private static async getGrammarElementsFromString(grammar: string, language: Language) {
        const grammarElements: GrammarElement[] = [];
        const stringGrammarElements: string[] = grammar.split("");
        for (const element of stringGrammarElements) {
            grammarElements.push(await GrammarElementFactory.getInstance(element, language));
        }

        return grammarElements;
    }
}