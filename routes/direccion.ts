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
    check('departamento','El departamento es un campo obligatorio').not().isEmpty().optional(),
    check('departamento').custom( d => dbValidator.validateDepartment(d, ['Managua','Masaya','Leon','Granada'])),
    check('direccion', 'La direccion es un campo obligatorio').not().isEmpty().optional(),
    check('telefono', 'El telefono es un campo obligatorio').not().isEmpty().optional(),
    check('telefono', 'El telefono debe ser de 8 caracteres').isLength({ min: 8, max:8}),
    validarCampos
], createAdress);

export default router;