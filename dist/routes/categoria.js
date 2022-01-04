"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const helpers_1 = require("../helpers");
const category_controller_1 = require("../controller/category.controller");
const router = (0, express_1.Router)();
/*
    {{URL}}/api/categoria
*/
// Obtener todas las categorias - publico
router.get('/', category_controller_1.getCategories);
// Obtener una categoria - publico
router.get('/:id', [
    (0, express_validator_1.check)('id', 'El id no es valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.dbValidator.existsCategoryId),
    middlewares_1.validarCampos
], category_controller_1.getCategory);
// crear categoria - private -solo administrador con token valido
router.post('/', [
    middlewares_1.validarJWT,
    middlewares_1.validarRol.isAdminRole,
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    middlewares_1.validarCampos
], category_controller_1.createCategory);
// Actualizar una categoria - private -admin con token valido
router.put('/:id', [
    middlewares_1.validarJWT,
    middlewares_1.validarRol.isAdminRole,
    (0, express_validator_1.check)('nombre').not().isEmpty(),
    (0, express_validator_1.check)('id', 'El id no es valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.dbValidator.existsCategoryId),
    middlewares_1.validarCampos
], category_controller_1.updateCategory);
//Borrar una categoria -Admin
router.delete('/:id', [
    middlewares_1.validarJWT,
    middlewares_1.validarRol.isAdminRole,
    (0, express_validator_1.check)('id', 'el id no es valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.dbValidator.existsCategoryId),
    middlewares_1.validarCampos
], category_controller_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categoria.js.map