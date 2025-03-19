import type { BaseOfFunction } from "./base";
export type BoolCheckers = {
    optional: () => BoolCheckers;
} & BaseOfFunction;
export declare function boolBase(name?: string): BoolCheckers;
