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
exports.getImage = exports.updateImg = exports.uploadImg = void 0;
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const helpers_1 = require("../helpers");
const models_1 = require("../models");
//ruta para imagen no encontrada.
const pathNotFoundImg = path_1.default.join(__dirname, '../assets/no-image.jpg');
const uploadImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case 'usuarios':
            model = yield models_1.Usuario.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El usuario con id : ${id} no existe`
                });
            }
            break;
        case 'productos':
            model = yield models_1.Producto.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El producto con id : ${id} no existe`
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: `la coleccion ${collection} no esta definida`
            });
            break;
    }
    try {
        //TODO: Limpiar imagen previa
        if (collection === 'productos') {
            const imagenes = yield (0, helpers_1.uploadArchive)(req.files, ['jpg', 'png', 'jpeg'], `${model.marca}-${model.modelo}`, []);
            // //la primera imagen del arreglo corresponde a la portada.
            model.portada = imagenes.shift();
            // //el resto de imagenes se asigna a la galeria.
            model.galeria = imagenes;
            yield model.save();
            res.json({ imagenes });
        }
        ;
    }
    catch (err) {
        res.status(400).json({ msg: err });
    }
});
exports.uploadImg = uploadImg;
/* Carga archivos al servidor */
const updateImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { collection, id } = req.params;
    // let model;
    // switch (collection) {
    //     case 'users':
    //         model = await Usuario.findById(id);
    //         if (!model) {
    //             return res.status(400).json({
    //                 msg: `El usuario con id : ${id} no existe`
    //             });
    //         }
    //         break;
    //     case 'products':
    //         model = await Producto.findById(id);
    //         if (!model) {
    //             return res.status(400).json({
    //                 msg: `El producto con id : ${id} no existe`
    //             });
    //         }
    //         break;
    //     default:
    //         return res.status(500).json({
    //             msg: `la coleccion ${collection} no esta definida`
    //         });
    //         break;
    // }
    // try {
    //     //verificar si existe imagen previa
    //     if (model.img) {
    //         const pathComplete = path.join(__dirname, '../uploads', collection, model.img);
    //         //verificar si la ruta existe para despues borrarla
    //         if (fs.existsSync(pathComplete))
    //             fs.unlinkSync(pathComplete);
    //     }
    //     const name = await uploadArchive(req.files, undefined, collection);
    //     model.img = name;
    //     await model.save();
    //     res.json({ model });
    // } catch (msg) {
    //     res.status(400).json({ msg });
    // }
});
exports.updateImg = updateImg;
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = yield models_1.Usuario.findById(id);
            if (!model) {
                res.status(400).json({
                    msg: `El usuario con id ${id} no existe`
                });
            }
            break;
        case 'products':
            model = yield models_1.Producto.findById(id);
            if (!model) {
                res.status(400).json({
                    msg: `El producto con id ${id} no existe`
                });
            }
            break;
        default:
            res.status(400).json({
                msg: 'Coleccion no definida consulte con el desarrollador del servidor'
            });
    }
    if (model.img) {
        const pathImage = path_1.default.join(__dirname, '../uploads', collection, model.img);
        if (fs_1.default.existsSync(pathImage))
            res.sendFile(pathImage);
        else
            res.sendFile(pathNotFoundImg);
    }
    else {
        res.sendFile(pathNotFoundImg);
    }
});
exports.getImage = getImage;
//# sourceMappingURL=upload.controller.js.map