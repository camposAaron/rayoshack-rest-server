import { NextFunction, Request, Response } from "express";

import  JWT, { Secret } from 'jsonwebtoken';
import { Usuario } from "../models";

const privateKey:Secret = process.env.SECRETORPRIVATEKEY!;

 const validarJWT = async (req: any, res:Response, next:NextFunction) => {

    const token = req.header('x-token');

    if(!token){
         return res.status(401).json({
             msg : 'No hay token en la petición'
         });
    }

     try{
        
        const data:any = JWT.verify(token, privateKey);
        req.uid = data.uid;

        //leer el usuario que corresponde al uid
        const user =  await Usuario.findById( data.uid );

        //comprobar si el usuario existe
        if(!user){
            return res.status(401).json({
                msg : 'Token no válido -Usuario no existe en DB'
            });
        }

        //comprobar si el usuario esta activo
        if(!user.estado){
            return res.status(401).json({
                msg : 'Token no válido -Usuario estado :false'
            });
        }

        req.user = user;     
        next();
    
    }catch(err){
    
        console.log(err);
        return res.status(401).json({
            msg : 'Token no válido'
        });

    }
}
export default validarJWT;