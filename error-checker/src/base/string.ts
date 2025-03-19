import type { BaseOfFunction, ThingsToDo } from "./base";

export type StringCheckers = {
  min: (length: number, message: string) => StringCheckers;
  max: (length: number, message: string) => StringCheckers;
  email: (message: string) => StringCheckers;
  eq: (value: string[], message: string) => StringCheckers;
  optional: () => StringCheckers;
} & BaseOfFunction;

export function stringBase(name?: string): StringCheckers {
  let optional = false;

  const thingsToDo: ThingsToDo = {
    f: (v: any) => {
      if (typeof v !== "string") {
        return name
          ? `The field '${name}' has an invalid type or value!`
          : "One of the required fields has an invalid type or value!";
      }
      return null;
    },
  };

  const check: StringCheckers = {
    min: (length: number, message: string) => {
      thingsToDo.min = (v: string) => {
        if (v.length < length) {
          return message;
        }
        return null;
      };
      return check;
    },
    max: (length: number, message: string) => {
      thingsToDo.max = (v: string) => {
        if (v.length > length) {
          return message;
        }
        return null;
      };
      return check;
    },
    email: (message: string) => {
      thingsToDo.email = (v: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(v)) {
          return message;
        }
        return null;
      };
      return check;
    },
    eq: (value: string[], message: string) => {
      thingsToDo.eq = (v: string) => {
        if (!value.includes(v)) {
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
        optional: (v: any) => {
          return optional ? "true" : "false";
        },
      };
    },
  };

  return check;
}
