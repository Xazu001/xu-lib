import type { ValidatorMap, ValidationResult, TypeGuard } from "./base";
import { createValidationResult, typeCheck } from "./base";
import defaultMessages from "./defaultMessages";

export type NumberCheckers = {
  min: (min: number, message?: string) => NumberCheckers;
  max: (max: number, message?: string) => NumberCheckers;
  positive: (message?: string) => NumberCheckers;
  negative: (message?: string) => NumberCheckers;
  int: (message?: string) => NumberCheckers;
  decimal: (places: number, message?: string) => NumberCheckers;
  multipleOf: (factor: number, message?: string) => NumberCheckers;
  range: (min: number, max: number, message?: string) => NumberCheckers;
  optional: () => NumberCheckers;
  validate: () => ValidatorMap;
};

const isNumber: TypeGuard<number> = (value: unknown): value is number => {
  return typeof value === "number" && !isNaN(value);
};

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
