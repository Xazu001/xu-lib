import type { BaseOfFunction, ThingsToDo, ValidationResult, TypeGuard } from "./base";
import { createValidationResult } from "./base";

export type AnyCheckers<T = unknown> = {
  optional: () => AnyCheckers<T>;
  typeGuard: (guard: TypeGuard<T>) => AnyCheckers<T>;
  customValidator: (validator: (value: unknown) => ValidationResult) => AnyCheckers<T>;
} & BaseOfFunction<T>;

export function anyBase<T = unknown>(name?: string): AnyCheckers<T> {
  let optional = false;
  let typeGuardFn: TypeGuard<T> | undefined;
  let customValidatorFn: ((value: unknown) => ValidationResult) | undefined;

  const thingsToDo: ThingsToDo<unknown> = {
    f: (v: unknown) => {
      if (v === undefined || v === null) {
        return createValidationResult(
          false,
          name
            ? `The field '${name}' must not be null or undefined!`
            : "One of the required fields must not be null or undefined!"
        );
      }

      if (typeGuardFn && !typeGuardFn(v)) {
        return createValidationResult(
          false,
          name
            ? `The field '${name}' has an invalid type!`
            : "One of the fields has an invalid type!"
        );
      }

      if (customValidatorFn) {
        return customValidatorFn(v);
      }

      return createValidationResult(true);
    },
  };

  const check: AnyCheckers<T> = {
    optional: () => {
      optional = true;
      return check;
    },
    typeGuard: (guard: TypeGuard<T>) => {
      typeGuardFn = guard;
      return check;
    },
    customValidator: (validator: (value: unknown) => ValidationResult) => {
      customValidatorFn = validator;
      return check;
    },
    validate: () => {
      return {
        ...thingsToDo,
        optional: (v: unknown) => {
          return optional ? "true" : "false";
        },
      };
    },
  };

  return check;
}
