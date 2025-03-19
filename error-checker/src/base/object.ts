import type { BaseOfFunction, TypesFunction, ThingsToDo } from "./base";
import { errorChecker } from "./index";

export type ObjectCheckers = {
  value: (vb: Record<string, TypesFunction>) => ObjectCheckers;
  optional: () => ObjectCheckers;
} & BaseOfFunction;

export function objectBase(name?: string): ObjectCheckers {
  let optional = false;

  const thingsToDo: ThingsToDo = {
    f: (v: any) => {
      if (typeof v !== "object" || v === null || Array.isArray(v)) {
        return name
          ? `The field '${name}' must be an object!`
          : "One of the required fields must be an object!";
      }
      return null;
    },
  };

  const check: ObjectCheckers = {
    value: (vb: Record<string, TypesFunction>) => {
      const nextThingsToDo: Record<string, ThingsToDo> = {};
      for (const [key, value] of Object.entries(vb)) {
        const checkers = value.validate();
        nextThingsToDo[key] = { ...checkers };
      }

      thingsToDo.value = (v: any) => {
        const error = errorChecker(v, { general: vb });
        return error.general || null;
      };

      return check;
    },
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
