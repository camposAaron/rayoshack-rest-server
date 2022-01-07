import { Response } from "express";

import { Producto } from '../models/index';

const createProduct = async (req:any, res: Response) => {

    const { modelo, ...restFields } = req.body;

    const productoName = await Producto.findOne({ modelo });

    if (productoName) {
        return res.status(400).json({
            msg: `El producto con modelo:${productoName.modelo}, ya esta registrado!`
        });
    }

    restFields.modelo = modelo;

    const product = new Producto(restFields);

    await product.save()

    res.status(201).json(product);

}


const getProducts = async (req:any, res: Response) => {

    const { limite = 5, desde, stock = true } = req.query;
    //la consulta por defecto devolvera los productos con stock disponible
    const query = { estado: true, stock };


    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).
            populate('categoria',[' _id','nombre'], { estado : true}).
            populate('promocion',['_id','titulo','descuento'],{estado : true}).
            populate({ path: 'comentarios', select: 'comentario'}).
            skip(Number(desde)).
            limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });
}

const getProductById = async (req:any, res: Response) => {
    const { id } = req.params;

    const product = await Producto.findById(id)
        .populate('categoria',[' _id','nombre'], {estado : true})
        .populate('promocion',['_id','titulo','descuento'],{estado : true})
        .populate({ path: 'comentarios', select: 'comentario'});
        
    res.json(product);
}

const deleteProduct = async (req:any, res: Response) => {
    const { id } = req.params;

    const product = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(product);

}

const updateProduct = async (req:any, res: Response) => {
    const { id } = req.params;
    const { _id, estado, ...rest } = req.body;
    
    const product =  await Producto.findByIdAndUpdate(id, rest, { new: true });

    res.json(product);


}

export{
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}