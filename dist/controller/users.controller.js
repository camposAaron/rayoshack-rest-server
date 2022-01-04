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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsers = exports.postUsers = exports.putUsers = exports.getUsers = void 0;
const bcrypt = require('bcryptjs');
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde } = req.query;
    const query = { estado: true };
    const [total, usuarios] = yield Promise.all([
        usuario_1.default.countDocuments(query),
        usuario_1.default.find(query)
            .populate('direccion', ['_id', 'departamento', 'direccion', 'telefono'], { state: true })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
});
exports.getUsers = getUsers;
const putUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { _id, email, password, google, rol, estado } = _a, rest = __rest(_a, ["_id", "email", "password", "google", "rol", "estado"]);
    console.log(req.uid, id);
    if (req.uid !== id) {
        return res.status(401).json({
            msg: `No estas autorizado para realizar cambios`
        });
    }
    //TODO validar contra base de datos.
    if (password) {
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
        // rest.email = email;
    }
    const user = yield usuario_1.default.findByIdAndUpdate(id, rest, { new: true });
    res.json(user);
});
exports.putUsers = putUsers;
const postUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, direccion, password, rol } = req.body;
    const user = new usuario_1.default({ nombre, email, direccion, rol });
    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    //Guardar en la base de datos
    yield user.save();
    res.json(user);
});
exports.postUsers = postUsers;
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield usuario_1.default.findByIdAndUpdate(id, { estado: false });
    const userAutenticated = req.user;
    res.json({ user, userAutenticated });
});
exports.deleteUsers = deleteUsers;
//# sourceMappingURL=users.controller.js.map