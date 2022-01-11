"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArchives = exports.uploadArchive = void 0;
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadArchive = (files, validExtensions, folder, imagenes) => {
    return new Promise((resolve, reject) => {
        const { archivos } = files;
        for (let archivo of archivos) {
            /*Validar extension */
            const nameSplit = archivo.name.split('.');
            const extension = nameSplit[nameSplit.length - 1];
            if (!validExtensions.includes(extension)) {
                reject(`La extension '${extension}' no es permitida, ${validExtensions}`);
            }
            const temporalName = (0, uuid_1.v4)() + '.' + extension;
            const rutaDeCarga = path_1.default.join(__dirname, '../../public/uploads/products', folder, temporalName);
            archivo.mv(rutaDeCarga, (err) => {
                if (err) {
                    reject(err);
                }
            });
            imagenes.push(temporalName);
            resolve(imagenes);
        }
    });
};
exports.uploadArchive = uploadArchive;
const deleteArchives = (folderName) => {
    const carpetaRemover = path_1.default.join(__dirname, '../../public/uploads/products', folderName);
    fs_1.default.readdir(carpetaRemover, (err, files) => {
        if (!files) {
            return;
        }
        const unlinkPromises = files.map(file => {
            const filePath = path_1.default.join(carpetaRemover, file);
            return fs_1.default.unlink(filePath, (err) => { console.log(err); });
        });
        if (err) {
            return `Algo salio mal al borrar los ficheros del directorio: ${carpetaRemover}`;
        }
        return Promise.all(unlinkPromises);
    });
};
exports.deleteArchives = deleteArchives;
//# sourceMappingURL=upload-archive.js.map