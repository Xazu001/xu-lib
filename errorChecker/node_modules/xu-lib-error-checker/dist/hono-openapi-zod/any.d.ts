import * as z from "zod";
export declare function any(name?: string): {
    getType: () => z.ZodAny | z.ZodOptional<z.ZodAny>;
    optional: () => import("../base/any").AnyCheckers;
    validate: () => import("../base/base").ThingsToDo;
};
