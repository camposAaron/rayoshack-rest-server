const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    isAdminRole,
    haveRole
} = require('../middlewares');

const {
    existsCategoryId,
    existsProduct
} = require('../helpers/db-validator');

const {
    createProduct, getProducts, getProductById, deleteProduct, updateProduct
} = require('../controller/product.controller')

const router = Router();

router.post('/', [
    validarJWT,
     check('marca').not().isEmpty(),
    check('modelo').not().isEmpty(),
    check('categoria','no es un id de mongo').isMongoId(),
    check('categoria').custom(existsCategoryId),
    validarCampos

], createProduct);  isAdminRole,
 

router.get('/', getProducts)

router.get('/:id', [
    check('id', 'el id no es valido').isMongoId(),
    check('id').custom(existsProduct),
    validarCampos
], getProductById);

router.delete('/:id', [
    validarJWT,
    haveRole('ADMIN_ROLE'),
    check('id').isMongoId(),
    check('id').custom(existsProduct),
    validarCampos
],
    deleteProduct);

router.put('/:id',[
    validarJWT,
    haveRole('ADMIN_ROLE'),
    check('id').isMongoId(),
    check('id').custom(existsProduct),
    validarCampos
],updateProduct);



module.exports = router;

