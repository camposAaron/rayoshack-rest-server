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
const index_1 = require("../models/index");
class dbValidator {
    constructor() {
        //verificar si el rol es valido
        this.isRoleValid = (rol) => __awaiter(this, void 0, void 0, function* () {
            const existRole = yield index_1.Rol.findOne({ rol });
            console.log(existRole);
            if (!existRole) {
                throw new Error(`El rol ${rol} no existe en la BD`);
            }
        });
        //Verificar si el correo existe
        this.existsEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const emailfound = yield index_1.Usuario.findOne({ email });
            if (emailfound) {
                throw new Error(`El correo ya esta registrado`);
            }
        });
        //Verificar si el id del usuario existe
        this.existsId = (id) => __awaiter(this, void 0, void 0, function* () {
            const idFound = yield index_1.Usuario.findById(id);
            if (!idFound) {
                throw new Error(`El id ${id} no existe`);
            }
        });
        this.existsCategoryId = (id) => __awaiter(this, void 0, void 0, function* () {
            const idfound = yield index_1.Categoria.findById(id);
            if (!idfound) {
                throw new Error(`El id: ${id} no existe`);
            }
        });
        this.existsProduct = (id) => __awaiter(this, void 0, void 0, function* () {
            const idFound = yield index_1.Producto.findById(id);
            if (!idFound.estado) {
                throw new Error(`id no encontrado -state: false`);
            }
            if (!idFound) {
                throw new Error(`el id: ${id} no existe`);
            }
        });
        this.existsPromocion = (id) => __awaiter(this, void 0, void 0, function* () {
            const idFound = yield index_1.Promocion.findById(id);
            if (!idFound.estado) {
                throw new Error(`id no encontrado -state: false`);
            }
            if (!idFound) {
                throw new Error(`el id: ${id} no existe`);
            }
        });
    }
}
exports.default = dbValidator;
// /**
//  * validar colecciones
//  * @param {la coleccion de la imagen } collection 
//  * @param {las colecciones permitidas} colecctions 
//  */
// const validateCollections = (collection = '', collections: [String]) => {
//     const include = collections.includes(collection);
//     if (!include) {
//         throw new Error(`La coleccion ${collection} no es permitida`);
//     }
//     return true
// }
// //Validar departamento.
// const validateDepartment = (department: String, validDepartments: String[]) => {
//     if (!validDepartments.includes(department)) {
//         throw new Error(`No hay envio al departamento de: ${department}`);
//     }
//     return true
// }
//# sourceMappingURL=db-validator.js.map