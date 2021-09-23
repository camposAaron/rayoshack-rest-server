const { Router, response } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    haveRole
} = require('../middlewares/index');

const { existsInInventory, existsIdInvetory} = require('../helpers');

const {
    createStocktaking,
    deleteStocktaking,
    getStockProduct,
    getStocktaking,
    updateStocktaking
} = require('../controller/inventory.controller');

const router = Router();
/*
    {{URL}}/api/inventario
*/

// Obtener todo el inventario - privado
router.get('/', [
    validarJWT,
    haveRole('ADMIN_ROLE'),
    validarCampos
], getStocktaking);

// // obtener inventario de producto por id --private role: ADMIN_ROLE  token valido
router.get('/:productId', [
    validarJWT,
    haveRole('ADMIN_ROLE'),
    check('productId', 'debe contener un id').not().isEmpty(),
    check('productId', 'El id no es valido').isMongoId(),
    validarCampos
],   getStockProduct);

// crear un inventario de x producto - private -solo administrador con token valido
router.post('/', [
    validarJWT,
    haveRole('ADMIN_ROLE'),
    check('producto', 'debe contener un producto').not().isEmpty(),
    check('producto', 'debe ser un id de mongo').isMongoId(),
    check('producto').custom(existsInInventory), 
    check('cantidad', 'formato debe ser numerico').isNumeric(),
    validarCampos
], createStocktaking);

// Actualizar inventario - private -admin con token valido
router.put('/:id', [
    validarJWT,
    haveRole('ADMIN_ROLE'),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( existsIdInvetory ),
    check('producto').not().isEmpty(),
    check('producto', 'debe ser un id de mongo').isMongoId(),
    check('cantidad', 'formato debe ser numerico').isNumeric(),
    validarCampos
],
    updateStocktaking);

// //Borrar una categoria -Admin
    router.delete('/:id', [
        validarJWT,
        haveRole('ADMIN_ROLE'),
        check('id', 'el id no es valido').isMongoId(),
        check('id').custom( existsIdInvetory ),
        validarCampos
    ],
        deleteStocktaking);

module.exports = router;

