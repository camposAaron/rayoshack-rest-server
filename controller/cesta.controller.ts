import { Response } from 'express';
import { Carrito, Producto } from '../models';


const putProductoCesta = async (req: any, res: Response) => {
    const { producto, cantidad } = req.body;
    const myProducto =  await Producto.findById({_id: producto}).populate('promocion');
    const userId = req.uid;
    const myCarrito = await Carrito.findOne({ usuario: userId});
    
    let precio = myProducto.precio;
    let total = myCarrito.total || 0;
    let subTotal;
    let descuento 
    
    if(myProducto.promocion){
        descuento = myProducto.promocion.descuento * precio;
        precio =  precio - descuento;
    }

    subTotal = precio * cantidad;
    total += subTotal;
   
    const data = { producto, cantidad, descuento, precio, subTotal}
    
    const cesta = await Carrito.findByIdAndUpdate({_id : myCarrito._id}, {
        $push : { cesta : data},
        total
    });

    res.status(201).json({
        msg: `Producto agregado a la cesta!`
    });
}


const getCarrito = async(req:any, res:Response) => {
    const idUser = req.uid;
    const myCarrito = await Carrito.findOne({usuario: idUser})
    .populate('usuario','nombre')
    .populate({path: 'cesta.producto', select : ['marca','modelo','portada','precio']})

    res.json(myCarrito);
}


const deleteDetalleCarrito = async (req: any, res: Response) => {
    res.json({ msg: 'delete' });
}

const updateDetalleCarrito = async (req: any, res: Response) => {
    const { ...data } = req.body;
    res.json({
        data
    });
}

export {
    putProductoCesta,
    getCarrito
}