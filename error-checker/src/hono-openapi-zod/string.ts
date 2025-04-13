import { stringBase, StringValidator } from "../base/string";
import * as z from "zod";

export function string(name?: string): StringValidator & { getType: () => z.ZodTypeAny | z.ZodOptional<z.ZodString> } {
  const baseCheck = stringBase(name);

  const wrapMethod = (method: Function) => {
    return (...args: any[]) => {
      method.apply(baseCheck, args);
      return {
        ...baseCheck,
        getType: () => {
          return baseCheck.validate().optional ? z.string().optional() : z.string();
        },
      };
    };
  };

  const enhancedBaseCheck = Object.fromEntries(
    Object.entries(baseCheck).map(([key, value]) => [
      key,
      typeof value === 'function' ? wrapMethod(value) : value,
    ])
  );

  // console.log({
  //   ...baseCheck,
  //   ...enhancedBaseCheck,
  //   getType: () => {
  //     return baseCheck.validate().optional ? z.string().optional() : z.string();
  //   },
  // })

  return {
    ...baseCheck,
    ...enhancedBaseCheck,
    getType: () => {
      return baseCheck.validate().optional ? z.string().optional() : z.string();
    },
  };
}
