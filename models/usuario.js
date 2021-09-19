const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
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
        required: [true, 'A password is required'],
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

module.exports = model('Usuario', UserSchema);