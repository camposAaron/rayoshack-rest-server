"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const helpers_1 = require("../helpers");
const product_controller_1 = require("../controller/product.controller");
const router = (0, express_1.Router)();
router.post('/', [
    middlewares_1.validarJWT,
    middlewares_1.validarRol.haveRole('ADMIN_ROLE'),
    (0, express_validator_1.check)('marca', 'La marca es requerida').not().isEmpty(),
    (0, express_validator_1.check)('modelo').not().isEmpty().optional(),
    (0, express_validator_1.check)('precio', 'El precio es requerido').not().isEmpty(),
    (0, express_validator_1.check)('precio', 'El precio debe ser numerico').isNumeric(),
    (0, express_validator_1.check)('categoria', 'La categoria es requerida').not().isEmpty(),
    (0, express_validator_1.check)('categoria', 'debe ser un mongo id').isMongoId(),
    (0, express_validator_1.check)('categoria').custom(helpers_1.dbValidator.existsCategoryId),
    (0, express_validator_1.check)('promocion', 'debe ser un mongo id').isMongoId().optional(),
    (0, express_validator_1.check)('promocion').custom(helpers_1.dbValidator.existsPromocion).optional(),
    (0, express_validator_1.check)('stock', 'debe ser de tipo BOOLEAN').isBoolean().optional(),
    middlewares_1.validarCampos
], product_controller_1.createProduct);
router.get('/', product_controller_1.getProducts);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'el id no es valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.dbValidator.existsProduct),
    middlewares_1.validarCampos
], product_controller_1.getProductById);
router.delete('/:id', [
    middlewares_1.validarJWT,
    middlewares_1.validarRol.haveRole('ADMIN_ROLE'),
    (0, express_validator_1.check)('id').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.dbValidator.existsProduct),
    middlewares_1.validarCampos
], product_controller_1.deleteProduct);
router.put('/:id', [
    middlewares_1.validarJWT,
    middlewares_1.validarRol.haveRole('ADMIN_ROLE'),
    (0, express_validator_1.check)('id').isMongoId(),
    (0, express_validator_1.check)('id').custom(helpers_1.dbValidator.existsProduct),
    (0, express_validator_1.check)('marca', 'La marca es requerida').not().isEmpty().optional(),
    (0, express_validator_1.check)('modelo').not().isEmpty().optional(),
    (0, express_validator_1.check)('precio', 'El precio es requerido').not().isEmpty().optional(),
    (0, express_validator_1.check)('precio', 'El precio debe ser numerico').isNumeric().optional(),
    (0, express_validator_1.check)('categoria', 'La categoria es requerida').not().isEmpty().optional(),
    (0, express_validator_1.check)('categoria', 'debe ser un mongo id').isMongoId().optional(),
    (0, express_validator_1.check)('categoria').custom(helpers_1.dbValidator.existsCategoryId).optional(),
    (0, express_validator_1.check)('promocion', 'debe ser un mongo id').isMongoId().optional(),
    (0, express_validator_1.check)('promocion').custom(helpers_1.dbValidator.existsPromocion).optional(),
    (0, express_validator_1.check)('stock', 'debe ser de tipo BOOLEAN').isBoolean().optional(),
    middlewares_1.validarCampos
], product_controller_1.updateProduct);
exports.default = router;
//# sourceMappingURL=Producto.js.map