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
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const index_1 = require("../models/index");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { modelo } = _a, restFields = __rest(_a, ["modelo"]);
    const productoName = yield index_1.Producto.findOne({ modelo });
    if (productoName) {
        return res.status(400).json({
            msg: `El producto con modelo:${productoName.modelo}, ya esta registrado!`
        });
    }
    restFields.modelo = modelo;
    const product = new index_1.Producto(restFields);
    yield product.save();
    res.status(201).json(product);
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde, stock = true } = req.query;
    //la consulta por defecto devolvera los productos con stock disponible
    const query = { estado: true, stock };
    const [total, productos] = yield Promise.all([
        index_1.Producto.countDocuments(query),
        index_1.Producto.find(query).
            populate('categoria', [' _id', 'nombre'], { estado: true }).
            populate('promocion', ['_id', 'titulo', 'descuento'], { estado: true }).
            populate({ path: 'comentarios', select: 'comentario' }).
            skip(Number(desde)).
            limit(Number(limite))
    ]);
    res.json({
        total,
        productos
    });
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield index_1.Producto.findById(id)
        .populate('categoria', [' _id', 'nombre'], { estado: true })
        .populate('promocion', ['_id', 'titulo', 'descuento'], { estado: true })
        .populate({ path: 'comentarios', select: 'comentario' });
    res.json(product);
});
exports.getProductById = getProductById;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield index_1.Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(product);
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { _id, estado } = _b, rest = __rest(_b, ["_id", "estado"]);
    const product = yield index_1.Producto.findByIdAndUpdate(id, rest, { new: true });
    res.json(product);
});
exports.updateProduct = updateProduct;
//# sourceMappingURL=product.controller.js.map