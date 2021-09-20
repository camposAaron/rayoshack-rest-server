const { response, request } = require("express");
const {
    Categoria
} = require('../models/index');



const getCategories = async(req = request, res = response) => {
    
    const { limite = 5, desde } = req.query;
    const query = { estado : true };
  
    const [total, categories] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('user','name')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        categories
    });
}


const getCategory = async(req = request, res = response) =>{
    
    const { id }=  req.params;
    const category = await Categoria.findById({_id : id});

    res.json({
        category
    });

}

const createCategory = async(req = request, res = response) =>{
   
    const  nombre = req.body.nombre.toUpperCase();

    const categoryDB = await Categoria.findOne({ nombre });
    

    if(categoryDB){
        return res.status(400).json({
            msg :  `La categoria ${ categoryDB.nombre } ya esta registrada!`
        });
    }

    //generar la data a guardar
    const data = {
        nombre
    }

    const category = new Categoria(data);

    //guardar en DB
    await category.save();


    res.status(201).json(category);
} 

//Actualizar Categoria  --ADMIN_ROLE autenticado
const updateCategory = async(req = request, res = response) =>{
    
    const { id }=  req.params;
    let { estado, nombre} = req.body
    
    nombre = nombre.toUpperCase();

    const category = await Categoria.findByIdAndUpdate(id, {estado, nombre}, {new : true});

    res.json(category);
}


const deleteCategory = async(req = request, res = response) =>{
    const { id } =  req.params;

    const category = await Categoria.findByIdAndUpdate(id, {estado : false}, {new : true});

    res.json(category);

}



module.exports = {
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    createCategory
}