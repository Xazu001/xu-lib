import type { ValidationTargets } from "hono";
import type { MiddlewareHandler } from "hono";
import type { EFunctionsInputs } from "../base/base";
import type { ResolverResult } from "hono-openapi";
import type { ZodTypeAny } from "zod";
type ValidatorInput = EFunctionsInputs & {
    getType: () => ZodTypeAny;
};
export declare const validator: (type: keyof ValidationTargets, err: ValidatorInput) => MiddlewareHandler;
export declare function resolver(err: ValidatorInput): ResolverResult;
export { any } from "./any";
export { array } from "./array";
export { bool } from "./bool";
export { number } from "./number";
export { object } from "./object";
export { string } from "./string";
