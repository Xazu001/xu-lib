import type { BaseOfFunction } from "./base";
export type StringCheckers = {
    min: (length: number, message: string) => StringCheckers;
    max: (length: number, message: string) => StringCheckers;
    email: (message: string) => StringCheckers;
    eq: (value: string[], message: string) => StringCheckers;
    optional: () => StringCheckers;
} & BaseOfFunction;
export declare function stringBase(name?: string): StringCheckers;
