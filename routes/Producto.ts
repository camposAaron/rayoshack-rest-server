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

import {
    createProduct, getProducts, getProductById, deleteProduct, updateProduct
} from '../controller/product.controller';

const router = Router();

router.post('/', [
    validarJWT,
    validarRol.haveRole('ADMIN_ROLE'),
    check('marca','La marca es requerida').not().isEmpty(),
    check('modelo').not().isEmpty().optional(),
    check('precio','El precio es requerido').not().isEmpty(),
    check('precio','El precio debe ser numerico').isNumeric(),
    check('categoria','La categoria es requerida').not().isEmpty(),
    check('categoria','debe ser un mongo id').isMongoId(),
    check('categoria').custom(dbValidator.existsCategoryId),
    check('promocion','debe ser un mongo id').isMongoId().optional(),
    check('promocion').custom(dbValidator.existsPromocion).optional(),
    check('descuento','El descuento debe ser numerico').isNumeric().optional(),
    check('stock','debe ser de tipo BOOLEAN').isBoolean().optional(),
    check('cantidad','la cantidad debe ser un valor numerico').isNumeric(),
    check('cantidad','la cantidad es requerida').not().isEmpty(),
    validarCampos
], createProduct); 
 

router.get('/', getProducts)

router.get('/:id', [
    check('id', 'el id no es valido').isMongoId(),
    check('id').custom(dbValidator.existsProduct),
    validarCampos
], getProductById);

router.delete('/:id', [
    validarJWT,
    validarRol.haveRole('ADMIN_ROLE'),
    check('id').isMongoId(),
    check('id').custom(dbValidator.existsProduct),
    validarCampos
],
    deleteProduct);

router.put('/:id',[
    validarJWT,
    validarRol.haveRole('ADMIN_ROLE'),
    check('id').isMongoId(),
    check('id').custom(dbValidator.existsProduct),
    check('marca','La marca es requerida').not().isEmpty().optional(),
    check('modelo').not().isEmpty().optional(),
    check('precio','El precio es requerido').not().isEmpty().optional(),
    check('precio','El precio debe ser numerico').isNumeric().optional(),
    check('categoria','La categoria es requerida').not().isEmpty().optional(),
    check('categoria','debe ser un mongo id').isMongoId().optional(),
    check('categoria').custom(dbValidator.existsCategoryId).optional(),
    check('promocion','debe ser un mongo id').isMongoId().optional(),
    check('promocion').custom(dbValidator.existsPromocion).optional(),
    check('descuento','El descuento debe ser numerico').isNumeric().optional(),
    check('stock','debe ser de tipo BOOLEAN').isBoolean().optional(),  
    validarCampos
],updateProduct);

export default router;

