const {Schema, model } = require('mongoose');

const InventarioSchema = Schema({
    producto : {
        type : Schema.Types.ObjectId,
        ref : 'Producto',
        required: true
    },
    cantidad : {
        type : Number,
        required : true
    },
    estado : {
        type : Boolean,
        required : true,
        default : true
    }
});

InventarioSchema.methods.toJSON = function(){
    const { __v, estado, ...data } = this.toObject();
    return data
}

module.exports = model('Inventario', InventarioSchema);