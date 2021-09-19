const { Schema, model } = require('mongoose');

const DireccionSchema = Schema({
    departamento : {
        type : String,
        required : true, //un enum !!!
        unique: true
    },
    direccion : {
        type : String,
        required : true
    },
    telefono : {
        type : String,
        required : true
    },
    state : {
        type : Boolean,
        default : true,
        required : true
    },
});

DireccionSchema.methods.toJSON = function() {
    const { __v, state , ...data } = this.toObject();
    return data;  
}

module.exports = model("Direccion", DireccionSchema);