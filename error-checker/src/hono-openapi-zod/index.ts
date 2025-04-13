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

type ValidatorField = {
  getType?: () => ZodTypeAny;
  validate?: () => any;
};

type ValidatorInput = {
  [key: string]: ValidatorField | Record<string, ValidatorField>;
};

export const validator = (
  type: keyof ValidationTargets,
  err: ValidatorInput
): MiddlewareHandler => {
  const validationSchema: Record<string, z.ZodTypeAny> = {};

  for (const [key, value] of Object.entries(err)) {
    // Handle nested structure if value is an object with fields
    if (typeof value === 'object' && value !== null && !('getType' in value)) {
      // This is a nested structure like errorInput
      for (const [field, validator] of Object.entries(value as Record<string, ValidatorField>)) {
        const validatorInstance = validator;
        if (validatorInstance?.getType) {
          validationSchema[field] = validatorInstance.getType();
        }
      }
    } else if ((value as ValidatorField)?.getType) {
      // Direct validator
      validationSchema[key] = (value as ValidatorField).getType!();
    }
  }

  const zodMiddleware = zodValidator(type, z.object(validationSchema));

  return zodMiddleware;
};

export function resolver(err: ValidatorInput): ResolverResult {
  const validationSchema: Record<string, z.ZodTypeAny> = {};

  for (const [key, value] of Object.entries(err)) {
    // Handle nested structure if value is an object with fields
    if (typeof value === 'object' && value !== null && !('getType' in value)) {
      // This is a nested structure like errorInput
      const nestedSchema: Record<string, z.ZodTypeAny> = {};
      
      for (const [field, validator] of Object.entries(value as Record<string, ValidatorField>)) {
        const validatorInstance = validator;
        if (validatorInstance?.getType) {
          nestedSchema[field] = validatorInstance.getType();
        }
      }
      
      if (Object.keys(nestedSchema).length > 0) {
        validationSchema[key] = z.object(nestedSchema);
      } else {
        validationSchema[key] = z.string().optional();
      }
    } else if ((value as ValidatorField)?.getType) {
      // Direct validator
      validationSchema[key] = (value as ValidatorField).getType!();
    } else {
      validationSchema[key] = z.string().optional();
    }
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
