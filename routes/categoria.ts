import { Router } from 'express';
import { check } from 'express-validator';

import {
    validarCampos,
    validarJWT,
    validarRol
} from '../middlewares';

import { dbValidator } from '../helpers';

import {
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    createCategory
} from '../controller/category.controller';

const router = Router();

/*
    {{URL}}/api/categoria
*/

// Obtener todas las categorias - publico
router.get('/', getCategories);

// Obtener una categoria - publico
router.get('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(dbValidator.existsCategoryId),
    validarCampos
], getCategory);

// crear categoria - private -solo administrador con token valido
router.post('/', [
    validarJWT,
    validarRol.isAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createCategory);

// Actualizar una categoria - private -admin con token valido
router.put('/:id', [
    validarJWT,
    validarRol.isAdminRole,
    check('nombre').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(dbValidator.existsCategoryId),
    validarCampos
],
    updateCategory);

//Borrar una categoria -Admin
router.delete('/:id', [
    validarJWT,
    validarRol.isAdminRole,
    check('id','el id no es valido').isMongoId(),
    check('id').custom(dbValidator.existsCategoryId),
    validarCampos
],
    deleteCategory);

export default router;

