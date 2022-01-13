import { Response } from 'express';
import { Promocion }   from '../models';

const createPromotion = async(req:any, res:Response) => {
    
    const { estado , ...rest} = req.body;
    const promocion = new Promocion(rest);
    await promocion.save();
    res.status(201).json(rest);
}

const getPromotions = async(req:any, res:Response) => {

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

const getPromotionId = async(req:any, res:Response) => {

    const { id }=  req.params;
    const promocion = await Promocion.findById({_id : id});

    res.json({
        promocion
    });
}

const updatePromotion = async(req:any, res:Response) => {

    const { id }=  req.params;
    let { estado, ...data} = req.body
    const promocion = await Promocion.findByIdAndUpdate(id, data, {new : true});

    res.json(promocion);
}

const deletePromotion = async(req:any, res:Response) => {
 
    const { id } =  req.params;
    const promocion = await Promocion.findByIdAndUpdate(id, {estado : false}, {new : true});

    res.json(promocion);
}

export {
    createPromotion,
    getPromotionId,
    getPromotions,
    deletePromotion,
    updatePromotion
}