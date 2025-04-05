import type { BaseOfFunction, ValidatorMap, ValidationResult, TypeGuard } from "./base";
import { createValidationResult, typeCheck } from "./base";

export type StringValidator = {
  min: (length: number, message: string) => StringValidator;
  max: (length: number, message: string) => StringValidator;
  email: (message: string) => StringValidator;
  eq: (value: string, message: string) => StringValidator;
  neq: (value: string, message: string) => StringValidator;
  regex: (pattern: RegExp, message: string) => StringValidator;
  includes: (value: string, message: string) => StringValidator;
  startsWith: (value: string, message: string) => StringValidator;
  endsWith: (value: string, message: string) => StringValidator;
  url: (message: string) => StringValidator;
  uuid: (message: string) => StringValidator;
  optional: () => StringValidator;
  validate: () => ValidatorMap;
};

const isString: TypeGuard<string> = (value: unknown): value is string => {
  return typeof value === "string";
};

export function stringBase(name?: string): StringValidator {
  let optional = false;
  let validators: ValidatorMap[] = [];

  const check: StringValidator = {
    min: (length: number, message: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (str.length < length) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },

    max: (length: number, message: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (str.length > length) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },

    email: (message: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const stringCheck = typeCheck(v, isString, "Value must be a string");
          if (!stringCheck.isValid) {
            return stringCheck;
          }

          const str = v as string;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(str)) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true);
        }
      });
      return check;
    },

    eq: (value: string, message: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (str !== value) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },

    neq: (value: string, message: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (str === value) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },

    regex: (pattern: RegExp, message: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (!pattern.test(str)) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },

    includes: (value: string, message: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (!str.includes(value)) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },

    startsWith: (value: string, message: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (!str.startsWith(value)) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },

    endsWith: (value: string, message: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (!str.endsWith(value)) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },

    url: (message: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          try {
            new URL(str);
            return createValidationResult(true, "");
          } catch {
            return createValidationResult(false, message);
          }
        }
      });
      return check;
    },

    uuid: (message: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const stringCheck = typeCheck(v, isString, "Value must be a string");
          if (!stringCheck.isValid) {
            return stringCheck;
          }

          const str = v as string;
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
          if (!uuidRegex.test(str)) {
            return createValidationResult(false, message);
          }
          return createValidationResult(true);
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
          const stringCheck = typeCheck(
            v,
            isString,
            name
              ? `The field '${name}' must be a string!`
              : "One of the required fields must be a string!"
          );
          if (!stringCheck.isValid) {
            return stringCheck;
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
