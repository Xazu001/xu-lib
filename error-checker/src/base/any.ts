import type { BaseOfFunction, ThingsToDo } from "./base";

export type AnyCheckers = {
  optional: () => AnyCheckers;
} & BaseOfFunction;

export function anyBase(name?: string): AnyCheckers {
  let optional = false;

  const thingsToDo: ThingsToDo = {
    f: (v: any) => {
      if (v === undefined || v === null) {
        return name
          ? `The field '${name}' must not be null or undefined!`
          : "One of the required fields must not be null or undefined!";
      }
      return null;
    },
  };

  const check: AnyCheckers = {
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
