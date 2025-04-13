import * as z from "zod";
import {
  validator as zodValidator,
  resolver as zodResolver,
} from "hono-openapi/zod";
import type { ValidationTargets } from "hono";
import type { MiddlewareHandler } from "hono";
import type { EFunctionsInputs } from "../base/base";
import type { ResolverResult } from "hono-openapi";
import type { ZodTypeAny } from "zod";

type ValidatorInput = EFunctionsInputs & {
  getType: () => ZodTypeAny;
};

export const validator = (
  type: keyof ValidationTargets,
  err: ValidatorInput
): MiddlewareHandler => {
  const validationSchema: Record<string, z.ZodTypeAny> = {};

  for (const [key, value] of Object.entries(err)) {
    for (const [field, validator] of Object.entries(value)) {
      const validatorInstance = validator;
      if (validatorInstance?.getType()) {
        validationSchema[field] = validatorInstance.getType();
      }
    }
  }

  const zodMiddleware = zodValidator(type, z.object(validationSchema));

  return zodMiddleware;
};

export function resolver(err: ValidatorInput): ResolverResult {
  const validationSchema: Record<string, z.ZodTypeAny> = {};

  for (const [key, value] of Object.entries(err)) {
    validationSchema[key] = z.string().optional();
  }

  const schema = z.object(validationSchema);

  return zodResolver(schema);
}

export { any } from "./any";
export { array } from "./array";
export { bool } from "./bool";
export { number } from "./number";
export { object } from "./object";
export { string } from "./string";
export { errorChecker } from "../base/index";
