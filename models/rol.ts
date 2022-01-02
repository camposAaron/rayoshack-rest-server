import {model, Schema} from 'mongoose';

interface Rol{
    rolName: String;
    estado: Boolean;
}

const SchemaRole = new Schema<Rol>({
    rolName : {
        type : String,
        required : [true, 'El rol es obligatorio']
    },
    estado : { type : Boolean, required : true, default : true}
});

SchemaRole.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data
}
export default model("Rol", SchemaRole);