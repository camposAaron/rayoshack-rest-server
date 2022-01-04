"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const helpers_1 = require("../helpers");
const adress_controller_1 = require("../controller/adress.controller");
const router = (0, express_1.Router)();
router.put('/', [
    middlewares_1.validarJWT,
    middlewares_1.validarRol.haveRole('USER_ROLE'),
    (0, express_validator_1.check)('departamento', 'El departamento es un campo obligatorio').not().isEmpty().optional(),
    (0, express_validator_1.check)('departamento').custom(d => helpers_1.dbValidator.validateDepartment(d, ['Managua', 'Masaya', 'Leon', 'Granada'])),
    (0, express_validator_1.check)('direccion', 'La direccion es un campo obligatorio').not().isEmpty().optional(),
    (0, express_validator_1.check)('telefono', 'El telefono es un campo obligatorio').not().isEmpty().optional(),
    (0, express_validator_1.check)('telefono', 'El telefono debe ser de 8 caracteres').isLength({ min: 8, max: 8 }),
    middlewares_1.validarCampos
], adress_controller_1.createAdress);
exports.default = router;
//# sourceMappingURL=direccion.js.map