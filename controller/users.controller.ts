const bcrypt = require('bcryptjs');
import { Response } from 'express';
import Usuario from '../models/usuario';


const getUsers = async (req: any, res: Response) => {

    const { limite = 5, desde } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .populate('direccion', ['_id', 'departamento', 'direccion', 'telefono'], { estado: true })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);


    res.json({
        total,
        usuarios
    });
}

const putUsers = async (req: any, res: Response) => {
    const { id } = req.params;
    const { _id, email, password, google, rol, estado, ...rest } = req.body;
    console.log(req.uid, id);

    if (req.user.rol === 'USER_ROLE') {
        if (req.uid !== id) {
            return res.status(401).json({
                msg: `No estas autorizado para eliminar la cuenta`
            });
        }
    }

    //TODO validar contra base de datos.
    if (password) {
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
        // rest.email = email;
    }

    const user = await Usuario.findByIdAndUpdate(id, rest, { new: true });
    res.json(user);
}

const postUsers = async (req: any, res: Response) => {

    const { nombre, email, direccion, password, rol } = req.body;
    const user = new Usuario({ nombre, email, direccion, rol });


    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);


    //Guardar en la base de datos
    await user.save();

    res.json(user);
}

const deleteUsers = async (req: any, res: Response) => {

    const { id } = req.params;

    if (req.user.rol === 'USER_ROLE') {
        if (req.uid !== id) {
            return res.status(401).json({
                msg: `No estas autorizado para eliminar la cuenta`
            });
        }
    }

    const user = await Usuario.findByIdAndUpdate(id, { estado: false });
    const userAutenticated = req.user;
    res.json({ user, userAutenticated });
}

export {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers
}