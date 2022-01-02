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
const VentaSchema = new mongoose_1.Schema({
    codigo: {
        type: String
    },
    cliente: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    productos: [{
            producto: {
                type: mongoose_1.Types.ObjectId,
                ref: 'Producto'
            },
            cantidad: { type: Number, required: true },
            precio: Number
        }],
    direccion: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Direccion',
        required: [true, 'La direccion es obligatoria']
    },
    Metodo: {
        type: String,
        enum: ['Tarjeta', 'efectivo']
    },
    NTransaccion: {
        type: String //numero de transaccion -- en caso de realizar pago electronico
    },
    tracking: {
        type: String,
        enum: ['En espera', 'En camino', 'Entregado'] //tracking = estado del envio
    },
    Subtotal: {
        type: Number,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
});
VentaSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, estado } = _a, data = __rest(_a, ["__v", "estado"]);
    return data;
};
exports.default = (0, mongoose_1.model)("Venta", VentaSchema);
//# sourceMappingURL=venta.js.map