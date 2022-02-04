import { Request, Response } from 'express';
import { Inventario  } from '../models';

const getInventarioByProductId = async(req: Request, res: Response) => {
    const { id } = req.params;  

    const inventario = await Inventario.find({producto: id});
    console.log(inventario);
    res.json(inventario);

}

export {
    getInventarioByProductId
}