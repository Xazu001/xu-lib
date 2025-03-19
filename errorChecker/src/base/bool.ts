import type { BaseOfFunction, ThingsToDo } from "./base";

export type BoolCheckers = {
  optional: () => BoolCheckers;
} & BaseOfFunction;

export function boolBase(name?: string): BoolCheckers {
  let optional = false;

  const thingsToDo: ThingsToDo = {
    f: (v: any) => {
      if (typeof v !== "boolean") {
        return name
          ? `The field '${name}' must be a boolean!`
          : "One of the required fields must be a boolean!";
      }
      return null;
    },
  };

  const check: BoolCheckers = {
    optional: () => {
      optional = true;
      return check;
    },
    validate: () => {
      return {
        ...thingsToDo,
        optional: (v: any) => {
          return optional ? "true" : "false";
        },
      };
    },
  };

  return check;
}
