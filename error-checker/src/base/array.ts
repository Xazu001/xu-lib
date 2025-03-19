import type { BaseOfFunction, TypesFunction, ThingsToDo } from "./base";
import { errorChecker } from "./index";

export type ArrayCheckers = {
  value: (vb: TypesFunction) => ArrayCheckers;
  minLength: (length: number, message: string) => ArrayCheckers;
  maxLength: (length: number, message: string) => ArrayCheckers;
  optional: () => ArrayCheckers;
} & BaseOfFunction;

export function arrayBase(name?: string): ArrayCheckers {
  let optional = false;

  const thingsToDo: ThingsToDo = {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    f: (v: any) => {
      if (!Array.isArray(v)) {
        return name
          ? `The field '${name}' must be an array!`
          : "One of the required fields must be an array!";
      }
      return null;
    },
  };

  const check: ArrayCheckers = {
    value: (vb: TypesFunction) => {
      const itemThingsToDo: ThingsToDo = vb.validate();

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      thingsToDo.value = (v: any[]) => {
        let errorV: string | null = null;
        for (const item of v) {
          const error = errorChecker(
            { item: item },
            {
              general: {
                item: vb,
              },
            }
          );

          if (error.general) {
            errorV = error.general;
          }
        }

        return errorV;
      };

      return check;
    },
    minLength: (length: number, message: string) => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      thingsToDo.minLength = (v: any[]) => {
        if (v.length < length) {
          return message;
        }
        return null;
      };
      return check;
    },
    maxLength: (length: number, message: string) => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      thingsToDo.maxLength = (v: any[]) => {
        if (v.length > length) {
          return message;
        }
        return null;
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
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        optional: (v: any) => {
          return optional ? "true" : "false";
        },
      };
    },
  };

  return check;
}
