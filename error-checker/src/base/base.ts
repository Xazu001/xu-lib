import type { StringCheckers as StringFunction } from "./string";
import type { NumberCheckers as NumberFunction } from "./number";
import type { ObjectCheckers as ObjectFunction } from "./object";
import type { AnyCheckers as AnyFunction } from "./any";
import type { ArrayCheckers as ArrayFunction } from "./array";

export interface BaseOfFunction {
  validate: () => ThingsToDo;
}

export type BaseThingToDoResult = string | null | "true" | "false"; // wynik checkera / thingToDo

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ThingToDo = (v: any) => BaseThingToDoResult;

export type ThingsToDo = Record<string, ThingToDo>;

export type TypesFunction =
  | StringFunction
  | NumberFunction
  | ObjectFunction
  | AnyFunction
  | ArrayFunction;

export type EFunctionsInputs = Record<string, Record<string, TypesFunction>>;
