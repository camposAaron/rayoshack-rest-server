const { response }  = require("express");
const { Promocion } = require('../models');

const createPromotion = async(req, res = response) => {
    const { estado , ...rest} = req.body;
    
    const promocion = new Promocion(rest);
    await promocion.save();
    res.status(201).json(rest);
}

const getPromotions = async(req, res = response) => {
    const { limite = 5, desde } = req.query;
    const query = { estado : true };
  
    const [total, promociones] = await Promise.all([
        Promocion.countDocuments(query),
        Promocion.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        promociones
    });
} 

const getPromotionId = async(req, res = response) => {
    const { id }=  req.params;
    const promocion = await Promocion.findById({_id : id});

    res.json({
        promocion
    });
}

const updatePromotion = async(req, res = response) => {
    const { id }=  req.params;
    let { estado, ...data} = req.body
    

    const promocion = await Promocion.findByIdAndUpdate(id, data, {new : true});

    res.json(promocion);
}

const deletePromotion = async(req, res = response) => {
    const { id } =  req.params;

    const promocion = await Promocion.findByIdAndUpdate(id, {estado : false}, {new : true});

    res.json(promocion);
}

module.exports = {
    createPromotion,
    getPromotionId,
    getPromotions,
    deletePromotion,
    updatePromotion
}