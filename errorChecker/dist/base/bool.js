"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolBase = boolBase;
function boolBase(name) {
    let optional = false;
    const thingsToDo = {
        f: (v) => {
            if (typeof v !== "boolean") {
                return name
                    ? `The field '${name}' must be a boolean!`
                    : "One of the required fields must be a boolean!";
            }
            return null;
        },
    };
    const check = {
        optional: () => {
            optional = true;
            return check;
        },
        validate: () => {
            return {
                ...thingsToDo,
                optional: (v) => {
                    return optional ? "true" : "false";
                },
            };
        },
    };
    return check;
}
