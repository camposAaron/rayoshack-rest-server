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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.getCategories = void 0;
const models_1 = require("../models");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('kakak00');
    const { limite = 5, desde } = req.query;
    const query = { estado: true };
    const [total, categorias] = yield Promise.all([
        models_1.Categoria.countDocuments(query),
        models_1.Categoria.find(query)
            .populate('user', 'name')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        categorias
    });
});
exports.getCategories = getCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield models_1.Categoria.findById({ _id: id });
    res.json({
        category
    });
});
exports.getCategory = getCategory;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.body.nombre.toUpperCase();
    const categoryDB = yield models_1.Categoria.findOne({ nombre });
    if (categoryDB) {
        return res.status(400).json({
            msg: `La categoria ${categoryDB.nombre} ya esta registrada!`
        });
    }
    //generar la data a guardar
    const data = {
        nombre
    };
    const category = new models_1.Categoria(data);
    //guardar en DB
    yield category.save();
    res.status(201).json(category);
});
exports.createCategory = createCategory;
//Actualizar Categoria  --ADMIN_ROLE autenticado
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let { estado, nombre } = req.body;
    nombre = nombre.toUpperCase();
    const category = yield models_1.Categoria.findByIdAndUpdate(id, { estado, nombre }, { new: true });
    res.json(category);
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield models_1.Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(category);
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.controller.js.map