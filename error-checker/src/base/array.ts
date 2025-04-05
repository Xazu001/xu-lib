import type { BaseOfFunction, BaseChecker, ThingsToDo, ValidationResult, TypeGuard } from "./base";
import { createValidationResult, typeCheck } from "./base";
import { errorChecker } from "./index";

export type ArrayCheckers<T = unknown> = {
  value: (vb: BaseChecker) => ArrayCheckers<T>;
  minLength: (length: number, message: string) => ArrayCheckers<T>;
  maxLength: (length: number, message: string) => ArrayCheckers<T>;
  optional: () => ArrayCheckers<T>;
} & BaseOfFunction<T[]>;

const isArray: TypeGuard<unknown[]> = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

export function arrayBase<T = unknown>(name?: string): ArrayCheckers<T> {
  let optional = false;

  const thingsToDo: ThingsToDo<unknown[]> = {
    f: (v: unknown) => {
      return typeCheck(
        v,
        isArray,
        name
          ? `The field '${name}' must be an array!`
          : "One of the required fields must be an array!"
      );
    },
  };

  const check: ArrayCheckers<T> = {
    value: (vb: BaseChecker) => {
      const itemThingsToDo = vb.validate();

      thingsToDo.value = (v: unknown) => {
        const arrayCheck = typeCheck(v, isArray, "Value must be an array");
        if (!arrayCheck.isValid) {
          return arrayCheck;
        }

        const arr = v as unknown[];
        for (const item of arr) {
          const error = errorChecker(
            { item },
            {
              general: {
                item: vb,
              },
            }
          );

          if (error.general) {
            return createValidationResult(false, error.general);
          }
        }

        return createValidationResult(true);
      };

      return check;
    },

    minLength: (length: number, message: string) => {
      thingsToDo.minLength = (v: unknown) => {
        const arrayCheck = typeCheck(v, isArray, "Value must be an array");
        if (!arrayCheck.isValid) {
          return arrayCheck;
        }

        const arr = v as unknown[];
        if (arr.length < length) {
          return createValidationResult(false, message);
        }
        return createValidationResult(true);
      };

      return check;
    },

    maxLength: (length: number, message: string) => {
      thingsToDo.maxLength = (v: unknown) => {
        const arrayCheck = typeCheck(v, isArray, "Value must be an array");
        if (!arrayCheck.isValid) {
          return arrayCheck;
        }

        const arr = v as unknown[];
        if (arr.length > length) {
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
