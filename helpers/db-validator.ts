
import { Usuario, Categoria, Producto, Rol, Promocion } from '../models/index';

export default class dbValidator {

    constructor(){    
    }

    //verificar si el rol es valido
 
   isRoleValid = async (rol: String) => {
        const existRole = await Rol.findOne({ rol });
        console.log(existRole);
        if (!existRole) {
            throw new Error(`El rol ${rol} no existe en la BD`);
        }
    }

    //Verificar si el correo existe
    existsEmail = async (email: String) => {
        const emailfound = await Usuario.findOne({ email });
        if (emailfound) {
            throw new Error(`El correo ya esta registrado`);
        }
    }

    //Verificar si el id del usuario existe
    existsId = async (id: String) => {
        const idFound = await Usuario.findById(id);
        if (!idFound) {
            throw new Error(`El id ${id} no existe`);
        }
    }

    existsCategoryId = async (id: String) => {
        const idfound = await Categoria.findById(id);

        if (!idfound) {
            throw new Error(`El id: ${id} no existe`);
        }

    }

    existsProduct = async (id: String) => {


        const idFound = await Producto.findById(id);

        if (!idFound.estado) {
            throw new Error(`id no encontrado -state: false`);
        }

        if (!idFound) {
            throw new Error(`el id: ${id} no existe`);
        }
    }

    existsPromocion = async (id: String) => {
        const idFound = await Promocion.findById(id);

        if (!idFound.estado) {
            throw new Error(`id no encontrado -state: false`);
        }

        if (!idFound) {
            throw new Error(`el id: ${id} no existe`);
        }
    }

}


// /**
//  * validar colecciones
//  * @param {la coleccion de la imagen } collection 
//  * @param {las colecciones permitidas} colecctions 
//  */
// const validateCollections = (collection = '', collections: [String]) => {

//     const include = collections.includes(collection);
//     if (!include) {
//         throw new Error(`La coleccion ${collection} no es permitida`);
//     }

//     return true
// }

// //Validar departamento.
// const validateDepartment = (department: String, validDepartments: String[]) => {
//     if (!validDepartments.includes(department)) {
//         throw new Error(`No hay envio al departamento de: ${department}`);
//     }

//     return true
// }

