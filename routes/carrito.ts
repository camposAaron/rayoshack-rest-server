import { Router } from 'express';
import { check } from 'express-validator';

import {
    generarCesta,
    validarCampos,
    validarJWT,
    validarRol,
    
} from '../middlewares';

import {
    putProductoCesta,getCarrito, deleteProductoCesta,
} from '../controller/cesta.controller';

const router = Router();

router.post('/',
    [
        validarJWT,
        validarRol.haveRole('USER_ROLE'),
        check('producto','El producto es requerido').not().isEmpty(),
        check('producto','debe ser un mongo id').isMongoId(),
        check('cantidad','La cantidad es requerida').not().isEmpty(),
        check('cantidad','debe ser un numero').isNumeric(),
        generarCesta,
        validarCampos
    ],
      putProductoCesta);

router.get('/',[
    validarJWT,
    validarRol.haveRole('USER_ROLE'),
    validarCampos
], getCarrito)

router.delete('/',[
    validarJWT,
    validarRol.haveRole('USER_ROLE'),
    check('productoEnCesta','El producto es requerido').not().isEmpty(),
    check('productoEnCesta','debe ser un mongo id').isMongoId(),
    validarCampos
], deleteProductoCesta);

export default router;
