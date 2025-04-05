import type { EFunctionsInputs, ValidationResult, ValidatorMap, ValidationFunction } from "./base";

type ValidatorInput = EFunctionsInputs;

export * from "./base";
export * from "./bool";
export * from "./number";
export * from "./string";
export * from "./array";
export * from "./object";

// Helper function to wrap validators in a 'general' object
export function forEvery<T extends object>(validators: {
  [key in keyof T]?: {
    validate: () => ValidatorMap;
  };
}): {
  general: {
    [key in keyof T]?: {
      validate: () => ValidatorMap;
    };
  };
} {
  return {
    general: validators
  };
}

export const errorChecker = (
  obj: Record<string, unknown>,
  err: ValidatorInput,
  options?: {
    customMissingMessage?: `${string} [field] ${string}`;
  }
): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Check for undeclared fields
  const declaredFields = new Set(Object.keys(err.general));
  const inputFields = new Set(Object.keys(obj));

  for (const field of inputFields) {
    if (!declaredFields.has(field)) {
      errors[field] = `Undeclared field: ${field}`;
    }
  }

  // Validate declared fields
  for (const [key, validator] of Object.entries(err.general)) {
    if (validator) {
      const validationResult = validator.validate();
      
      // Skip validation if field is optional and not present
      if ('optional' in validationResult && !(key in obj)) {
        continue;
      }

      // Validate field value
      for (const [validatorName, validatorFn] of Object.entries(validationResult)) {
        // Skip optional validator
        if (validatorName === 'optional') continue;

        // Only process validation functions
        if (typeof validatorFn === 'function') {
          const result = validatorFn(obj[key]) as ValidationResult;
          if (!result.isValid) {
            errors[key] = result.message;
            break;
          }
        }
      }
    }
  }

  return errors;
};

function isValidationResult(value: unknown): value is ValidationResult {
  return (
    typeof value === 'object' &&
    value !== null &&
    'isValid' in value &&
    typeof (value as ValidationResult).isValid === 'boolean' &&
    'message' in value &&
    (typeof (value as ValidationResult).message === 'string' ||
      (value as ValidationResult).message === null)
  );
}
