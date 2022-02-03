import { Response } from "express";

import { Producto } from '../models/index';
import inventario from "../models/inventario";

const createProduct = async (req: any, res: Response) => {

    const { modelo, marca, cantidad, ...restFields } = req.body;

    const productoName = await Producto.findOne({ modelo });

    if (productoName) {
        return res.status(400).json({
            msg: `El producto con modelo:${productoName.modelo}, ya esta registrado!`
        });
    }

    restFields.nombre = marca + ' ' + modelo;
    restFields.modelo = modelo;
    restFields.marca = marca;

    const product = new Producto(restFields);

    await product.save();

    enum movimiento {
        'entrada',
        'salida'
    }

    //crear el arreglo de transacciones
    const transacciones = [{
        fecha: new Date(),
        tipo: movimiento.entrada,
        cantidad
    }];

    //generar el inventario
    const myInventario = new inventario({ producto: product._id, transacciones, cantidad});
    await myInventario.save();
    
    res.status(201).json(product);

}


const getProducts = async (req: any, res: Response) => {

    const { limite = 5, desde, stock = true } = req.query;
    //la consulta por defecto devolvera los productos con stock disponible
    const query = { estado: true, stock };


    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).
            populate('categoria', [' _id', 'nombre'], { estado: true }).
            populate('promocion', ['_id', 'titulo', 'descuento'], { estado: true }).
            populate({ path: 'comentarios', select: 'comentario' }).
            skip(Number(desde)).
            limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });
}

const getProductById = async (req: any, res: Response) => {
    const { id } = req.params;

    const product = await Producto.findById(id)
        .populate('categoria', [' _id', 'nombre'], { estado: true })
        .populate('promocion', ['_id', 'titulo', 'descuento'], { estado: true })
        .populate({ path: 'comentarios', select: 'comentario' });

    res.json(product);
}

const deleteProduct = async (req: any, res: Response) => {
    const { id } = req.params;

    const product = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(product);

}

const updateProduct = async (req: any, res: Response) => {
    const { id } = req.params;
    const { _id, estado, ...rest } = req.body;


    const product = await Producto.findByIdAndUpdate(id, rest, { new: true });

    res.json(product);

}

export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}