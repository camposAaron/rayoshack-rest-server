const { Schema, model } = require('mongoose');

const CarritoSchema = Schema({
    producto : [{
        type : Schema.Types.ObjectId,
        ref : 'Producto'
    }],
    cantidad : {
        type : Number
    },
    precio : {
        type : Number
    },
    Subtotal : {
        type : Number
    },
    state : {
        type : Boolean,
        default : true,
        required : true
    },
});

CarritoSchema.methods.toJSON = function() {
    const { __v, state , ...data } = this.toObject();
    return data;  
}

module.exports = model("Carrito", CarritoSchema);