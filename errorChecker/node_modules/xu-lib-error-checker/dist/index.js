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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = exports.object = exports.number = exports.bool = exports.array = exports.any = void 0;
__exportStar(require("./base/index"), exports);
var any_1 = require("./base/any");
Object.defineProperty(exports, "any", { enumerable: true, get: function () { return any_1.anyBase; } });
var array_1 = require("./base/array");
Object.defineProperty(exports, "array", { enumerable: true, get: function () { return array_1.arrayBase; } });
var bool_1 = require("./base/bool");
Object.defineProperty(exports, "bool", { enumerable: true, get: function () { return bool_1.boolBase; } });
var number_1 = require("./base/number");
Object.defineProperty(exports, "number", { enumerable: true, get: function () { return number_1.numberBase; } });
var object_1 = require("./base/object");
Object.defineProperty(exports, "object", { enumerable: true, get: function () { return object_1.objectBase; } });
var string_1 = require("./base/string");
Object.defineProperty(exports, "string", { enumerable: true, get: function () { return string_1.stringBase; } });
