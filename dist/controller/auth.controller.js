"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignin = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //verificar si el email existe
        const usuario = yield models_1.Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            });
        }
        //Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario no existe'
            });
        }
        //verificar la contraseña
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            res.status(400).json({
                msg: 'Usuario / password no son correctos'
            });
        }
        //generar el JWT
        const token = yield (0, helpers_1.generateJWT)(usuario.id);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.login = login;
const googleSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { name, email, img } = yield (0, helpers_1.googleVerify)(id_token);
        let usuario = yield models_1.Usuario.findOne({ email });
        if (!usuario) {
            //crear usuario
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true
            };
            usuario = new models_1.Usuario(data);
            yield usuario.save();
        }
        //si el usuario de google tiene el estado en false
        if (!usuario.state) {
            return res.status(401).json({
                msg: 'Hable con el administrador, Usuario bloqueado'
            });
        }
        //generar el JWT
        const token = yield (0, helpers_1.generateJWT)(usuario.id);
        res.json({
            usuario,
            token
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            msg: 'El token de google no es valido'
        });
    }
});
exports.googleSignin = googleSignin;
//# sourceMappingURL=auth.controller.js.map