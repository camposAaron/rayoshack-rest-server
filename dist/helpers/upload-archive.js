"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadArchive = void 0;
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const uploadArchive = (files, validExtensions = ['jpg', 'png', 'jpeg', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        /*Validar extension */
        const { archivo } = files;
        const nameSplit = archivo.name.split('.');
        const extension = nameSplit[nameSplit.length - 1];
        if (!validExtensions.includes(extension)) {
            reject(`La extension '${extension}' no es permitida, ${validExtensions}`);
        }
        const temporalName = (0, uuid_1.v4)() + '.' + extension;
        const rutaDeCarga = path_1.default.join(__dirname, '../uploads/', folder, temporalName);
        archivo.mv(rutaDeCarga, (err) => {
            if (err) {
                reject(err);
            }
            resolve(temporalName);
        });
    });
};
exports.uploadArchive = uploadArchive;
//# sourceMappingURL=upload-archive.js.map