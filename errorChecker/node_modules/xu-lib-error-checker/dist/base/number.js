"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberBase = numberBase;
function numberBase(name) {
    let optional = false;
    const thingsToDo = {
        f: (v) => {
            if (typeof v !== "number") {
                return name
                    ? `The field '${name}' must be a number!`
                    : "One of the required fields must be a number!";
            }
            return null;
        },
    };
    const check = {
        min: (value, message) => {
            thingsToDo.min = (v) => {
                if (v < value) {
                    return message;
                }
                return null;
            };
            return check;
        },
        max: (value, message) => {
            thingsToDo.max = (v) => {
                if (v > value) {
                    return message;
                }
                return null;
            };
            return check;
        },
        int: (message) => {
            thingsToDo.int = (v) => {
                if (v !== Math.floor(v)) {
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
