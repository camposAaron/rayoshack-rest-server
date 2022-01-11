"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validarCargaArchivo = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivos) {
        return res.status(400).json({
            msg: 'No hay archivo a subir --sube al menos un archivo'
        });
    }
    //verficar que archivos es un arreglo
    if (!Array.isArray(req.files.archivos)) {
        req.files.archivos = [req.files.archivos];
    }
    next();
};
exports.default = validarCargaArchivo;
//# sourceMappingURL=validar-archivo.js.map