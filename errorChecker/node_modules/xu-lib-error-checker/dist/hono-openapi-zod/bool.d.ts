import * as z from "zod";
export declare function bool(name?: string): {
    getType: () => z.ZodBoolean | z.ZodOptional<z.ZodBoolean>;
    optional: () => import("../base/bool").BoolCheckers;
    validate: () => import("../base/base").ThingsToDo;
};
