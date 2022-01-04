import { Response } from "express";

const { Direccion, Usuario } = require('../models');

const createAdress = async(req: any, res: Response) => {
    
    const { ...data } = req.body;
    const user = req.user;
 
    //si tiene una direccion previa borrarla
    if(user.direccion){
        await Direccion.findByIdAndDelete({_id : user.direccion});
    }
    
    const address = new Direccion(data);
    await address.save();

    user.direccion = address._id;
    await user.save();

    res.json({
        direccion: address
    });
}

export {
    createAdress
}
