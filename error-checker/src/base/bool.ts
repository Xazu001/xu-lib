import type { BaseOfFunction, ThingsToDo, ValidationResult, TypeGuard } from "./base";
import { createValidationResult, typeCheck } from "./base";

export type BoolCheckers = {
  optional: () => BoolCheckers;
} & BaseOfFunction<boolean>;

const isBoolean: TypeGuard<boolean> = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

export function boolBase(name?: string): BoolCheckers {
  let optional = false;

  const thingsToDo: ThingsToDo<boolean> = {
    f: (v: unknown) => {
      return typeCheck(
        v,
        isBoolean,
        name
          ? `The field '${name}' must be a boolean!`
          : "One of the required fields must be a boolean!"
      );
    },
  };

  const check: BoolCheckers = {
    optional: () => {
      optional = true;
      thingsToDo.optional = () => "true";
      return check;
    },

    validate: () => thingsToDo,
  };

  return check;
}
