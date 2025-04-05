export type ValidationResult = {
  isValid: boolean;
  message: string | null;
};

export type TypeGuard<T> = (value: unknown) => value is T;

export type ValidationFunction<T = unknown> = (v: T) => ValidationResult;
export type OptionalFunction = (v: unknown) => "true" | "false";

export type ThingsToDo<T> = {
  f?: ValidationFunction<T>;
  optional?: OptionalFunction;
  [key: string]: ValidationFunction<T> | OptionalFunction | undefined;
};

export type BaseOfFunction<T> = {
  validate: () => ThingsToDo<T>;
};

export type BaseChecker<T = unknown> = BaseOfFunction<T>;

export type EFunctionsInputs = {
  [key: string]: {
    [key: string]: BaseChecker<any>;
  };
};

export function createValidationResult(
  isValid: boolean,
  message: string | null = null
): ValidationResult {
  return {
    isValid,
    message,
  };
}

export function typeCheck<T>(
  value: unknown,
  guard: TypeGuard<T>,
  errorMessage: string
): ValidationResult {
  if (guard(value)) {
    return createValidationResult(true);
  }
  return createValidationResult(false, errorMessage);
}
