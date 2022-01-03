"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriaRouter = exports.userRouter = void 0;
const auth_1 = __importDefault(require("../routes/auth"));
exports.userRouter = auth_1.default;
const categoria_1 = __importDefault(require("../routes/categoria"));
exports.categoriaRouter = categoria_1.default;
//# sourceMappingURL=index.js.map