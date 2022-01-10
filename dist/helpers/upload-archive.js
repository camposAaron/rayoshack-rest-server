"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
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
            const rutaDeCarga = path_1.default.join(__dirname, '../../public/uploads', folder, temporalName);
            console.log(rutaDeCarga);
            archivo.mv(rutaDeCarga, (err) => {
                if (err) {
                    reject('xdxdd');
                }
            });
            imagenes.push(temporalName);
        }
        resolve(imagenes);
    });
};
exports.default = uploadArchive;
//# sourceMappingURL=upload-archive.js.map