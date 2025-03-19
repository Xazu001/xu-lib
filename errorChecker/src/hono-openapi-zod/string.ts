import { stringBase } from "../base/string";
import * as z from "zod";

export function string(name?: string) {
  const baseCheck = stringBase(name);

  return {
    ...baseCheck,
    getType: () => {
      return baseCheck.validate().optional ? z.string().optional() : z.string();
    },
  };
}
