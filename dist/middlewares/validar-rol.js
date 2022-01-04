"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.haveRole = exports.isAdminRole = void 0;
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
                msg: `El servicio requiere uno de los siguientes roles: ${roles}`
            });
        }
        next();
    };
};
exports.haveRole = haveRole;
//# sourceMappingURL=validar-rol.js.map