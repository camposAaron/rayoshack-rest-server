const {Schema, model } = require('mongoose');

const ProductSchema = Schema({
    marca : {
        type : String,
        required : true
    },
    modelo : {
        type: String,
        required: true
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
    descripcion : {
        type : String,
    },
    contenido : {
        type : String
    },
    estado : {
        type : Boolean,
        required : true,
        default : true
    },
    categoria : {
        type : Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    descripcion : { type : String },
    stock  : { type : Boolean, default : true },
    promocion : {
        type : Schema.Types.ObjectId,
        ref : 'Category',
        required : false
    },  
});

ProductSchema.methods.toJSON = function(){
    const { __v, state, ...data } = this.toObject();
    return data
}

module.exports =  model("Producto", ProductSchema);