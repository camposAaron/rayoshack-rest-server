import {Schema, model } from 'mongoose';

interface categoria {
    nombre:String,
    estado: Boolean
}

const CategorySchema = new Schema<categoria>({
    nombre : {
        type : String,
        required : [true, 'El nombre de la categoria es obligatorio'],
        unique: true
    },
    estado : {
        type : Boolean,
        default : true,
        required : true
    }

});

CategorySchema.methods.toJSON = function() {
    const { __v, estado , ...data } = this.toObject();
    return data;  
}


export default model("Categoria", CategorySchema);