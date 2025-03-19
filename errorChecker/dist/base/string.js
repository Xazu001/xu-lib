"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringBase = stringBase;
function stringBase(name) {
    let optional = false;
    const thingsToDo = {
        f: (v) => {
            if (typeof v !== "string") {
                return name
                    ? `The field '${name}' has an invalid type or value!`
                    : "One of the required fields has an invalid type or value!";
            }
            return null;
        },
    };
    const check = {
        min: (length, message) => {
            thingsToDo.min = (v) => {
                if (v.length < length) {
                    return message;
                }
                return null;
            };
            return check;
        },
        max: (length, message) => {
            thingsToDo.max = (v) => {
                if (v.length > length) {
                    return message;
                }
                return null;
            };
            return check;
        },
        email: (message) => {
            thingsToDo.email = (v) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(v)) {
                    return message;
                }
                return null;
            };
            return check;
        },
        eq: (value, message) => {
            thingsToDo.eq = (v) => {
                if (!value.includes(v)) {
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
                optional: (v) => {
                    return optional ? "true" : "false";
                },
            };
        },
    };
    return check;
}
