import * as z from "zod";
export declare function object(name?: string): {
    getType: (vb: Record<string, z.ZodTypeAny>) => z.ZodObject<Record<string, z.ZodTypeAny>, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }> | z.ZodOptional<z.ZodObject<Record<string, z.ZodTypeAny>, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>>;
    value: (vb: Record<string, import("../base/base").TypesFunction>) => import("../base/object").ObjectCheckers;
    optional: () => import("../base/object").ObjectCheckers;
    validate: () => import("../base/base").ThingsToDo;
};
