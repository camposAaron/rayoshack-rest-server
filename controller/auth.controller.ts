import { Response } from "express";
import  bcriptjs         from 'bcryptjs';
import  { Usuario }          from '../models';
import  {generateJWT, googleVerify} from '../helpers'



export const login = async (req:any, res: Response) => {

    const { email, password } = req.body;

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos'
            });
        }

        //Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario no existe'
            })
        }

        //verificar la contraseña
        const validPassword = bcriptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            res.status(400).json({
                msg: 'Usuario / password no son correctos'
            })
        }

        //generar el JWT
        const token = await generateJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

export const googleSignin = async (req:any, res:Response) => {

    const { id_token } = req.body;

    try {
        const { name, email, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({email});

        if(!usuario){
            //crear usuario
            const data = {
                name,
                email,
                password : ':P',
                img,
                google : true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        //si el usuario de google tiene el estado en false
        if(!usuario.state){
            return res.status(401).json({
                msg: 'Hable con el administrador, Usuario bloqueado'
            });
        }


      //generar el JWT
        const token = await generateJWT(usuario.id);
    

        res.json({
            usuario,
            token
        });

    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: 'El token de google no es valido'
        });
    }

}
