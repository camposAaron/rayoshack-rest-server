import { check } from 'express-validator';
import { Router } from "express";

import { validarRol, validarJWT, validarCampos } from "../middlewares";
import { dbValidator } from "../helpers";

import {getInventarioByProductId } from '../controller/inventario.controller';

const router = Router();

router.get('/:id', [
    validarJWT,
    validarRol.haveRole('ADMIN_ROLE'),
    check('id').isMongoId(),
    check('id').custom(dbValidator.existsProduct),
    validarCampos
],  getInventarioByProductId)


export default router