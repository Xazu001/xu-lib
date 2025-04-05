import type { BaseOfFunction, ValidatorMap, ValidationResult, TypeGuard } from "./base";
import { createValidationResult, typeCheck } from "./base";

export type BoolCheckers = {
  optional: () => BoolCheckers;
} & BaseOfFunction<boolean>;

const isBool: TypeGuard<boolean> = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

export function boolBase(name?: string): BoolCheckers {
  let optional = false;

  const check: BoolCheckers = {
    optional: () => {
      optional = true;
      return check;
    },

    validate: () => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          return typeCheck(
            v,
            isBool,
            name
              ? `The field '${name}' must be a boolean!`
              : "One of the required fields must be a boolean!"
          );
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return validators;
    },
  };

  return check;
}
