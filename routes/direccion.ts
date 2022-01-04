import { Router } from 'express';
import { check  } from 'express-validator';

import {
    validarCampos,
    validarJWT,
    validarRol
} from '../middlewares';

import {
    dbValidator
} from '../helpers';

import{
  createAdress
} from '../controller/adress.controller';

const router = Router();

router.put('/',[
    validarJWT,
    validarRol.haveRole('USER_ROLE'),
    check('departamento','El departamento es un campo obligatorio').not().isEmpty(),
    check('departamento').custom( d => dbValidator.validateDepartment(d, ['managua','masaya','leon','granada'])),
    check('direccion', 'El departamento es un campo obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es un campo obligatorio').not().isEmpty(),
    check('telefono', 'El telefono debe ser de 8 caracteres').isLength({ min: 9, max:9}),
    validarCampos
], createAdress);

export default router;