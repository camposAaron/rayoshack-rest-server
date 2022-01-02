"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CarritoSchema = new mongoose_1.Schema({
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    cesta: [{
            producto: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Producto',
                required: true
            },
            cantidad: { type: Number, required: true, default: 1 },
            precio: Number
        }],
    total: {
        type: Number
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
});
CarritoSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, estado } = _a, data = __rest(_a, ["__v", "estado"]);
    return data;
};
exports.default = (0, mongoose_1.model)("Carrito", CarritoSchema);
//# sourceMappingURL=carrito.js.map