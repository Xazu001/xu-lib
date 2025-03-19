import * as z from "zod";
export declare function array(name?: string): {
    getType: (itemType: z.ZodTypeAny) => z.ZodArray<z.ZodTypeAny, "many"> | z.ZodOptional<z.ZodArray<z.ZodTypeAny, "many">>;
    value: (vb: import("../base/base").TypesFunction) => import("../base/array").ArrayCheckers;
    minLength: (length: number, message: string) => import("../base/array").ArrayCheckers;
    maxLength: (length: number, message: string) => import("../base/array").ArrayCheckers;
    optional: () => import("../base/array").ArrayCheckers;
    validate: () => import("../base/base").ThingsToDo;
};
