import { boolBase } from "../base/bool";
import * as z from "zod";

export function bool(name?: string) {
  const baseCheck = boolBase(name);

  return {
    ...baseCheck,
    getType: () => {
      return baseCheck.validate().optional
        ? z.boolean().optional()
        : z.boolean();
    },
  };
}
