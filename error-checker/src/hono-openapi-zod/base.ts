import type { ZodTypeAny } from "zod";
import type { ThingsToDo } from "../../src/base/base";

export interface BaseOfFunction<T = unknown> {
  validate: () => ThingsToDo<T>;
  getType: () => ZodTypeAny;
}
