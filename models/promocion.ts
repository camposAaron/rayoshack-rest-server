import { Schema, model } from 'mongoose';

export interface IPromocion {
    titulo : String;
    descripcion: String;
    banner: String;
    descuento: Number;
    fechaInicio: Date;
    fechaFinal: Date;
    estado: Boolean;
}

const PromocionSchema = new Schema<IPromocion>({
    titulo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true
    },
    banner: String,
    descuento: Number,
    fechaInicio: {
        type: Date,
        required: true,
        default: Date.now()
    },
    fechaFinal: {
        type: Date,
        required: true
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    }
});

PromocionSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data
}

export default model("Promocion", PromocionSchema);