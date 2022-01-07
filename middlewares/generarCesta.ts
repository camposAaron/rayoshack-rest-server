import { NextFunction, Response } from "express";
import { Carrito } from "../models";

const generarCesta= async (req: any, res:Response, next:NextFunction) =>{
    const id = req.uid;
    const idFound = await Carrito.findOne({usuario : id});
    
    if(!idFound){
        //crear carrito al usuario
        const myCarrito = new Carrito({usuario : id });
        await myCarrito.save();
    }

    next();
}

export default generarCesta;