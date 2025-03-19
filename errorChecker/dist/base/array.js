"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayBase = arrayBase;
const index_1 = require("./index");
function arrayBase(name) {
    let optional = false;
    const thingsToDo = {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        f: (v) => {
            if (!Array.isArray(v)) {
                return name
                    ? `The field '${name}' must be an array!`
                    : "One of the required fields must be an array!";
            }
            return null;
        },
    };
    const check = {
        value: (vb) => {
            const itemThingsToDo = vb.validate();
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            thingsToDo.value = (v) => {
                let errorV = null;
                for (const item of v) {
                    const error = (0, index_1.errorChecker)({ item: item }, {
                        general: {
                            item: vb,
                        },
                    });
                    if (error.general) {
                        errorV = error.general;
                    }
                }
                return errorV;
            };
            return check;
        },
        minLength: (length, message) => {
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            thingsToDo.minLength = (v) => {
                if (v.length < length) {
                    return message;
                }
                return null;
            };
            return check;
        },
        maxLength: (length, message) => {
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            thingsToDo.maxLength = (v) => {
                if (v.length > length) {
                    return message;
                }
                return null;
            };
            return check;
        },
        optional: () => {
            optional = true;
            return check;
        },
        validate: () => {
            return {
                ...thingsToDo,
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                optional: (v) => {
                    return optional ? "true" : "false";
                },
            };
        },
    };
    return check;
}
