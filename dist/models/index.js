"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoria_1 = __importDefault(require("./categoria"));
const rol_1 = __importDefault(require("./rol"));
const venta_1 = __importDefault(require("./venta"));
const producto_1 = __importDefault(require("./producto"));
const usuario_1 = __importDefault(require("./usuario"));
const direccion_1 = __importDefault(require("./direccion"));
const carrito_1 = __importDefault(require("./carrito"));
const promocion_1 = __importDefault(require("./promocion"));
const Comentario_1 = __importDefault(require("./Comentario"));
module.exports = {
    Categoria: categoria_1.default,
    Producto: producto_1.default,
    Usuario: usuario_1.default,
    Rol: rol_1.default,
    Direccion: direccion_1.default,
    Carrito: carrito_1.default,
    Venta: venta_1.default,
    Promocion: promocion_1.default,
    Comentario: Comentario_1.default
};
//# sourceMappingURL=index.js.map