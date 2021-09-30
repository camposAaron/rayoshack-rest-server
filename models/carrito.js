const { Schema, model } = require('mongoose');

const CarritoSchema = Schema({
   
    usuario : {
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : true
    },
    producto : {
        type : Schema.Types.ObjectId,
        ref : 'Producto',
        required : true
    },
    cantidad : {
        type : Number
    },
    precio : {
        type : Number,
    },
    total : {
        type : Number
    },
    state : {
        type : Boolean,
        default : true,
        required : true
    }
});

CarritoSchema.methods.toJSON = function() {
    const { __v, state , ...data } = this.toObject();
    return data;  
}

module.exports = model("Carrito", CarritoSchema);