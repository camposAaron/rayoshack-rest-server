const { Schema, model } = require('mongoose');

const VentaSchema = Schema({
    NVenta : {
        type : String
    },
    cliente : {
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : true
    },
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
    state : {
        type : Boolean,
        default : true,
        required : true
    }
});

VentaSchema.methods.toJSON = function() {
    const { __v, state , ...data } = this.toObject();
    return data;  
}

module.exports = model("Venta", VentaSchema);