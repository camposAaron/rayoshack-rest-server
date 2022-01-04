"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, process.env.SECRETORPRIVATEKEY || '', { expiresIn: '4h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.default = generateJWT;
// const generateJWT = ( uid ) => {
//     return new Promise( (resolve, reject) => {
//         const payload = { uid };
//         JWT.sign(payload , process.env.SECRETPRIVATEKEY , {expiresIn : '4h'}, 
//         (err, token)=>{
//             if( err ){
//                 console.log(err);
//                 reject('No se pudo generar el token')l
//             }else{
//                 resolve(token);
//             }
//         })
//     })
// }
//# sourceMappingURL=generate-jwt.js.map