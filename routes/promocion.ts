import { check  }  from 'express-validator';
import { Router }  from 'express';

import {
    validarJWT,
    validarRol,
    validarCampos,
    validarFecha
} from '../middlewares';

import {
    createPromotion,
    getPromotions,
    getPromotionId,
    updatePromotion,
    deletePromotion
} from '../controller/promotion.controller';

import {
    dbValidator
} from '../helpers';

const router = Router();

router.post('/', [
    validarJWT,
    validarRol.haveRole('ADMIN_ROLE'),
    check('titulo').not().isEmpty(),
    check('descuento','El campo descuento es numerico').isNumeric(),
    check('fechaInicio').isDate({format: 'YYYY-MM-DD', delimiters :['/','-']}),
    check('fechaFinal').isDate({format: 'YYYY-MM-DD', delimiters :['/','-']}),
    validarFecha,
    validarCampos
], createPromotion);
 

router.get('/', getPromotions);

router.get('/:id', [
    check('id', 'el id no es valido').isMongoId(),
    check('id').custom( dbValidator.existsPromocion ),
    validarCampos
], getPromotionId);

router.delete('/:id', [
    validarJWT,
    validarRol.haveRole('ADMIN_ROLE'),
    check('id').isMongoId(),
    check('id').custom(dbValidator.existsPromocion),
    validarCampos
],
    deletePromotion);

router.put('/:id',[
    validarJWT,
    validarRol.haveRole('ADMIN_ROLE'),
    check('id').isMongoId(),
    check('id').custom(dbValidator.existsPromocion),
    check('titulo').not().isEmpty().optional(),
    check('descuento','El campo descuento es numerico').isNumeric().optional(),
    check('fechaInicio').isDate({format: 'YYYY-MM-DD', delimiters :['/','-']}),
    check('fechaFinal').isDate({format: 'YYYY-MM-DD', delimiters :['/','-']}),
    validarFecha,
    validarCampos
],updatePromotion);

export default router;

