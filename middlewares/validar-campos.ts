import { Request, Response } from "express";

const { validationResult } = require('express-validator');

const validarCampos = (req: Request, res: Response, next:any) =>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
}

export default validarCampos;