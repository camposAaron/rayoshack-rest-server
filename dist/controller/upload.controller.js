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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryUpdateImg = exports.getImage = exports.updateImg = exports.uploadImg = void 0;
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const path = require('path');
const fs = require('fs');
const { uploadArchive } = require('../helpers');
const { User, Product } = require('../models');
//ruta para imagen no encontrada.
const pathNotFoundImg = path.join(__dirname, '../assets/no-image.jpg');
const uploadImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = yield uploadArchive(req.files);
        // const name = await uploadArchive(req.files, ['md', 'txt'],'textos');
        res.json({ name });
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
exports.uploadImg = uploadImg;
/*Carga los archivos al hosting cloudinary */
const CloudinaryUpdateImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = yield User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El usuario con id : ${id} no existe`
                });
            }
            break;
        case 'products':
            model = yield Product.findById(id);
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
        //Limpiar imagen previa
        if (model.img) {
            const imgSplited = model.img.split('/').pop();
            const [public_id] = imgSplited.split('.');
            yield cloudinary.uploader.destroy(`${collection}/${public_id}`);
        }
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = yield cloudinary.uploader.upload(tempFilePath, { folder: `${collection}` });
        model.img = secure_url;
        yield model.save();
        res.json({ model });
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
exports.CloudinaryUpdateImg = CloudinaryUpdateImg;
/* Carga archivos al servidor */
const updateImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = yield User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El usuario con id : ${id} no existe`
                });
            }
            break;
        case 'products':
            model = yield Product.findById(id);
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
        //verificar si existe imagen previa
        if (model.img) {
            const pathComplete = path.join(__dirname, '../uploads', collection, model.img);
            //verificar si la ruta existe para despues borrarla
            if (fs.existsSync(pathComplete))
                fs.unlinkSync(pathComplete);
        }
        const name = yield uploadArchive(req.files, undefined, collection);
        model.img = name;
        yield model.save();
        res.json({ model });
    }
    catch (msg) {
        res.status(400).json({ msg });
    }
});
exports.updateImg = updateImg;
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = yield User.findById(id);
            if (!model) {
                res.status(400).json({
                    msg: `El usuario con id ${id} no existe`
                });
            }
            break;
        case 'products':
            model = yield Product.findById(id);
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
        const pathImage = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImage))
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