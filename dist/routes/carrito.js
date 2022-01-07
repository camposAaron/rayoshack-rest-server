"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const cesta_controller_1 = require("../controller/cesta.controller");
const router = (0, express_1.Router)();
router.post('/', [
    middlewares_1.validarJWT,
    middlewares_1.validarRol.haveRole('USER_ROLE'),
    (0, express_validator_1.check)('producto', 'El producto es requerido').not().isEmpty(),
    (0, express_validator_1.check)('producto', 'debe ser un mongo id').isMongoId(),
    (0, express_validator_1.check)('cantidad', 'La cantidad es requerida').not().isEmpty(),
    (0, express_validator_1.check)('cantidad', 'debe ser un numero').isNumeric(),
    middlewares_1.generarCesta,
    middlewares_1.validarCampos
], cesta_controller_1.putProductoCesta);
router.get('/', [
    middlewares_1.validarJWT,
    middlewares_1.validarRol.haveRole('USER_ROLE'),
    middlewares_1.validarCampos
], cesta_controller_1.getCarrito);
router.delete('/', [
    middlewares_1.validarJWT,
    middlewares_1.validarRol.haveRole('USER_ROLE'),
    (0, express_validator_1.check)('productoEnCesta', 'El producto es requerido').not().isEmpty(),
    (0, express_validator_1.check)('productoEnCesta', 'debe ser un mongo id').isMongoId(),
    middlewares_1.validarCampos
], cesta_controller_1.deleteProductoCesta);
exports.default = router;
//# sourceMappingURL=carrito.js.map