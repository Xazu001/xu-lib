import type { BaseOfFunction, ValidatorMap, ValidationResult, TypeGuard } from "./base";
import { createValidationResult, typeCheck } from "./base";

export type NumberCheckers = {
  min: (min: number, message: string) => NumberCheckers;
  max: (max: number, message: string) => NumberCheckers;
  positive: (message: string) => NumberCheckers;
  negative: (message: string) => NumberCheckers;
  range: (min: number, max: number, message: string) => NumberCheckers;
  multipleOf: (divisor: number, message: string) => NumberCheckers;
  decimal: (message: string) => NumberCheckers;
  optional: () => NumberCheckers;
} & BaseOfFunction<number>;

const isNumber: TypeGuard<number> = (value: unknown): value is number => {
  return typeof value === "number" && !isNaN(value);
};

export function numberBase(name?: string): NumberCheckers {
  let optional = false;

  const check: NumberCheckers = {
    min: (min: number, message: string) => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const numberCheck = typeCheck(v, isNumber, "Value must be a number");
          if (!numberCheck.isValid) {
            return numberCheck;
          }

          const num = v as number;
          if (num < min) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true);
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return check;
    },

    max: (max: number, message: string) => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const numberCheck = typeCheck(v, isNumber, "Value must be a number");
          if (!numberCheck.isValid) {
            return numberCheck;
          }

          const num = v as number;
          if (num > max) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true);
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return check;
    },

    positive: (message: string) => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const numberCheck = typeCheck(v, isNumber, "Value must be a number");
          if (!numberCheck.isValid) {
            return numberCheck;
          }

          const num = v as number;
          if (num <= 0) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true);
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return check;
    },

    negative: (message: string) => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const numberCheck = typeCheck(v, isNumber, "Value must be a number");
          if (!numberCheck.isValid) {
            return numberCheck;
          }

          const num = v as number;
          if (num >= 0) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true);
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return check;
    },

    range: (min: number, max: number, message: string) => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const numberCheck = typeCheck(v, isNumber, "Value must be a number");
          if (!numberCheck.isValid) {
            return numberCheck;
          }

          const num = v as number;
          if (num < min || num > max) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true);
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return check;
    },

    multipleOf: (divisor: number, message: string) => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const numberCheck = typeCheck(v, isNumber, "Value must be a number");
          if (!numberCheck.isValid) {
            return numberCheck;
          }

          const num = v as number;
          if (num % divisor !== 0) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true);
        }
      };

      if (optional) {
        validators.optional = () => "true" as const;
      }

      return check;
    },

    decimal: (message: string) => {
      const validators: ValidatorMap = {
        f: (v: unknown): ValidationResult => {
          const numberCheck = typeCheck(v, isNumber, "Value must be a number");
          if (!numberCheck.isValid) {
            return numberCheck;
          }

          const num = v as number;
          if (Math.floor(num) === num) {
            return createValidationResult(false, message);
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
            name
              ? `The field '${name}' must be a number!`
              : "One of the required fields must be a number!"
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
