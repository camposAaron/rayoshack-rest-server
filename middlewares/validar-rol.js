const { response } = require("express");


//Evalua si el rol del usuario es administrador
const isAdminRole = (req, res = response, next) => {
   
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

const haveRole = ( ...rols ) => {
    return (req, res, next) => {
    
        if( !req.user ){
           return res.status(500).json({msg : 'no se puede verficar un usuario sin haber generado un token'});
        }
 
        if( !rols.includes( req.user.role ) ){
           return  res.status(401).json({
                msg : `El servicio require uno de los siguientes roles: ${ rols }`
            });
        }
    
        next();
    }
}


module.exports = {
    isAdminRole,
    haveRole
}