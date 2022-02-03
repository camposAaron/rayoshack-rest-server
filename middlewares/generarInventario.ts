import { NextFunction, Response } from "express"
import Inventario from "../models/inventario"

const generarInventario = async(req: any, res: Response, next: NextFunction) => {


    next();
}

export default generarInventario;