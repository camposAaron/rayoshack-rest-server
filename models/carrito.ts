import { Types, Schema, model } from "mongoose";
import { Producto } from './producto';

interface Carrito{
    usuario : Types.ObjectId;
    cesta : Types.Array<any>;
    cantidad : Number;
    precio : Number;
    total : Number;
    estado : Boolean;
}


const CarritoSchema = new Schema<Carrito>({
   
    usuario : {
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : true
    },
    cesta : [{
      producto : {
        type : Schema.Types.ObjectId,
        ref : 'Producto',
        required : true
      },
      cantidad : { type : Number, required: true, default : 1 },
      precio : Number,
      descuento: Number,
      subTotal: Number
    }],
    total : {
        type : Number
    },
    estado : {
        type : Boolean,
        default : true,
        required : true
    }
});

CarritoSchema.methods.toJSON = function() {
    const { __v, estado , ...data } = this.toObject();
    return data;  
}

export default model("Carrito", CarritoSchema);