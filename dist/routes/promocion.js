"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const promotion_controller_1 = require("../controller/promotion.controller");
const helpers_1 = require("../helpers");
const router = (0, express_1.Router)();
router.post('/', [
    middlewares_1.validarJWT,
    middlewares_1.validarRol.haveRole('ADMIN_ROLE'),
    (0, express_validator_1.check)('titulo').not().isEmpty(),
    (0, express_validator_1.check)('descuento', 'El campo descuento es numerico').isNumeric(),
    (0, express_validator_1.check)('fechaInicio').isDate({ format: 'YYYY-MM-DD', delimiters: ['/', '-'] }),
    (0, express_validator_1.check)('fechaFinal').isDate({ format: 'YYYY-MM-DD', delimiters: ['/', '-'] }),
    middlewares_1.validarFecha,
    middlewares_1.validarCampos
], promotion_controller_1.createPromotion);
router.get('/', promotion_controller_1.getPromotions);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'el id no es valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.dbValidator.existsPromocion),
    middlewares_1.validarCampos
], promotion_controller_1.getPromotionId);
router.delete('/:id', [
    middlewares_1.validarJWT,
    middlewares_1.validarRol.haveRole('ADMIN_ROLE'),
    (0, express_validator_1.check)('id').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.dbValidator.existsPromocion),
    middlewares_1.validarCampos
], promotion_controller_1.deletePromotion);
router.put('/:id', [
    middlewares_1.validarJWT,
    middlewares_1.validarRol.haveRole('ADMIN_ROLE'),
    (0, express_validator_1.check)('id').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.dbValidator.existsPromocion),
    (0, express_validator_1.check)('titulo').not().isEmpty().optional(),
    (0, express_validator_1.check)('descuento', 'El campo descuento es numerico').isNumeric().optional(),
    (0, express_validator_1.check)('fechaInicio').isDate({ format: 'YYYY-MM-DD', delimiters: ['/', '-'] }),
    (0, express_validator_1.check)('fechaFinal').isDate({ format: 'YYYY-MM-DD', delimiters: ['/', '-'] }),
    middlewares_1.validarFecha,
    middlewares_1.validarCampos
], promotion_controller_1.updatePromotion);
exports.default = router;
//# sourceMappingURL=promocion.js.map