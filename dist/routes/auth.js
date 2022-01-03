"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controller/auth.controller");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('email', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    middlewares_1.validarCampos
], auth_controller_1.login);
// router.post('/google',[
//     check('id_token','El id token es necesario').not().isEmpty(),
//     validarCampos
// ], googleSignin );
exports.default = router;
//# sourceMappingURL=auth.js.map