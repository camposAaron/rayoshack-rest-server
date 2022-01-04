import {model, Schema} from 'mongoose';

interface Rol{
    rol: String;
}

const SchemaRole = new Schema<Rol>({
    rol : {
        type : String,
        required : [true, 'El rol es obligatorio']
    }
});

SchemaRole.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data
}
export default model("Rol", SchemaRole);