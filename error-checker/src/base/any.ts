import type { ValidationResult, TypeGuard, ValidatorMap } from "./base";
import { createValidationResult } from "./base";

export type AnyValidator<T = unknown> = {
  /**
   * Makes this validator optional
   * @returns AnyValidator instance for chaining
   */
  optional: () => AnyValidator<T>;
  /**
   * Adds a type guard validation
   * @param guard - Type guard function to validate the value
   * @returns AnyValidator instance for chaining
   */
  typeGuard: (guard: TypeGuard<T>) => AnyValidator<T>;
  /**
   * Adds a custom validation function
   * @param validator - Custom validation function
   * @returns AnyValidator instance for chaining
   */
  customValidator: (validator: (value: unknown) => ValidationResult) => AnyValidator<T>;
  /**
   * Returns a ValidatorMap instance which can be validated
   * @returns ValidatorMap instance
   */
  validate: () => ValidatorMap;
};

/**
 * Checker for any type validators
 * @param name name of the field
 * @returns AnyValidator instance
 */
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
