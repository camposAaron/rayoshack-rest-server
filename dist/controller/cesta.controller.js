"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.deleteProductoCesta = exports.getCarrito = exports.putProductoCesta = void 0;
const models_1 = require("../models");
const putProductoCesta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { producto, cantidad } = req.body;
    const myProducto = yield models_1.Producto.findById({ _id: producto }).populate('promocion');
    const userId = req.uid;
    const myCarrito = yield models_1.Carrito.findOne({ usuario: userId });
    let precio = myProducto.precio;
    let total = myCarrito.total || 0;
    let subTotal;
    let descuento;
    if (myProducto.promocion) {
        descuento = myProducto.promocion.descuento * precio;
        precio = precio - descuento;
    }
    subTotal = precio * cantidad;
    total += subTotal;
    const data = { producto, cantidad, descuento, precio, subTotal };
    const cesta = yield models_1.Carrito.findByIdAndUpdate({ _id: myCarrito._id }, {
        $push: { cesta: data },
        total
    });
    res.status(201).json({
        msg: `Producto agregado a la cesta!`
    });
});
exports.putProductoCesta = putProductoCesta;
const getCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = req.uid;
    const myCarrito = yield models_1.Carrito.findOne({ usuario: idUser })
        .populate('usuario', 'nombre')
        .populate({ path: 'cesta.producto', select: ['marca', 'modelo', 'portada', 'precio'] });
    res.json(myCarrito);
});
exports.getCarrito = getCarrito;
const deleteProductoCesta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productoEnCesta } = req.body;
    const userId = req.uid;
    try {
        const myCarrito = yield models_1.Carrito.findOneAndUpdate({ usuario: userId }, {
            $pull: { cesta: { _id: productoEnCesta } }
        });
        const producto = myCarrito.cesta.id(productoEnCesta);
        myCarrito.total -= producto.subTotal;
        yield myCarrito.save();
        res.json({
            msg: `El producto ha sido eliminado de la cesta!`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `El producto a borrar no existe`
        });
    }
});
exports.deleteProductoCesta = deleteProductoCesta;
const updateDetalleCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = __rest(req.body, []);
    res.json({
        data
    });
});
//# sourceMappingURL=cesta.controller.js.map