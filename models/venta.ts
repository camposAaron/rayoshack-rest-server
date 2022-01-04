import { Schema, model, Types } from 'mongoose';

interface Venta{
    codigo : String;
    cliente : Types.ObjectId;
    productos : Types.DocumentArray<any>;
    direccion : Types.ObjectId;
    metodo : String;
    subTotal : Number;
    Total : Number;
    estado : Boolean;
}

const VentaSchema = new Schema<Venta>({
    codigo : {
        type : String
    },
    cliente : {
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : true
    },
    productos : [{
       producto : {
           type :  Types.ObjectId,
           ref  : 'Producto'
       },
       cantidad : { type : Number, required: true },
       precio : Number
    }],
    direccion : {
        type : Schema.Types.ObjectId,
        ref : 'Direccion',
        required : [true, 'La direccion es obligatoria']
    },
    Metodo : {
        type : String,   //metodo de pago   
        enum : ['Tarjeta', 'efectivo']
    },
    NTransaccion : {
        type : String  //numero de transaccion -- en caso de realizar pago electronico
    },
    tracking : {
        type : String,
        enum : ['En espera', 'En camino', 'Entregado'] //tracking = estado del envio
    },
    Subtotal : {
        type : Number,
    },
    estado : {
        type : Boolean,
        default : true,
        required : true
    }
});

VentaSchema.methods.toJSON = function() {
    const { __v,  estado, ...data } = this.toObject();
    return data;  
}

export default model("Venta", VentaSchema);