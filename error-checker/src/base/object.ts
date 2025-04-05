import type { BaseChecker, ValidationResult, TypeGuard, ValidatorMap } from "./base";
import { createValidationResult, typeCheck } from "./base";
import defaultMessages from "./defaultMessages";

export type ObjectValidator<T = Record<string, unknown>> = {
  value: (vb: Record<string, BaseChecker>) => ObjectValidator<T>;
  optional: () => ObjectValidator<T>;
  validate: () => ValidatorMap;
};

const isObject: TypeGuard<Record<string, unknown>> = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export function objectBase<T = Record<string, unknown>>(name?: string): ObjectValidator<T> {
  let optional = false;
  let validators: ValidatorMap[] = [];
  let objectValidators: Record<string, BaseChecker> = {};

  const check: ObjectValidator<T> = {
    value: (vb: Record<string, BaseChecker>) => {
      objectValidators = vb;
      return check;
    },
    optional: () => {
      optional = true;
      return check;
    },
    validate: () => {
      const baseValidator: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const objectCheck = typeCheck(
            v,
            isObject,
            defaultMessages.object.base.replace('[.]', name || 'Value')
          );
          if (!objectCheck.isValid) {
            return objectCheck;
          }

          const obj = v as Record<string, unknown>;
          for (const [key, validator] of Object.entries(objectValidators)) {
            const value = obj[key];
            const validatorMap = validator.validate();
            const result = validatorMap.f(value);
            if (!result.isValid) {
              const defaultMsg = defaultMessages.object.field.replace('[field]', key).replace('[message]', result.message);
              return createValidationResult(false, defaultMsg);
            }
          }

          for (const validator of validators) {
            const result = validator.f(v);
            if (!result.isValid) {
              return result;
            }
          }

          return createValidationResult(true, "");
        }
      };

      if (optional) {
        baseValidator.optional = () => "true" as const;
      }

      return baseValidator;
    }
  };

  return check;
}
