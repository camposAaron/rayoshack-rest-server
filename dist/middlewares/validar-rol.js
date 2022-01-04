"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.haveRole = exports.isAdminRole = void 0;
//Evalua si el rol del usuario es administrador
const isAdminRole = (req, res, next) => {
    if (!req.user) {
        res.status(500).json({ msg: 'no se puede verficar un usuario sin haber generado un token' });
    }
    //verificando rol de usuario autenticado
    const { rol, nombre } = req.user;
    if (rol !== 'ADMIN_ROLE') {
        res.status(401).json({ msg: `${nombre} no es administrador` });
    }
    next();
};
exports.isAdminRole = isAdminRole;
/**
 *have role es una funcion que evalua multiples roles
 * */
const haveRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({ msg: 'no se puede verficar un usuario sin haber generado un token' });
        }
        if (!roles.includes(req.user.rol)) {
            return res.status(401).json({
                msg: `El servicio require uno de los siguientes roles: ${roles}`
            });
        }
        next();
    };
};
exports.haveRole = haveRole;
const verifyUser = (id) => {
    console.log('here');
    const middlewareFuction = (req, res) => {
        return new Promise((resolve, reject) => {
            if (req.user.rol === 'USER_ROLE') {
                console.log(req.user.rol);
                if (req.user.rol.uid === id) {
                    resolve('all ok');
                }
                else {
                    reject(`No esta autorizado para editar el usuario ${id}`);
                }
            }
            else {
                resolve('all ok');
            }
        });
    };
};
exports.verifyUser = verifyUser;
//# sourceMappingURL=validar-rol.js.map