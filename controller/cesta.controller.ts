import { Response } from 'express';
import { Carrito, Producto } from '../models';


const putProductoCesta = async (req: any, res: Response) => {
    const { producto, cantidad } = req.body;
    const myProducto = await Producto.findById({ _id: producto }).populate('promocion');
    const userId = req.uid;
    const myCarrito = await Carrito.findOne({ usuario: userId });

    let precio = myProducto.precio;
    let total = myCarrito.total || 0;
    let subTotal;
    let descuento

    if (myProducto.promocion) {
        descuento = myProducto.promocion.descuento * precio;
        precio = precio - descuento;
    }

    subTotal = precio * cantidad;
    total += subTotal;

    const data = { producto, cantidad, descuento, precio, subTotal }

    const cesta = await Carrito.findByIdAndUpdate({ _id: myCarrito._id }, {
        $push: { cesta: data },
        total
    });

    res.status(201).json({
        msg: `Producto agregado a la cesta!`
    });
}


const getCarrito = async (req: any, res: Response) => {
    const idUser = req.uid;
    const myCarrito = await Carrito.findOne({ usuario: idUser })
        .populate('usuario', 'nombre')
        .populate({ path: 'cesta.producto', select: ['marca', 'modelo', 'portada', 'precio'] })

    res.json(myCarrito);
}


const deleteProductoCesta = async (req: any, res: Response) => {
    const { productoEnCesta } = req.body;
    const userId = req.uid;

    try {
        const myCarrito = await Carrito.findOneAndUpdate({ usuario: userId }, {
            $pull: { cesta: { _id: productoEnCesta } }
        });
        const producto = myCarrito.cesta.id(productoEnCesta);

        myCarrito.total -= producto.subTotal;
        await myCarrito.save();

        res.json({
            msg: `El producto ha sido eliminado de la cesta!`
        });
    } catch (error) {
        res.status(400).json({
            msg: `El producto a borrar no existe`
        });
    }
}

const updateDetalleCarrito = async (req: any, res: Response) => {
    const { ...data } = req.body;
    res.json({
        data
    });
}

export {
    putProductoCesta,
    getCarrito,
    deleteProductoCesta
}