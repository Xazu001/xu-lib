"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anyBase = anyBase;
function anyBase(name) {
    let optional = false;
    const thingsToDo = {
        f: (v) => {
            if (v === undefined || v === null) {
                return name
                    ? `The field '${name}' must not be null or undefined!`
                    : "One of the required fields must not be null or undefined!";
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
