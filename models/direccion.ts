import {Schema, model } from 'mongoose';

interface Direccion{
    departamento: string;
    direccion: string;
    telefono: string;
    estado: string;
}

const DireccionSchema = new Schema<Direccion>({
    departamento : {
        type : String,
        required : true
    },
    direccion : {
        type : String,
        required : true
    },
    telefono : {
        type : String,
        required : true
    },
    estado : {
        type : Boolean,
        default : true,
        required : true
    }
});

DireccionSchema.methods.toJSON = function() {
    const { __v, estado , ...data } = this.toObject();
    return data;  
}

export default model("Direccion", DireccionSchema);