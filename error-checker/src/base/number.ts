import type { ValidatorMap, ValidationResult, TypeGuard } from "./base";
import { createValidationResult, typeCheck } from "./base";
import defaultMessages from "./defaultMessages";

export type NumberCheckers = {
  /**
   * Validates if number is at least equal to provided minimum
   * @param min - Minimum value
   * @param message - Optional custom error message
   * @returns NumberCheckers instance for chaining
   */
  min: (min: number, message?: string) => NumberCheckers;
  /**
   * Validates if number is at most equal to provided maximum
   * @param max - Maximum value
   * @param message - Optional custom error message
   * @returns NumberCheckers instance for chaining
   */
  max: (max: number, message?: string) => NumberCheckers;
  /**
   * Validates if number is positive (greater than zero)
   * @param message - Optional custom error message
   * @returns NumberCheckers instance for chaining
   */
  positive: (message?: string) => NumberCheckers;
  /**
   * Validates if number is negative (less than zero)
   * @param message - Optional custom error message
   * @returns NumberCheckers instance for chaining
   */
  negative: (message?: string) => NumberCheckers;
  /**
   * Validates if number is an integer
   * @param message - Optional custom error message
   * @returns NumberCheckers instance for chaining
   */
  int: (message?: string) => NumberCheckers;
  /**
   * Validates if number has exactly the specified decimal places
   * @param places - Number of decimal places required
   * @param message - Optional custom error message
   * @returns NumberCheckers instance for chaining
   */
  decimal: (places: number, message?: string) => NumberCheckers;
  /**
   * Validates if number is a multiple of the provided factor
   * @param factor - Number to check divisibility against
   * @param message - Optional custom error message
   * @returns NumberCheckers instance for chaining
   */
  multipleOf: (factor: number, message?: string) => NumberCheckers;
  /**
   * Validates if number is within the specified range (inclusive)
   * @param min - Minimum value of the range
   * @param max - Maximum value of the range
   * @param message - Optional custom error message
   * @returns NumberCheckers instance for chaining
   */
  range: (min: number, max: number, message?: string) => NumberCheckers;
  /**
   * Makes this validator optional
   * @returns NumberCheckers instance for chaining
   */
  optional: () => NumberCheckers;
  /**
   * Returns a ValidatorMap instance which can be validated
   * @returns ValidatorMap instance
   */
  validate: () => ValidatorMap;
};

const isNumber: TypeGuard<number> = (value: unknown): value is number => {
  return typeof value === "number" && !isNaN(value);
};

/**
 * Checker for number validators
 * @param name name of the field
 * @returns NumberCheckers instance
 */
export function numberBase(name?: string): NumberCheckers {
  let optional = false;

  const check: NumberCheckers = {
    min: (min: number, message?: string) => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const numberCheck = typeCheck(v, isNumber, "Value must be a number");
          if (!numberCheck.isValid) {
            return numberCheck;
          }

          const num = v as number;
          if (num < min) {
            const defaultMsg = defaultMessages.number.min.replace('[.]', name || 'Value').replace('[min]', min.toString());
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true);
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return check;
    },

    max: (max: number, message?: string) => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const numberCheck = typeCheck(v, isNumber, "Value must be a number");
          if (!numberCheck.isValid) {
            return numberCheck;
          }

          const num = v as number;
          if (num > max) {
            const defaultMsg = defaultMessages.number.max.replace('[.]', name || 'Value').replace('[max]', max.toString());
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true);
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return check;
    },

    positive: (message?: string) => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const numberCheck = typeCheck(v, isNumber, "Value must be a number");
          if (!numberCheck.isValid) {
            return numberCheck;
          }

          const num = v as number;
          if (num <= 0) {
            const defaultMsg = defaultMessages.number.positive.replace('[.]', name || 'Value');
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true);
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return check;
    },

    negative: (message?: string) => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const numberCheck = typeCheck(v, isNumber, "Value must be a number");
          if (!numberCheck.isValid) {
            return numberCheck;
          }

          const num = v as number;
          if (num >= 0) {
            const defaultMsg = defaultMessages.number.negative.replace('[.]', name || 'Value');
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true);
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return check;
    },

    int: (message?: string) => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const numberCheck = typeCheck(v, isNumber, "Value must be a number");
          if (!numberCheck.isValid) {
            return numberCheck;
          }

          const num = v as number;
          if (!Number.isInteger(num)) {
            const defaultMsg = defaultMessages.number.int.replace('[.]', name || 'Value');
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true);
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return check;
    },

    decimal: (places: number, message?: string) => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const numberCheck = typeCheck(v, isNumber, "Value must be a number");
          if (!numberCheck.isValid) {
            return numberCheck;
          }

          const num = v as number;
          const decimalPlaces = (num.toString().split(".")[1] || "").length;
          if (decimalPlaces !== places) {
            const defaultMsg = defaultMessages.number.decimal.replace('[.]', name || 'Value').replace('[places]', places.toString());
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true);
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return check;
    },

    multipleOf: (factor: number, message?: string) => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const numberCheck = typeCheck(v, isNumber, "Value must be a number");
          if (!numberCheck.isValid) {
            return numberCheck;
          }

          const num = v as number;
          if (num % factor !== 0) {
            const defaultMsg = defaultMessages.number.multipleOf.replace('[.]', name || 'Value').replace('[factor]', factor.toString());
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true);
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return check;
    },

    range: (min: number, max: number, message?: string) => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const numberCheck = typeCheck(v, isNumber, "Value must be a number");
          if (!numberCheck.isValid) {
            return numberCheck;
          }

          const num = v as number;
          if (num < min || num > max) {
            const defaultMsg = defaultMessages.number.range.replace('[.]', name || 'Value').replace('[min]', min.toString()).replace('[max]', max.toString());
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true);
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return check;
    },

    optional: () => {
      optional = true;
      return check;
    },

    validate: () => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          return typeCheck(
            v,
            isNumber,
            defaultMessages.number.base.replace('[.]', name || 'Value')
          );
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return validators;
    }
  };

  return check;
}
