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
exports.validateDepartment = exports.validateCollections = exports.existsPromocion = exports.existsProduct = exports.existsCategoryId = exports.existsId = exports.existsEmail = exports.isRoleValid = void 0;
const index_1 = require("../models/index");
//verificar si el rol es valido 
const isRoleValid = (rol) => __awaiter(void 0, void 0, void 0, function* () {
    const existRole = yield index_1.Rol.findOne({ rol });
    console.log(existRole);
    if (!existRole) {
        throw new Error(`El rol ${rol} no existe en la BD`);
    }
});
exports.isRoleValid = isRoleValid;
//Verificar si el correo existe
const existsEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailfound = yield index_1.Usuario.findOne({ email });
    if (emailfound) {
        throw new Error(`El correo ya esta registrado`);
    }
});
exports.existsEmail = existsEmail;
//Verificar si el id del usuario existe
const existsId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const idFound = yield index_1.Usuario.findById(id);
    if (!idFound) {
        throw new Error(`El id ${id} no existe`);
    }
});
exports.existsId = existsId;
const existsCategoryId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const idfound = yield index_1.Categoria.findById(id);
    if (!idfound) {
        throw new Error(`El id: ${id} no existe`);
    }
});
exports.existsCategoryId = existsCategoryId;
const existsProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const idFound = yield index_1.Producto.findById(id);
    if (!idFound.estado) {
        throw new Error(`id no encontrado -state: false`);
    }
    if (!idFound) {
        throw new Error(`el producto con id: ${id}, no existe.`);
    }
});
exports.existsProduct = existsProduct;
const existsPromocion = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const idFound = yield index_1.Promocion.findById(id);
    if (!idFound.estado) {
        throw new Error(`id no encontrado.`);
    }
    if (!idFound) {
        throw new Error(`La promocion con id: ${id}, no existe.`);
    }
});
exports.existsPromocion = existsPromocion;
/**
 * validar colecciones
 * @param {la coleccion de la imagen } collection
 * @param {las colecciones permitidas} colecctions
 */
const validateCollections = (collection = '', collections) => {
    const include = collections.includes(collection);
    if (!include) {
        throw new Error(`La coleccion ${collection} no es permitida`);
    }
    return true;
};
exports.validateCollections = validateCollections;
//Validar departamento.
const validateDepartment = (department, validDepartments) => {
    if (!validDepartments.includes(department)) {
        throw new Error(`No hay envio al departamento de: ${department}`);
    }
    return true;
};
exports.validateDepartment = validateDepartment;
//# sourceMappingURL=db-validator.js.map