import type { BaseChecker, ValidationResult, TypeGuard, ValidatorMap } from "./base";
import { createValidationResult, typeCheck } from "./base";
import defaultMessages from "./defaultMessages";

export type ArrayValidator<T = unknown> = {
  /**
   * Validates each item in the array using provided validator
   * @param vb - Base checker for array items
   * @returns ArrayValidator instance for chaining
   */
  value: (vb: BaseChecker) => ArrayValidator<T>;
  /**
   * Validates if array length is at least equal to provided length
   * @param length - Minimal length of the array
   * @param message - Optional custom error message
   * @returns ArrayValidator instance for chaining
   */
  minLength: (length: number, message?: string) => ArrayValidator<T>;
  /**
   * Validates if array length is at most equal to provided length
   * @param length - Maximal length of the array
   * @param message - Optional custom error message
   * @returns ArrayValidator instance for chaining
   */
  maxLength: (length: number, message?: string) => ArrayValidator<T>;
  /**
   * Makes this validator optional
   * @returns ArrayValidator instance for chaining
   */
  optional: () => ArrayValidator<T>;
  /**
   * Returns a ValidatorMap instance which can be validated
   * @returns ValidatorMap instance
   */
  validate: () => ValidatorMap;
};

const isArray: TypeGuard<unknown[]> = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

/**
 * Checker for array validators
 * @param name name of the field
 * @returns ArrayValidator instance
 */
export function arrayBase<T = unknown>(name?: string): ArrayValidator<T> {
  let optional = false;
  let validators: ValidatorMap[] = [];
  let itemValidator: BaseChecker | undefined;

  const check: ArrayValidator<T> = {
    value: (vb: BaseChecker) => {
      itemValidator = vb;
      return check;
    },

    minLength: (length: number, message?: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const arr = v as unknown[];
          if (arr.length < length) {
            const defaultMsg = defaultMessages.array.minLength.replace('[.]', name || 'Value').replace('[length]', length.toString());
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },

    maxLength: (length: number, message?: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const arr = v as unknown[];
          if (arr.length > length) {
            const defaultMsg = defaultMessages.array.maxLength.replace('[.]', name || 'Value').replace('[length]', length.toString());
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },

    optional: () => {
      optional = true;
      return check;
    },

    validate: () => {
      const baseValidator: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const arrayCheck = typeCheck(
            v,
            isArray,
            defaultMessages.array.base.replace('[.]', name || 'Value')
          );
          if (!arrayCheck.isValid) {
            return arrayCheck;
          }

          const arr = v as unknown[];
          if (itemValidator) {
            const validatorMap = itemValidator.validate();
            for (let i = 0; i < arr.length; i++) {
              const result = validatorMap.f(arr[i]);
              if (!result.isValid) {
                const defaultMsg = defaultMessages.array.item.replace('[index]', i.toString()).replace('[message]', result.message);
                return createValidationResult(false, defaultMsg);
              }
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
