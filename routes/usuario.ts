import { Router } from 'express';
import { check } from 'express-validator';

import {
    validarCampos,
    validarJWT,
    validarRol
} from '../middlewares';

import { dbValidator } from '../helpers';

import { getUsers,
       putUsers, 
       postUsers, 
       deleteUsers, 
              } from '../controller/users.controller';

const router = Router();
//privado solo administrador.
router.get('/',[validarJWT, validarRol.haveRole('ADMIN_ROLE'),validarCampos],getUsers);

//privado solo usuario propietario 
router.put('/:id',[
    validarJWT,
    validarRol.haveRole('ADMIN_ROLE','USER_ROLE'),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( dbValidator.existsId ),
    check('nombre').not().isEmpty().optional(),
    check('password').not().isEmpty().optional(),
    check('password','La contraseña debe tener al menos 5 caracteres').isLength({min:6}).optional(),
    check('direccion').not().isEmpty().optional(),
    check('direccion','La direccion debe ser de mongo').isMongoId().optional(),
    validarCampos
], putUsers);

//publico
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe contener al menos 5 caracteres').isLength({ min: 6}),
    check('email','El correo es requerido').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom( dbValidator.existsEmail),
    check('role', 'El rol es requerido').not().isEmpty(),
    check('role', 'No es un rol valido').isIn(['USER_ROLE','ADMIN_ROLE']),
    // check('rol').custom( dbValidator.isRoleValid),
    validarCampos
], postUsers);

//privado SOLO: usuario propietario --administrador.
router.delete('/:id',[
    validarJWT,
    validarRol.haveRole('ADMIN_ROLE','USER_ROLE'),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(dbValidator.existsId),
    validarCampos
], deleteUsers);

export default router;

