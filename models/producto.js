const {Schema, model } = require('mongoose');

const ProductSchema = Schema({
    marca : {
        type : String,
        required : true
    },
    modelo : {
        type: String,
        required : true,
        unique : true
    },
    precio : {
        type : Number,
        default : 0
    },
    galeria : {
        type : [String],
    },
    portada : {
        type : String,
    },
    contenido : {
        type : String
    },
    categoria : {
        type : Schema.Types.ObjectId,
        ref : 'Categoria',
        required : true
    },
    stock  : { type : Boolean, default : false },
    promocion : {
        type : Schema.Types.ObjectId,
        ref : 'Promocion',
        required : false
    },
    estado : {
        type : Boolean,
        required : true,
        default : true
    }
});

ProductSchema.methods.toJSON = function(){
    const { __v, estado, ...data } = this.toObject();
    return data
}

module.exports =  model("Producto", ProductSchema);