import type { BaseOfFunction } from "./base";
export type NumberCheckers = {
    min: (value: number, message: string) => NumberCheckers;
    max: (value: number, message: string) => NumberCheckers;
    int: (message: string) => NumberCheckers;
    optional: () => NumberCheckers;
} & BaseOfFunction;
export declare function numberBase(name?: string): NumberCheckers;
