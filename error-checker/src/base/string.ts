import type { ValidatorMap, ValidationResult, TypeGuard } from "./base";
import { createValidationResult, typeCheck } from "./base";
import defaultMessages from "./defaultMessages";

// @description String validators

export type StringValidator = {
  /**
   * Validates if string length is at least equal to provided length
   * @param length - Minimal length of the string
   * @param message - Optional custom error message
   * @returns StringValidator instance for chaining
   */
  min: (length: number, message?: string) => StringValidator;
  /**
   * Validates if string length is at most equal to provided length
   * @param length - Maximal length of the string
   * @param message - Optional custom error message
   * @returns StringValidator instance for chaining
   */
  max: (length: number, message?: string) => StringValidator;
  /**
   * Validates if string is a valid email address
   * @param message - Optional custom error message
   * @returns StringValidator instance for chaining
   */
  email: (message?: string) => StringValidator;
  /**
   * Validates if string is equal to provided value
   * @param value - Value to compare with
   * @param message - Optional custom error message
   * @returns StringValidator instance for chaining
   */
  eq: (value: string, message?: string) => StringValidator;
  /**
   * Validates if string is not equal to provided value
   * @param value - Value to compare with
   * @param message - Optional custom error message
   * @returns StringValidator instance for chaining
   */
  neq: (value: string, message?: string) => StringValidator;
  /**
   * Validates if string matches provided regular expression
   * @param pattern - Regular expression to match
   * @param message - Optional custom error message
   * @returns StringValidator instance for chaining
   */
  regex: (pattern: RegExp, message?: string) => StringValidator;
  /**
   * Validates if string includes provided value
   * @param value - Value to include
   * @param message - Optional custom error message
   * @returns StringValidator instance for chaining
   */
  includes: (value: string, message?: string) => StringValidator;
  /**
   * Validates if string starts with provided value
   * @param value - Value to start with
   * @param message - Optional custom error message
   * @returns StringValidator instance for chaining
   */
  startsWith: (value: string, message?: string) => StringValidator;
  /**
   * Validates if string ends with provided value
   * @param value - Value to end with
   * @param message - Optional custom error message
   * @returns StringValidator instance for chaining
   */
  endsWith: (value: string, message?: string) => StringValidator;
  /**
   * Validates if string is a valid URL
   * @param message - Optional custom error message
   * @returns StringValidator instance for chaining
   */
  url: (message?: string) => StringValidator;
  /**
   * Validates if string is a valid UUID
   * @param message - Optional custom error message
   * @returns StringValidator instance for chaining
   */
  uuid: (message?: string) => StringValidator;
  /**
   * Makes this validator optional
   * @returns StringValidator instance for chaining
   */
  optional: () => StringValidator;
  /**
   * Returns a ValidatorMap instance which can be validated
   * @returns ValidatorMap instance
   */
  validate: () => ValidatorMap;
};

const isString: TypeGuard<string> = (value: unknown): value is string => {
  return typeof value === "string";
};

/**
 * Checker for string validators
 * @param name name of the field
 * @returns StringValidator instance
 */
export function stringBase(name?: string): StringValidator {
  let optional = false;
  let validators: ValidatorMap[] = [];

  const check: StringValidator = {
    min: (length: number, message?: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (str.length < length) {
            const defaultMsg = defaultMessages.string.min.replace('[.]', name || 'Value').replace('[min]', length.toString());
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },
    max: (length: number, message?: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (str.length > length) {
            const defaultMsg = defaultMessages.string.max.replace('[.]', name || 'Value').replace('[max]', length.toString());
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },
    email: (message?: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const stringCheck = typeCheck(v, isString, "Value must be a string");
          if (!stringCheck.isValid) {
            return stringCheck;
          }

          const str = v as string;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(str)) {
            const defaultMsg = defaultMessages.string.email.replace('[.]', name || 'Value');
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true);
        }
      });
      return check;
    },
    eq: (value: string, message?: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (str !== value) {
            const defaultMsg = defaultMessages.string.eq.replace('[.]', name || 'Value').replace('[value]', value);
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },
    neq: (value: string, message?: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (str === value) {
            const defaultMsg = defaultMessages.string.neq.replace('[.]', name || 'Value').replace('[value]', value);
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },
    regex: (pattern: RegExp, message?: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (!pattern.test(str)) {
            const defaultMsg = defaultMessages.string.regex.replace('[.]', name || 'Value').replace('[pattern]', pattern.toString());
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },
    includes: (value: string, message?: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (!str.includes(value)) {
            const defaultMsg = defaultMessages.string.includes.replace('[.]', name || 'Value').replace('[value]', value);
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },
    startsWith: (value: string, message?: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (!str.startsWith(value)) {
            const defaultMsg = defaultMessages.string.startsWith.replace('[.]', name || 'Value').replace('[value]', value);
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },
    endsWith: (value: string, message?: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          if (!str.endsWith(value)) {
            const defaultMsg = defaultMessages.string.endsWith.replace('[.]', name || 'Value').replace('[value]', value);
            return createValidationResult(false, message || defaultMsg);
          }
          return createValidationResult(true, "");
        }
      });
      return check;
    },
    url: (message?: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const str = v as string;
          try {
            new URL(str);
            return createValidationResult(true, "");
          } catch {
            const defaultMsg = defaultMessages.string.url.replace('[.]', name || 'Value');
            return createValidationResult(false, message || defaultMsg);
          }
        }
      });
      return check;
    },
    uuid: (message?: string) => {
      validators.push({
        f: (v: unknown): ValidationResult => {
          const stringCheck = typeCheck(v, isString, "Value must be a string");
          if (!stringCheck.isValid) {
            return stringCheck;
          }

          const str = v as string;
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
          if (!uuidRegex.test(str)) {
            const defaultMsg = defaultMessages.string.uuid.replace('[.]', name || 'Value');
            return createValidationResult(false, message || defaultMsg);
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
