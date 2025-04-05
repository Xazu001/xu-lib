import type { ValidationResult, TypeGuard, ValidatorMap } from "./base";
import { createValidationResult } from "./base";

export type AnyValidator<T = unknown> = {
  optional: () => AnyValidator<T>;
  typeGuard: (guard: TypeGuard<T>) => AnyValidator<T>;
  customValidator: (validator: (value: unknown) => ValidationResult) => AnyValidator<T>;
  validate: () => ValidatorMap;
};

export function anyBase<T = unknown>(name?: string): AnyValidator<T> {
  let optional = false;
  let typeGuardFn: TypeGuard<T> | undefined;
  let customValidatorFn: ((value: unknown) => ValidationResult) | undefined;
  let validators: ValidatorMap[] = [];

  const check: AnyValidator<T> = {
    typeGuard: (guard: TypeGuard<T>) => {
      typeGuardFn = guard;
      return check;
    },

    customValidator: (validator: (value: unknown) => ValidationResult) => {
      customValidatorFn = validator;
      return check;
    },

    optional: () => {
      optional = true;
      return check;
    },

    validate: () => {
      const baseValidator: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          if (v === undefined || v === null) {
            return createValidationResult(
              false,
              name
                ? `The field '${name}' must not be null or undefined!`
                : "One of the required fields must not be null or undefined!"
            );
          }

          if (typeGuardFn && !typeGuardFn(v)) {
            return createValidationResult(
              false,
              name
                ? `The field '${name}' has an invalid type!`
                : "One of the required fields has an invalid type!"
            );
          }

          if (customValidatorFn) {
            const result = customValidatorFn(v);
            if (!result.isValid) {
              return result;
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
