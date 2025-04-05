import type { BaseOfFunction, ValidatorMap, ValidationResult, TypeGuard } from "./base";
import { typeCheck } from "./base";
import defaultMessages from "./defaultMessages";

export type BoolCheckers = {
  /**
   * Makes this validator optional
   * @returns BoolCheckers instance for chaining
   */
  optional: () => BoolCheckers;
} & BaseOfFunction<boolean>;

const isBool: TypeGuard<boolean> = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

/**
 * Checker for boolean validators
 * @param name name of the field
 * @returns BoolCheckers instance
 */
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
            defaultMessages.bool.base.replace('[.]', name || 'Value')
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
