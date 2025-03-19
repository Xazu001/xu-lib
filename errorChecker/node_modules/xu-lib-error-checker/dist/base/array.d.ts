import type { BaseOfFunction, TypesFunction } from "./base";
export type ArrayCheckers = {
    value: (vb: TypesFunction) => ArrayCheckers;
    minLength: (length: number, message: string) => ArrayCheckers;
    maxLength: (length: number, message: string) => ArrayCheckers;
    optional: () => ArrayCheckers;
} & BaseOfFunction;
export declare function arrayBase(name?: string): ArrayCheckers;
