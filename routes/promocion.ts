const { check } = require('express-validator');
const {Router} = require('express');

const {
    validarJWT,
    haveRole,
    validarCampos,
    validarFecha
} = require('../middlewares');

const {
    createPromotion,
    getPromotions,
    getPromotionId,
    updatePromotion,
    deletePromotion
} = require('../controller/promotion.controller')

const {
    existsPromocion
} = require('../helpers');

const router = Router();

router.post('/', [
    validarJWT,
    haveRole('ADMIN_ROLE'),
    check('fechaInicio').isDate({format: 'YYYY-MM-DD', delimiters :['/','-']}),
    check('fechaFinal').isDate({format: 'YYYY-MM-DD', delimiters :['/','-']}),
    validarFecha,
    validarCampos
], createPromotion);
 

router.get('/', getPromotions);

router.get('/:id', [
    check('id', 'el id no es valido').isMongoId(),
    check('id').custom( existsPromocion ),
    validarCampos
], getPromotionId);

router.delete('/:id', [
    validarJWT,
    haveRole('ADMIN_ROLE'),
    check('id').isMongoId(),
    check('id').custom(existsPromocion),
    validarCampos
],
    deletePromotion);

router.put('/:id',[
    validarJWT,
    haveRole('ADMIN_ROLE'),
    check('id').isMongoId(),
    check('id').custom(existsPromocion),
    check('fechaInicio').isDate({format: 'YYYY-MM-DD', delimiters :['/','-']}),
    check('fechaFinal').isDate({format: 'YYYY-MM-DD', delimiters :['/','-']}),
    validarFecha,
    validarCampos
],updatePromotion);



module.exports = router;

