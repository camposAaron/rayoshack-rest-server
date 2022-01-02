import { Schema, model, Types } from 'mongoose';

export interface Comentario{
    usuario : Types.ObjectId;
    fecha : Date;
    msg : String;
    calificacion: Number;
}

const ComentarioSchema = new Schema<Comentario>({
    usuario : {
        type: Types.ObjectId,
        ref : 'Usuario',
        required : true
    },
    fecha : {type: Date, required : true, default: Date.now()},
    msg : String,
    calificacion : Number
});

ComentarioSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data
}

export default model("Comentario", ComentarioSchema);