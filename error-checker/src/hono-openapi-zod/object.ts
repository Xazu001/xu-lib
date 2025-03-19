import { objectBase } from "../base/object";
import * as z from "zod";

export function object(name?: string) {
  const baseCheck = objectBase(name);

  return {
    ...baseCheck,
    getType: (vb: Record<string, z.ZodTypeAny>) => {
      const schema: Record<string, z.ZodTypeAny> = {};
      for (const [key, value] of Object.entries(vb)) {
        schema[key] = value;
      }
      return baseCheck.validate().optional
        ? z.object(schema).optional()
        : z.object(schema);
    },
  };
}
