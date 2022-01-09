import { Router } from 'express';
import { validarCampos, validarCargaArchivo } from '../middlewares';
import { dbValidator } from '../helpers';
import { check } from 'express-validator';
import { uploadImg, updateImg, getImage, CloudinaryUpdateImg } from '../controller/upload.controller';


const router = Router();

router.post('/', validarCargaArchivo , uploadImg);

router.put('/:collection/:id', [
    validarCargaArchivo,
    check('id','el id debe ser de mongo').isMongoId(),
    check('collection').custom( c => dbValidator.validateCollections(c, ['users', 'products']) ),
    validarCampos
], CloudinaryUpdateImg);

router.get('/:collection/:id', [
    check('id','el id debe ser de mongo').isMongoId(),
    check('collection').custom( c => dbValidator.validateCollections(c, ['users', 'products']) ),
    validarCampos
], getImage);

export default router;