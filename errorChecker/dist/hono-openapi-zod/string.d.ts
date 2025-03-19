import * as z from "zod";
export declare function string(name?: string): {
    getType: () => z.ZodString | z.ZodOptional<z.ZodString>;
    min: (length: number, message: string) => import("../base/string").StringCheckers;
    max: (length: number, message: string) => import("../base/string").StringCheckers;
    email: (message: string) => import("../base/string").StringCheckers;
    eq: (value: string[], message: string) => import("../base/string").StringCheckers;
    optional: () => import("../base/string").StringCheckers;
    validate: () => import("../base/base").ThingsToDo;
};
