const { response, request } = require("express");
const {
    Inventario
} = require('../models/index');


const getStocktaking = async(req = request, res = response) => {
    
    const { limite = 5, desde } = req.query;
    const query = { estado : true };
  
    const [total, stocks] = await Promise.all([
        Inventario.countDocuments(query),
        Inventario.find(query)
        .populate('producto',['marca','modelo','portada','categoria'])
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        stocks
    });
}


const getStockProduct = async(req = request, res = response) =>{
    
    const { productId   }=  req.params;
    console.log(productId)
    const inventarioProducto= await Inventario.find({producto : `${productId}`})
    .populate('producto',['marca','modelo','portada','categoria']);

    res.json({
        inventario : inventarioProducto[0]
    });

}

const createStocktaking = async(req = request, res = response) =>{
   
    const  {estado, ...data} = req.body;

    const inventario = new Inventario(data);

    //guardar en DB
    await inventario.save();


    res.status(201).json(inventario);
} 


const updateStocktaking = async(req = request, res = response) =>{
    
    const { id }=  req.params;
    let { estado, producto, cantidad } = req.body

    const inventario = await Inventario.findByIdAndUpdate(id, {producto, cantidad}, {new : true});

    res.json(inventario);
}


const deleteStocktaking = async(req = request, res = response) =>{
    const { id } =  req.params;

    const inventario = await Inventario.findByIdAndUpdate(id, {estado : false}, {new : true});

    res.json(inventario);

}


module.exports = {
    createStocktaking,
    deleteStocktaking,
    getStockProduct,
    getStocktaking,
    updateStocktaking
}