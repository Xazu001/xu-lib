"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = exports.object = exports.number = exports.bool = exports.array = exports.any = exports.validator = void 0;
exports.resolver = resolver;
const z = __importStar(require("zod"));
const zod_1 = require("hono-openapi/zod");
const validator = (type, err) => {
    const validationSchema = {};
    for (const [key, value] of Object.entries(err)) {
        for (const [field, validator] of Object.entries(value)) {
            const validatorInstance = validator;
            if (validatorInstance?.getType()) {
                validationSchema[field] = validatorInstance.getType();
            }
        }
    }
    const zodMiddleware = (0, zod_1.validator)(type, z.object(validationSchema));
    return zodMiddleware;
};
exports.validator = validator;
function resolver(err) {
    const validationSchema = {};
    for (const [key, value] of Object.entries(err)) {
        validationSchema[key] = z.string().optional();
    }
    const schema = z.object(validationSchema);
    return (0, zod_1.resolver)(schema);
}
var any_1 = require("./any");
Object.defineProperty(exports, "any", { enumerable: true, get: function () { return any_1.any; } });
var array_1 = require("./array");
Object.defineProperty(exports, "array", { enumerable: true, get: function () { return array_1.array; } });
var bool_1 = require("./bool");
Object.defineProperty(exports, "bool", { enumerable: true, get: function () { return bool_1.bool; } });
var number_1 = require("./number");
Object.defineProperty(exports, "number", { enumerable: true, get: function () { return number_1.number; } });
var object_1 = require("./object");
Object.defineProperty(exports, "object", { enumerable: true, get: function () { return object_1.object; } });
var string_1 = require("./string");
Object.defineProperty(exports, "string", { enumerable: true, get: function () { return string_1.string; } });
