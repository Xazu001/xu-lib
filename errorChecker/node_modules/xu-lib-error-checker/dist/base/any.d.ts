import type { BaseOfFunction } from "./base";
export type AnyCheckers = {
    optional: () => AnyCheckers;
} & BaseOfFunction;
export declare function anyBase(name?: string): AnyCheckers;
