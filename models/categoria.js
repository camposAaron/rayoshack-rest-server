const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    nombre : {
        type : String,
        required : [true, 'El nombre de la categoria es obligatorio'],
        unique: true
    },
    estado : {
        type : Boolean,
        default : true,
        required : true
    },

});

CategorySchema.methods.toJSON = function() {
    const { __v, estado , ...data } = this.toObject();
    return data;  
}


module.exports = model("Categoria", CategorySchema);