"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorChecker = void 0;
const errorChecker = (
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
obj, err) => {
    const errors = {};
    for (const [key, value] of Object.entries(err)) {
        for (const [field, validator] of Object.entries(value)) {
            const validatorInstance = validator;
            const fieldValue = obj[field];
            if (validatorInstance) {
                const checkers = validatorInstance.validate();
                if (checkers?.optional && checkers.optional(fieldValue) === "false") {
                    if (!fieldValue && fieldValue !== 0) {
                        errors[key] = `Key ${field} is missing!`;
                    }
                    if (fieldValue) {
                        if (checkers?.f?.(fieldValue)) {
                            const result = checkers?.f?.(fieldValue);
                            if (typeof result === "string") {
                                errors[key] = result;
                            }
                        }
                        if (!checkers?.f?.(fieldValue)) {
                            for (const check of Object.values(checkers)) {
                                if (check) {
                                    const checkerResult = check(fieldValue);
                                    if (checkerResult &&
                                        checkerResult !== "false" &&
                                        typeof checkerResult === "string") {
                                        errors[key] = checkerResult;
                                    }
                                }
                            }
                        }
                    }
                }
                if (checkers?.optional && checkers.optional(fieldValue) === "true") {
                    if (fieldValue) {
                        if (checkers?.f?.(fieldValue)) {
                            const result = checkers?.f?.(fieldValue);
                            if (typeof result === "string") {
                                errors[key] = result;
                            }
                        }
                        if (!checkers?.f?.(fieldValue)) {
                            for (const check of Object.values(checkers)) {
                                if (check) {
                                    const checkerResult = check(fieldValue);
                                    if (checkerResult &&
                                        checkerResult !== "false" &&
                                        typeof checkerResult === "string" &&
                                        checkerResult !== "true") {
                                        errors[key] = checkerResult;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return errors;
};
exports.errorChecker = errorChecker;
