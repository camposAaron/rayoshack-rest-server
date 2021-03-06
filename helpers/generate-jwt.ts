import JWT from 'jsonwebtoken';


 const generateJWT = (uid: String) => {
    return new Promise((resolve, reject)=>{
        const payload = { uid };
        JWT.sign(payload, process.env.SECRETORPRIVATEKEY||'', {expiresIn : '4h'}, (err, token)=>{
            if( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })
    
    })
}

export default generateJWT



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