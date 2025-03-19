import { numberBase } from "../base/number";
import * as z from "zod";

export function number(name?: string) {
  const baseCheck = numberBase(name);

  return {
    ...baseCheck,
    getType: () => {
      return baseCheck.validate().optional ? z.number().optional() : z.number();
    },
  };
}
