import { anyBase } from "../base/any";
import * as z from "zod";

export function any(name?: string) {
  const baseCheck = anyBase(name);

  return {
    ...baseCheck,
    getType: () => {
      return baseCheck.validate().optional ? z.any().optional() : z.any();
    },
  };
}
