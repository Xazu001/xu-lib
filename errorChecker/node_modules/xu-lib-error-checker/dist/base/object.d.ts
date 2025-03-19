import type { BaseOfFunction, TypesFunction } from "./base";
export type ObjectCheckers = {
    value: (vb: Record<string, TypesFunction>) => ObjectCheckers;
    optional: () => ObjectCheckers;
} & BaseOfFunction;
export declare function objectBase(name?: string): ObjectCheckers;
