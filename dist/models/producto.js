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
const ProductSchema = new mongoose_1.Schema({
    marca: { type: String, required: true },
    modelo: {
        type: String,
        required: true,
        unique: true
    },
    precio: { type: Number, default: 0 },
    galeria: { type: [String] },
    portada: { type: String },
    descripcion: { type: String },
    detalles: { type: String },
    categoria: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    stock: { type: Boolean, default: false },
    promocion: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Promocion',
        required: false
    },
    comentarios: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'Comentario'
        }],
    calificacion: { Type: String },
    estado: {
        type: Boolean,
        required: true,
        default: true
    }
});
ProductSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, estado } = _a, data = __rest(_a, ["__v", "estado"]);
    return data;
};
exports.default = (0, mongoose_1.model)("Producto", ProductSchema);
//# sourceMappingURL=producto.js.map