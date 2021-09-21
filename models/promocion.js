const {Schema, model } = require('mongoose');

const PromocionSchema = Schema({
    titulo : {
        type : String,
        required : true,
    },
    banner : String,
    descuento : Number,
    fechaInicio : {
        type : Number,
        required : true
    },
    fechaFinal : Number,
});

PromocionSchema.methods.toJSON = function(){
    const { __v, state, ...data } = this.toObject();
    return data
}

module.exports =  model("Promocion", PromocionSchema);