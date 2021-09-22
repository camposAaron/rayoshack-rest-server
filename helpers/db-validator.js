
const { Usuario, Categoria, Producto, Rol, Promocion } = require('../models/index');

/**
 * departamentos validos para envio
 */


//verificar si el rol es valido
const isRoleValid = async (rol = '') => {
    const existRole = await Rol.findOne({ rol });
    console.log(existRole);
    if (!existRole) {
        throw new Error(`El rol ${rol} no existe en la BD`);
    }
}

//Verificar si el correo existe
const existsEmail = async (email = '') => {
    const emailfound = await Usuario.findOne({ email });
    if (emailfound) {
        throw new Error(`El correo ya esta registrado`);
    }
}

//Verificar si el id del usuario existe
const existsId = async (id) => {
    const idFound = await Usuario.findById(id);
    if (!idFound) {
        throw new Error(`El id ${id} no existe`);
    }
}

const existsCategoryId = async (id) => {
    const idfound = await Categoria.findById(id);

    if (!idfound) {
        throw new Error(`El id: ${id} no existe`);
    }

}

const existsProduct = async (id) => {
    const idFound = await Producto.findById(id);

    if (!idFound.estado) {
        throw new Error(`id no encontrado -state: false`);
    }

    if (!idFound) {
        throw new Error(`el id: ${id} no existe`);
    }
}

const existsPromocion = async(id) => {
    const idFound = await Promocion.findById(id);

    if (!idFound.estado) {
        throw new Error(`id no encontrado -state: false`);
    }

    if (!idFound) {
        throw new Error(`el id: ${id} no existe`);
    }
}

/**
 * validar colecciones
 * @param {la coleccion de la imagen } collection 
 * @param {las colecciones permitidas} colecctions 
 */
const validateCollections = (collection = '', collections = []) => {

    const include = collections.includes(collection);
    if (!include) {
        throw new Error(`La coleccion ${collection} no es permitida`);
    }

    return true
}

const validateDepartment = (department = '', validDepartments = []) => {
    if(!validDepartments.includes(department)){
        throw new Error(`No hay envio al departamento de: ${department}`);
    }

    return true
}


module.exports = {
    isRoleValid,
    existsEmail,
    existsId,
    existsCategoryId,
    existsProduct,
    existsPromocion,
    validateCollections,
    validateDepartment
}