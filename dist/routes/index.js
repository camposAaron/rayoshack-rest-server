"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promocionRouter = exports.userRouter = exports.direccionRouter = exports.categoriaRouter = exports.authRouter = void 0;
const auth_1 = __importDefault(require("./auth"));
exports.authRouter = auth_1.default;
const categoria_1 = __importDefault(require("./categoria"));
exports.categoriaRouter = categoria_1.default;
const direccion_1 = __importDefault(require("./direccion"));
exports.direccionRouter = direccion_1.default;
const usuario_1 = __importDefault(require("./usuario"));
exports.userRouter = usuario_1.default;
const promocion_1 = __importDefault(require("./promocion"));
exports.promocionRouter = promocion_1.default;
//# sourceMappingURL=index.js.map