"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectBase = objectBase;
const index_1 = require("./index");
function objectBase(name) {
    let optional = false;
    const thingsToDo = {
        f: (v) => {
            if (typeof v !== "object" || v === null || Array.isArray(v)) {
                return name
                    ? `The field '${name}' must be an object!`
                    : "One of the required fields must be an object!";
            }
            return null;
        },
    };
    const check = {
        value: (vb) => {
            const nextThingsToDo = {};
            for (const [key, value] of Object.entries(vb)) {
                const checkers = value.validate();
                nextThingsToDo[key] = { ...checkers };
            }
            thingsToDo.value = (v) => {
                const error = (0, index_1.errorChecker)(v, { general: vb });
                return error.general || null;
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
