export type ValidationResult = {
  isValid: boolean;
  message: string;
};

export type TypeGuard<T> = (value: unknown) => value is T;

export type ValidationFunction = (value: unknown) => ValidationResult;
export type OptionalFunction = () => "true";

export type ValidatorMap = {
  f: ValidationFunction;
  optional?: OptionalFunction;
};

export type BaseOfFunction<T> = {
  validate: () => ValidatorMap;
};

export type BaseChecker<T = unknown> = BaseOfFunction<T>;

export type EFunctionsInputs = Record<string, Record<string, BaseChecker>>;


export function createValidationResult(
  isValid: boolean,
  message: string = ""
): ValidationResult {
  return { isValid, message };
}

export function typeCheck<T>(
  value: unknown,
  guard: TypeGuard<T>,
  message: string
): ValidationResult {
  if (guard(value)) {
    return createValidationResult(true, "");
  }
  return createValidationResult(false, message);
}
