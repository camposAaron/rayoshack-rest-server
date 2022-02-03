import { model, Schema } from "mongoose";
import { Producto } from "./producto";

export interface Inventario {
    producto: Producto,
    transaccion: [Transaccion],
    cantidad: number
}

export interface Transaccion{
    fecha: Date,
    tipo: string,
    cantidad: number
}


const InventarioSchema = new Schema<Inventario>({
    producto : {
        type: Schema.Types.ObjectId,
        ref : 'Producto',
        required : true
    },
    transacciones : [{
        fecha : { type : Date, requere: true, default: new Date() },
        cantidad: { type: Number, require: true, default: 0},
        movimiento : { type: String, require: true }
    }],
    cantidad: { type: Number, required: true, default: 0},
    estado : { type: Boolean, required: true, default: true}
});

InventarioSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data
}

export default model("Inventario", InventarioSchema);
