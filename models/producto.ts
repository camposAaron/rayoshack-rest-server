import { Schema, model, Types } from 'mongoose';
import { Comentario } from './Comentario';


export interface Producto {
    nombre: String;
    marca: String;
    modelo: String;
    precio: Number;
    galeria: Types.Array<String>;
    portada: String;
    detalles: String;
    descripcion: String;
    categoria: Types.ObjectId;
    stock: Boolean;
    promocion: Types.ObjectId;
    comentario: Types.Array<Comentario>,
    calificacion: String,
    estado: Boolean;
}

const ProductSchema = new Schema<Producto>({
    nombre: { type: String, required: true },
    marca: { type: String, required: true },
    modelo: {
        type: String,
        required: true,
        unique: true
    },
    precio: { type: Number, default: 0 },
    galeria: { type: [String] },
    portada: { type: String },
    descripcion: { type: String },
    detalles: { type: String },
    descuento: { type: Number },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    stock: { type: Boolean, default: false },
    promocion: {
        type: Schema.Types.ObjectId,
        ref: 'Promocion',
        required: false
    },
    comentarios: [{
        type: Types.ObjectId,
        ref: 'Comentario'
    }],
    calificacion: { Type: Number },
    estado: {
        type: Boolean,
        required: true,
        default: true
    }
});

ProductSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data
}

export default model("Producto", ProductSchema);