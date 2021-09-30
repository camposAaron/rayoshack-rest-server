const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    isAdminRole,
    haveRole
} = require('../middlewares');

const {
    postDetalleCarrito,
    updateDetalleCarrito,
    deleteDetalleCarrito
} = require('../controller/trolley.controller');

const router = Router();

router.post('/', postDetalleCarrito)

module.exports = router;
