import type { EFunctionsInputs, ValidationResult, ValidatorMap } from "./base";

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
): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Process each validation group
  for (const [groupKey, validators] of Object.entries(err)) {
    // Skip if validators is undefined
    if (!validators) continue;

    // For each field in the validation group
    for (const [fieldKey, validator] of Object.entries(validators)) {
      if (validator) {
        const validationResult = validator.validate();

        // Skip validation if field is optional and not present
        if ('optional' in validationResult && !(fieldKey in obj)) {
          continue;
        }

        // Validate field value
        for (const [validatorName, validatorFn] of Object.entries(validationResult)) {
          // Skip optional validator
          if (validatorName === 'optional') continue;

          // Only process validation functions
          if (typeof validatorFn === 'function') {
            const result = validatorFn(obj[fieldKey]) as ValidationResult;
            if (!result.isValid) {
              errors[fieldKey] = result.message;
              break;
            }
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
