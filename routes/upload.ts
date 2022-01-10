import { Router } from 'express';
import { validarCampos, validarCargaArchivo } from '../middlewares';
import { dbValidator } from '../helpers';
import { check } from 'express-validator';
import { uploadImg, updateImg, getImage } from '../controller/upload.controller';


const router = Router();

router.post('/:collection/:id', [
    validarCargaArchivo,
    check('id','el id debe ser de mongo').isMongoId(),
    check('collection').custom( c => dbValidator.validateCollections(c, ['usuarios', 'productos'])),
    validarCampos
] , uploadImg);

router.put('/:collection/:id', [
    validarCargaArchivo,
    check('id','el id debe ser de mongo').isMongoId(),
    check('collection').custom( c => dbValidator.validateCollections(c, ['usuarios', 'productos'])),
    validarCampos
], );



router.get('/:collection/:id', [
    check('id','el id debe ser de mongo').isMongoId(),
    check('collection').custom( c => dbValidator.validateCollections(c, ['users', 'products']) ),
    validarCampos
], getImage);

export default router;