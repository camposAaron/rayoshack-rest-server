import { Response, response } from "express";


import path from 'path';
import fs from 'fs';
import { archiveOp } from '../helpers';
import { Usuario, Producto } from '../models';

//ruta para imagen no encontrada.
const pathNotFoundImg = path.join(__dirname, '../assets/no-image.jpg');

const uploadImg = async (req: any, res: Response) => {

    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'usuarios':
            model = await Usuario.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El usuario con id : ${id} no existe`
                });
            }

            break;

        case 'productos':
            model = await Producto.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El producto con id : ${id} no existe`
                });
            }

            break;

        default:
            return res.status(500).json({
                msg: `la coleccion ${collection} no esta definida`
            });
            break;
    }

    try {

        if(collection === 'productos'){
            //borra archivos si los hay;
            archiveOp.deleteArchives(`${model.marca}-${model.modelo}`);
           //subir archivos al servidor
            const imagenes = await archiveOp.uploadArchive(req.files, ['jpg', 'png','jpeg'], `${model.marca}-${model.modelo}`, []);

            if(imagenes.length > 1){
                // //la primera imagen del arreglo corresponde a la portada.
                model.portada = imagenes.shift();
                // //el resto de imagenes se asigna a la galeria.
                model.galeria = imagenes;
                await model.save();
                res.json({
                    msg : `Imagenes subidas al servidor`
                });
            }else{
                // //la primera imagen del arreglo corresponde a la portada.
                model.galeria = [];
                model.portada = imagenes.pop();
                await model.save();
                res.json({
                    msg : `Imagen subida al servidor`
                });
            }
        }
    } catch (err) {
        res.status(505).json({ msg : `Error al cargar archivo al servidor` });
    }
}



/* Carga archivos al servidor */
const updateImg = async (req: any, res: Response) => {

    // const { collection, id } = req.params;

    // let model;

    // switch (collection) {
    //     case 'users':
    //         model = await Usuario.findById(id);
    //         if (!model) {
    //             return res.status(400).json({
    //                 msg: `El usuario con id : ${id} no existe`
    //             });
    //         }

    //         break;

    //     case 'products':
    //         model = await Producto.findById(id);
    //         if (!model) {
    //             return res.status(400).json({
    //                 msg: `El producto con id : ${id} no existe`
    //             });
    //         }

    //         break;

    //     default:
    //         return res.status(500).json({
    //             msg: `la coleccion ${collection} no esta definida`
    //         });
    //         break;
    // }

    // try {
    //     //verificar si existe imagen previa
    //     if (model.img) {
    //         const pathComplete = path.join(__dirname, '../uploads', collection, model.img);
    //         //verificar si la ruta existe para despues borrarla
    //         if (fs.existsSync(pathComplete))
    //             fs.unlinkSync(pathComplete);
    //     }

    //     const name = await uploadArchive(req.files, undefined, collection);
    //     model.img = name;

    //     await model.save();

    //     res.json({ model });

    // } catch (msg) {
    //     res.status(400).json({ msg });
    // }
}



export {
    uploadImg,
    updateImg
}