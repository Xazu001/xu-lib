import type { ZodTypeAny } from "zod";
import type { ValidatorMap } from "../../src/base/base";

export interface BaseOfFunction {
  validate: () => ValidatorMap;
  getType: () => ZodTypeAny;
}
