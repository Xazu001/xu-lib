import { arrayBase } from "../base/array";
import * as z from "zod";

export function array(name?: string) {
  const baseCheck = arrayBase(name);

  return {
    ...baseCheck,
    getType: (itemType: z.ZodTypeAny) => {
      return baseCheck.validate().optional
        ? z.array(itemType).optional()
        : z.array(itemType);
    },
  };
}
