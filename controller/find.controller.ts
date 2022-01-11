import { Request, Response } from 'express';
import { Types } from 'mongoose';
import {Usuario, Producto, Categoria }  from '../models';


const myCollections = ['usuarios','productos','categorias']

const findUsers = async( term:any , res:Response) => {
    
    const isMongoID = Types.ObjectId.isValid(term); //true
    
    //verificar si el termino es un id de mongo
    if(isMongoID){
        const user = await Usuario.findById(term);
        return res.json({
            results :  [ (user) ? (user) : [] ]
        });
    }

    //hacer el termino insensible a mayusculas.
    const regex =  new RegExp(term, 'i');

    const users = await Usuario.find({
        $or : [{name : regex}, {email : regex}],
        $and : [{state : true}]
    });

    res.json({
        results : users
    });
}

const findCategories = async(term:any, res:Response) => {
    const isMongoID = Types.ObjectId.isValid(term);
    if(isMongoID){
        const category = await Categoria.findById(term).populate('user', 'name');
        return res.json({
            results : [ (category) ? (category) : [] ]
        }); 
    }

    const regex = new RegExp(term, 'i');
    const categories = await Categoria.find({name : regex , state : true}).populate('user', 'name');
    res.json({
        results : categories
    });
}

const findProducts = async(term:any, res:Response) => {
    const isMongoID = Types.ObjectId.isValid(term);
    
    if(isMongoID){
        const product = await Producto.findById(term)
        .populate('user','name').populate('category', 'name');
        return res.json({
            results : [ (product) ? (product) : [] ]
        }); 
    }

    const regex = new RegExp(term, 'i');

    const products =  await Producto.find({
            $or : [{ marca : regex}, {modelo: regex}],
            $and : [{estado :  true}, {stock : true}]
    })
    .populate('categoria',[' _id','nombre'], { estado : true})
    .populate('promocion',['_id','titulo','descuento'],{estado : true})
    .populate({ path: 'comentarios', select: 'comentario'})

    res.json({
        results : products
    }); 
}

const finder = (req:Request, res: Response) => {
    const { collection, term } = req.params;
    
    if(!myCollections.includes(collection)){
        res.status(400).json({msg : `La coleccion ${collection} no es valida`});
    }

   switch(collection){
    case 'usuarios':
        findUsers(term, res);   
        break;        
    case 'productos':
        findProducts(term, res);
        break;
    case 'categorias':
        findCategories(term, res);
        break;
    default :
        res.status(500).json('Error al realizar la busqueda');
        break;
    }
}

export default finder;