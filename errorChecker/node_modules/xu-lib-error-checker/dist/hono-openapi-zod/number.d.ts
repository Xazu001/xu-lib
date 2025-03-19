import * as z from "zod";
export declare function number(name?: string): {
    getType: () => z.ZodNumber | z.ZodOptional<z.ZodNumber>;
    min: (value: number, message: string) => import("../base/number").NumberCheckers;
    max: (value: number, message: string) => import("../base/number").NumberCheckers;
    int: (message: string) => import("../base/number").NumberCheckers;
    optional: () => import("../base/number").NumberCheckers;
    validate: () => import("../base/base").ThingsToDo;
};
