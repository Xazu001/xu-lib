import type { BaseChecker, ValidationResult, TypeGuard, ValidatorMap } from "./base";
import { createValidationResult, typeCheck } from "./base";

export type ArrayValidator<T = unknown> = {
  value: (vb: BaseChecker) => ArrayValidator<T>;
  minLength: (length: number, message: string) => ArrayValidator<T>;
  maxLength: (length: number, message: string) => ArrayValidator<T>;
  optional: () => ArrayValidator<T>;
  validate: () => ValidatorMap;
};

const isArray: TypeGuard<unknown[]> = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

export function arrayBase<T = unknown>(name?: string): ArrayValidator<T> {
  let optional = false;
  let validators: ValidatorMap[] = [];
  let itemValidator: BaseChecker | undefined;

  const check: ArrayValidator<T> = {
    value: (vb: BaseChecker) => {
      itemValidator = vb;
      return check;
    },

    minLength: (length: number, message: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const arr = v as unknown[];
          if (arr.length < length) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },

    maxLength: (length: number, message: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const arr = v as unknown[];
          if (arr.length > length) {
            return createValidationResult(false, message);
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
            name
              ? `The field '${name}' must be an array!`
              : "One of the required fields must be an array!"
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
                return createValidationResult(false, `Item at index ${i}: ${result.message}`);
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
