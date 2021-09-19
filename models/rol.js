const { Schema, model } = require('mongoose');

const SchemaRole =  Schema({
    rol : {
        type : String,
        required : [true, 'El rol es obligatorio']
    }
})

module.exports = model("Rol", SchemaRole);