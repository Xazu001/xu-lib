import type { BaseOfFunction, BaseChecker, ThingsToDo, ValidationResult, TypeGuard } from "./base";
import { createValidationResult, typeCheck } from "./base";
import { errorChecker } from "./index";

export type ObjectCheckers<T = Record<string, unknown>> = {
  value: (vb: Record<string, BaseChecker>) => ObjectCheckers<T>;
  optional: () => ObjectCheckers<T>;
} & BaseOfFunction<T>;

const isObject: TypeGuard<Record<string, unknown>> = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export function objectBase<T = Record<string, unknown>>(name?: string): ObjectCheckers<T> {
  let optional = false;

  const thingsToDo: ThingsToDo<T> = {
    f: (v: unknown) => {
      return typeCheck(
        v,
        isObject,
        name
          ? `The field '${name}' must be an object!`
          : "One of the required fields must be an object!"
      );
    },
  };

  const check: ObjectCheckers<T> = {
    value: (vb: Record<string, BaseChecker>) => {
      const nextThingsToDo: Record<string, ThingsToDo<unknown>> = {};
      for (const [key, value] of Object.entries(vb)) {
        const checkers = value.validate();
        nextThingsToDo[key] = { ...checkers };
      }

      thingsToDo.value = (v: unknown) => {
        const objectCheck = typeCheck(v, isObject, "Value must be an object");
        if (!objectCheck.isValid) {
          return objectCheck;
        }

        const obj = v as Record<string, unknown>;
        const error = errorChecker(obj, { general: vb });
        return error.general
          ? createValidationResult(false, error.general)
          : createValidationResult(true);
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
