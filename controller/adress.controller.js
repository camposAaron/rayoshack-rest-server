const { Direccion, Usuario } = require('../models');

const createAdress = async(req, res = response) => {
    const { ...data } = req.body;
    const user = req.user;
 
    //si tiene una direccion previa borrarla
    if(user.direccion){
        await Direccion.findByIdAndDelete({_id : user.direccion});
    }
    
    const adress = new Direccion(data);
    await adress.save();

    user.direccion = adress._id;

    await user.save();
    res.json({
        adress
    });
}



module.exports = {
    createAdress
}