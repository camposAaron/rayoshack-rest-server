"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const helpers_1 = require("../helpers");
const users_controller_1 = require("../controller/users.controller");
const router = (0, express_1.Router)();
//privado solo administrador.
router.get('/', [middlewares_1.validarJWT, middlewares_1.validarRol.haveRole('ADMIN_ROLE'), middlewares_1.validarCampos], users_controller_1.getUsers);
//privado solo usuario propietario 
router.put('/:id', [
    middlewares_1.validarJWT,
    middlewares_1.validarRol.haveRole('ADMIN_ROLE', 'USER_ROLE'),
    (0, express_validator_1.check)('id', 'El id no es valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.dbValidator.existsId),
    (0, express_validator_1.check)('nombre').not().isEmpty().optional(),
    (0, express_validator_1.check)('password').not().isEmpty().optional(),
    (0, express_validator_1.check)('password', 'La contraseña debe tener al menos 5 caracteres').isLength({ min: 6 }).optional(),
    (0, express_validator_1.check)('direccion').not().isEmpty().optional(),
    (0, express_validator_1.check)('direccion', 'La direccion debe ser de mongo').isMongoId().optional(),
    middlewares_1.validarCampos
], users_controller_1.putUsers);
//publico
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña debe contener al menos 5 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'El correo es requerido').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El correo no es valido').isEmail(),
    (0, express_validator_1.check)('email').custom(helpers_1.dbValidator.existsEmail),
    (0, express_validator_1.check)('rol', 'El rol es requerido').not().isEmpty(),
    (0, express_validator_1.check)('rol', 'No es un rol valido').isIn(['USER_ROLE', 'ADMIN_ROLE']),
    // check('rol').custom( dbValidator.isRoleValid),
    middlewares_1.validarCampos
], users_controller_1.postUsers);
//privado SOLO: usuario propietario --administrador.
router.delete('/:id', [
    middlewares_1.validarJWT,
    middlewares_1.validarRol.haveRole('ADMIN_ROLE', 'USER_ROLE'),
    (0, express_validator_1.check)('id', 'El id no es valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.dbValidator.existsId),
    middlewares_1.validarCampos
], users_controller_1.deleteUsers);
exports.default = router;
//# sourceMappingURL=usuario.js.map