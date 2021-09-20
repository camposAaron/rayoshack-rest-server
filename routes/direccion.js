const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    haveRole
} = require('../middlewares/index');

const {
    validateDepartment
} = require('../helpers');

const {
  createAdress,
  getAdress
} = require('../controller/adress.controller');

const router = Router();

router.put('/',[
    validarJWT,
    haveRole('USER_ROLE'),
    check('departamento','El departamento es un campo obligatorio').not().isEmpty(),
    check('departamento').custom( d => validateDepartment(d, ['managua','masaya','leon','granada'])),
    check('direccion', 'El departamento es un campo obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es un campo obligatorio').not().isEmpty(),
    validarCampos
], createAdress);

module.exports = router;