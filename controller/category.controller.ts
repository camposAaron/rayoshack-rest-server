import { Request, Response } from "express";
import { Categoria } from "../models";

const getCategories = async(req:Request, res: Response) => {
    console.log('kakak00');
    const { limite = 5, desde } = req.query;
    const query = { estado : true };
  
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('user','name')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        categorias
    });

}


const getCategory = async(req: Request, res: Response) =>{
    
    const { id }=  req.params;
    const category = await Categoria.findById({_id : id});

    res.json({
        category
    });

}

const createCategory = async(req: Request, res: Response) =>{
   
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
const updateCategory = async(req: Request, res: Response) =>{
    
    const { id }=  req.params;
    let { estado, nombre} = req.body
    
    nombre = nombre.toUpperCase();

    const category = await Categoria.findByIdAndUpdate(id, {estado, nombre}, {new : true});

    res.json(category);
}


const deleteCategory = async(req: Request, res: Response) =>{
    const { id } =  req.params;

    const category = await Categoria.findByIdAndUpdate(id, {estado : false}, {new : true});

    res.json(category);

}


export  {
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    createCategory
}