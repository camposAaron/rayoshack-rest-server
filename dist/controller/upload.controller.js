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
exports.updateImg = exports.uploadImg = void 0;
const path_1 = __importDefault(require("path"));
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
        if (collection === 'productos') {
            //borra archivos si los hay;
            helpers_1.archiveOp.deleteArchives(`${model.marca}-${model.modelo}`);
            //subir archivos al servidor
            const imagenes = yield helpers_1.archiveOp.uploadArchive(req.files, ['jpg', 'png', 'jpeg'], `${model.marca}-${model.modelo}`, []);
            if (imagenes.length > 1) {
                // //la primera imagen del arreglo corresponde a la portada.
                model.portada = imagenes.shift();
                // //el resto de imagenes se asigna a la galeria.
                model.galeria = imagenes;
                yield model.save();
                res.json({
                    msg: `Imagenes subidas al servidor`
                });
            }
            else {
                // //la primera imagen del arreglo corresponde a la portada.
                model.galeria = [];
                model.portada = imagenes.pop();
                yield model.save();
                res.json({
                    msg: `Imagen subida al servidor`
                });
            }
        }
    }
    catch (err) {
        res.status(505).json({ msg: `Error al cargar archivo al servidor` });
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
//# sourceMappingURL=upload.controller.js.map