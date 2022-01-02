import {Schema, model, Types } from 'mongoose';

export interface Usuario{
        nombre : String;
        email: String;
        password: String;
        img: String;
        rol: String;
        estado: Boolean;
        google: Boolean;
        direccion: String;
}

const UserSchema = new Schema<Usuario>({
    nombre: {
        type:  String,
        required: [true, 'El nombre es requerido']
    },
    email : {
        type: String,
        required : [true, 'El correo es requerido'],
        unique: true
    },
    password : {
        type: String,
        required: [true, 'La contraseña es requerida'],
    },
    img : {
        type: String,
    },
    rol : {
        type : String,
        required: true,
        default: 'USER_ROLE',
        emun : ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado : {
        type: Boolean,
        default : true
    },
    google:{
        type: Boolean,
        default : false
    },
    direccion : {
        type :  Schema.Types.ObjectId,
        ref : 'Direccion',
        required : false
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;  
}

export default model('Usuario', UserSchema);