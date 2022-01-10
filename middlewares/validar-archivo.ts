import { NextFunction, Request, Response } from "express";


const validarCargaArchivo = (req: any, res: Response, next:NextFunction) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivos) {
        return res.status(400).json({
            msg: 'No hay archivo a subir --sube al menos un archivo'
        });
    }

    next();
}
export default validarCargaArchivo;