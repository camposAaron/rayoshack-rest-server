const { response } = require('express');
const { Producto, Carrito } = require('../models/index');

const createProduct = async (req, res = response) => {

    const { modelo, ...restFields } = req.body;

    console.log(restFields);

    const productoName = await Producto.findOne({ modelo });

    if (productoName) {
        return res.status(400).json({
            msg: `El producto ${productoName.name} ya esta registrado!`
        });
    }

    restFields.modelo = modelo;

    const product = new Producto(restFields);

    await product.save()

    res.status(201).json(product);

}


const getProducts = async (req, res = response) => {

    const { limite = 5, desde, stock = true } = req.query;
    //la consulta por defecto devolvera los productos con stock disponible
    const query = { estado: true, stock };


    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).
            populate('categoria', 'nombre').
            populate('promocion', 'descuento').
            skip(Number(desde)).
            limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });
}

const getProductById = async (req, res = response) => {
    const { id } = req.params;

    const product = await Producto.findById(id)
        .populate('categoria', 'nombre')
        .populate('promocion', 'descuento')

    res.json(product);
}

const deleteProduct = async (req, res = response) => {
    const { id } = req.params;

    const product = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(product);

}

const updateProduct = async (req, res = response) => {
    const { id } = req.params;
    const { _id, estado, ...rest } = req.body;
    
    console.log(rest);

    const product =  await Producto.findByIdAndUpdate(id, rest, { new: true });

    res.json(product);


}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}