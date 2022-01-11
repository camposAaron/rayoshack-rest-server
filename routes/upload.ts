import { Router } from 'express';
import { validarCampos, validarCargaArchivo } from '../middlewares';
import { dbValidator } from '../helpers';
import { check } from 'express-validator';
import { uploadImg, updateImg } from '../controller/upload.controller';


const router = Router();

router.put('/:collection/:id', [
    validarCargaArchivo,
    check('id','el id debe ser de mongo').isMongoId(),
    check('collection').custom( c => dbValidator.validateCollections(c, ['usuarios', 'productos'])),
    validarCampos
] , uploadImg);


export default router;