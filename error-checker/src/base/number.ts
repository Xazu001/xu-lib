import type { BaseOfFunction, ThingsToDo } from "./base";

export type NumberCheckers = {
  min: (value: number, message: string) => NumberCheckers;
  max: (value: number, message: string) => NumberCheckers;
  int: (message: string) => NumberCheckers;
  optional: () => NumberCheckers;
} & BaseOfFunction;

export function numberBase(name?: string): NumberCheckers {
  let optional = false;

  const thingsToDo: ThingsToDo = {
    f: (v: any) => {
      if (typeof v !== "number") {
        return name
          ? `The field '${name}' must be a number!`
          : "One of the required fields must be a number!";
      }
      return null;
    },
  };

  const check: NumberCheckers = {
    min: (value: number, message: string) => {
      thingsToDo.min = (v: number) => {
        if (v < value) {
          return message;
        }
        return null;
      };
      return check;
    },
    max: (value: number, message: string) => {
      thingsToDo.max = (v: number) => {
        if (v > value) {
          return message;
        }
        return null;
      };
      return check;
    },
    int: (message: string) => {
      thingsToDo.int = (v: number) => {
        if (v !== Math.floor(v)) {
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
