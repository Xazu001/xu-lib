import type { BaseOfFunction, ThingsToDo, ValidationResult, TypeGuard } from "./base";
import { createValidationResult, typeCheck } from "./base";

export type NumberCheckers = {
  min: (value: number, message: string) => NumberCheckers;
  max: (value: number, message: string) => NumberCheckers;
  int: (message: string) => NumberCheckers;
  optional: () => NumberCheckers;
} & BaseOfFunction<number>;

const isNumber: TypeGuard<number> = (value: unknown): value is number => {
  return typeof value === "number" && !Number.isNaN(value);
};

export function numberBase(name?: string): NumberCheckers {
  let optional = false;

  const thingsToDo: ThingsToDo<number> = {
    f: (v: unknown) => {
      return typeCheck(
        v,
        isNumber,
        name
          ? `The field '${name}' must be a number!`
          : "One of the required fields must be a number!"
      );
    },
  };

  const check: NumberCheckers = {
    min: (value: number, message: string) => {
      thingsToDo.min = (v: unknown) => {
        const numberCheck = typeCheck(v, isNumber, "Value must be a number");
        if (!numberCheck.isValid) {
          return numberCheck;
        }

        const num = v as number;
        if (num < value) {
          return createValidationResult(false, message);
        }
        return createValidationResult(true);
      };

      return check;
    },

    max: (value: number, message: string) => {
      thingsToDo.max = (v: unknown) => {
        const numberCheck = typeCheck(v, isNumber, "Value must be a number");
        if (!numberCheck.isValid) {
          return numberCheck;
        }

        const num = v as number;
        if (num > value) {
          return createValidationResult(false, message);
        }
        return createValidationResult(true);
      };

      return check;
    },

    int: (message: string) => {
      thingsToDo.int = (v: unknown) => {
        const numberCheck = typeCheck(v, isNumber, "Value must be a number");
        if (!numberCheck.isValid) {
          return numberCheck;
        }

        const num = v as number;
        if (!Number.isInteger(num)) {
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
