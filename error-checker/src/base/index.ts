import type { EFunctionsInputs, ValidationResult } from "./base";

type ValidatorInput = EFunctionsInputs;

type ErrorCheckerOptions = {
  customMissingMessage?: `${string} [field] ${string}`;
};

export const errorChecker = (
  obj: Record<string, unknown>,
  err: ValidatorInput,
  options?: ErrorCheckerOptions
): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Get all declared fields from validators
  const declaredFields = new Set<string>();
  for (const value of Object.values(err)) {
    for (const field of Object.keys(value)) {
      declaredFields.add(field);
    }
  }

  // Check for additional undeclared fields
  const additionalFields = Object.keys(obj).filter(field => !declaredFields.has(field));
  if (additionalFields.length > 0) {
    errors.general = `Found undeclared fields: ${additionalFields.join(", ")}. Only declared fields are allowed.`;
    return errors;
  }

  for (const [key, value] of Object.entries(err)) {
    for (const [field, validator] of Object.entries(value)) {
      const validatorInstance = validator;
      const fieldValue = obj[field];

      if (validatorInstance) {
        const checkers = validatorInstance.validate();
        const isOptional = checkers?.optional?.(fieldValue) === "true";

        // Handle required fields that are missing
        if (!isOptional && (fieldValue === undefined || fieldValue === null)) {
          errors[key] = options?.customMissingMessage
            ? options.customMissingMessage.replace("[field]", field)
            : `Key ${field} is missing!`;
          continue;
        }

        // Skip validation for optional fields that are not provided
        if (isOptional && (fieldValue === undefined || fieldValue === null)) {
          continue;
        }

        // Run base type validation
        if (checkers?.f) {
          const result = checkers.f(fieldValue);
          if (isValidationResult(result) && !result.isValid && result.message) {
            errors[key] = result.message;
            continue;
          }
        }

        // Run additional validations
        for (const [checkName, check] of Object.entries(checkers)) {
          if (checkName !== 'f' && checkName !== 'optional' && check) {
            const result = check(fieldValue);
            if (isValidationResult(result) && !result.isValid && result.message) {
              errors[key] = result.message;
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
