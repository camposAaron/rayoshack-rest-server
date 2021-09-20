const bcrypt = require('bcryptjs');
const { response, request } = require('express');
const Usuario = require('../models/usuario');


const getUsers = async(req = request, res = response) => {
   
    const { limite = 5, desde} = req.query;
    const query = { estado : true};

    console.log(limite, desde);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)    
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

  
    res.json({
        total,
        usuarios
    });
}

const putUsers = async (req, res) => {
    const { id } = req.params;
    const {_id, email, password, google, ...rest } = req.body;

    //TODO validar contra base de datos.
    if (password) {

        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
        // rest.email = email;
    }

    const user = await Usuario.findByIdAndUpdate(id, rest, {new : true});

    res.json(user);
}

const postUsers = async (req, res) => {

    const { nombre, password, email, rol } = req.body;
    const user = new Usuario({ nombre, password, email, rol });


    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);


    //Guardar en la base de datos
    await user.save();

    res.json(user);
}

const deleteUsers = async(req, res) => {
    
    const {id} = req.params;

    const user = await Usuario.findByIdAndUpdate(id, {estado : false});
    const userAutenticated = req.user;
    res.json({user, userAutenticated});
}



module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers
}