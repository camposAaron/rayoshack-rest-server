const {Schema, model } = require('mongoose');

const PromocionSchema = Schema({
    titulo : {
        type : String,
        required : true,
    },
    banner : String,
    descuento : Number,
    fechaInicio : {
        type : Date,
        required : true,
        default : new Date()
    },
    fechaFinal : {
        type : Date,
        required : true
    },
    estado : {
        type : Boolean,
        required : true,
        default : true
    }
});

PromocionSchema.methods.toJSON = function(){
    const { __v, state, ...data } = this.toObject();
    return data
}

module.exports =  model("Promocion", PromocionSchema);