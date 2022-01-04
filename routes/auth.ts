import { Router }              from 'express';
import { validarCampos }       from '../middlewares';
import { check }               from 'express-validator';
import { login, googleSignin } from '../controller/auth.controller';

const router = Router();

router.post('/login',[
    check('email','El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos 
], login);

// router.post('/google',[
//     check('id_token','El id token es necesario').not().isEmpty(),
//     validarCampos
// ], googleSignin );

export default router;