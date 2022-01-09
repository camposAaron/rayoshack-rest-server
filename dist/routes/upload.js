"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const helpers_1 = require("../helpers");
const express_validator_1 = require("express-validator");
const upload_controller_1 = require("../controller/upload.controller");
const router = (0, express_1.Router)();
router.post('/', middlewares_1.validarCargaArchivo, upload_controller_1.uploadImg);
router.put('/:collection/:id', [
    middlewares_1.validarCargaArchivo,
    (0, express_validator_1.check)('id', 'el id debe ser de mongo').isMongoId(),
    (0, express_validator_1.check)('collection').custom(c => helpers_1.dbValidator.validateCollections(c, ['users', 'products'])),
    middlewares_1.validarCampos
], upload_controller_1.CloudinaryUpdateImg);
router.get('/:collection/:id', [
    (0, express_validator_1.check)('id', 'el id debe ser de mongo').isMongoId(),
    (0, express_validator_1.check)('collection').custom(c => helpers_1.dbValidator.validateCollections(c, ['users', 'products'])),
    middlewares_1.validarCampos
], upload_controller_1.getImage);
exports.default = router;
//# sourceMappingURL=upload.js.map