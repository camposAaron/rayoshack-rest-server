import { NextFunction, Request, Response } from "express";

//Evalua si el rol del usuario es administrador
export const isAdminRole = (req: any, res: Response, next:NextFunction) => {
   
    if( !req.user ){
        res.status(500).json({msg : 'no se puede verficar un usuario sin haber generado un token'});
    }

    //verificando rol de usuario autenticado
    const { rol, nombre } = req.user;
    if( rol !== 'ADMIN_ROLE'){
        res.status(401).json({msg : `${nombre} no es administrador`});
    }

    next();
} 

/**
 *have role es una funcion que evalua multiples roles  
 * */

export const haveRole = ( ...roles: Array<String>) => {
    return (req:any, res:Response, next:NextFunction) => {
    
        if( !req.user ){
           return res.status(500).json({msg : 'no se puede verficar un usuario sin haber generado un token'});
        }
 
        if( !roles.includes( req.user.rol ) ){
           return  res.status(401).json({
                msg : `El servicio require uno de los siguientes roles: ${ roles }`
            });
        }
    
        next();
    }
}

export const verifyUser = (id:String) => {
    console.log('here');
    const middlewareFuction = (req:any, res:Response) => {
        return new Promise((resolve, reject)=>{
            if(req.user.rol === 'USER_ROLE'){
                console.log(req.user.rol);
                if(req.user.rol.uid === id){
                    resolve('all ok');
                }else{
                    reject(`No esta autorizado para editar el usuario ${id}`);
                }
            }else{
                resolve('all ok');
            }
        })
    }
} 



