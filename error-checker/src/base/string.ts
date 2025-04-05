import type { BaseOfFunction, ThingsToDo, ValidationResult, TypeGuard } from "./base";
import { createValidationResult, typeCheck } from "./base";

export type StringCheckers = {
  min: (length: number, message: string) => StringCheckers;
  max: (length: number, message: string) => StringCheckers;
  email: (message: string) => StringCheckers;
  eq: (values: string[], message: string) => StringCheckers;
  noSpecialChars: (message: string) => StringCheckers;
  optional: () => StringCheckers;
} & BaseOfFunction<string>;

const isString: TypeGuard<string> = (value: unknown): value is string => {
  return typeof value === "string";
};

export function stringBase(name?: string): StringCheckers {
  let optional = false;

  const thingsToDo: ThingsToDo<string> = {
    f: (v: unknown) => {
      return typeCheck(
        v,
        isString,
        name
          ? `The field '${name}' must be a string!`
          : "One of the required fields must be a string!"
      );
    },
  };

  const check: StringCheckers = {
    min: (length: number, message: string) => {
      thingsToDo.min = (v: unknown) => {
        const stringCheck = typeCheck(v, isString, "Value must be a string");
        if (!stringCheck.isValid) {
          return stringCheck;
        }

        const str = v as string;
        if (str.length < length) {
          return createValidationResult(false, message);
        }
        return createValidationResult(true);
      };

      return check;
    },

    max: (length: number, message: string) => {
      thingsToDo.max = (v: unknown) => {
        const stringCheck = typeCheck(v, isString, "Value must be a string");
        if (!stringCheck.isValid) {
          return stringCheck;
        }

        const str = v as string;
        if (str.length > length) {
          return createValidationResult(false, message);
        }
        return createValidationResult(true);
      };

      return check;
    },

    email: (message: string) => {
      thingsToDo.email = (v: unknown) => {
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
      };

      return check;
    },

    eq: (values: string[], message: string) => {
      thingsToDo.eq = (v: unknown) => {
        const stringCheck = typeCheck(v, isString, "Value must be a string");
        if (!stringCheck.isValid) {
          return stringCheck;
        }

        const str = v as string;
        if (!values.includes(str)) {
          return createValidationResult(false, message);
        }
        return createValidationResult(true);
      };

      return check;
    },

    noSpecialChars: (message: string) => {
      thingsToDo.noSpecialChars = (v: unknown) => {
        const stringCheck = typeCheck(v, isString, "Value must be a string");
        if (!stringCheck.isValid) {
          return stringCheck;
        }

        const str = v as string;
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharsRegex.test(str)) {
          return createValidationResult(false, message);
        }
        return createValidationResult(true);
      };

      return check;
    },

    optional: () => {
      optional = true;
      thingsToDo.optional = () => "true";
      return check;
    },

    validate: () => thingsToDo,
  };

  return check;
}
