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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const privateKey = process.env.SECRETORPRIVATEKEY;
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, privateKey);
        req.uid = data.uid;
        //leer el usuario que corresponde al uid
        const user = yield models_1.Usuario.findById(data.uid);
        //comprobar si el usuario existe
        if (!user) {
            return res.status(401).json({
                msg: 'Token no válido -Usuario no existe en DB'
            });
        }
        //comprobar si el usuario esta activo
        if (!user.estado) {
            return res.status(401).json({
                msg: 'Token no válido -Usuario estado :false'
            });
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
});
exports.default = validarJWT;
//# sourceMappingURL=validar-jwt.js.map