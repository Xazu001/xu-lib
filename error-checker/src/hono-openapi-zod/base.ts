import type { ZodTypeAny } from "zod";
import type { ThingsToDo } from "../../src/base/base";

export interface BaseOfFunction {
  validate: () => ThingsToDo;
  getType: () => ZodTypeAny;
}
