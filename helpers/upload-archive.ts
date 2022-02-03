import { v4 as uuidv4 } from 'uuid';

import path from 'path';
import fs from 'fs';


const uploadArchive = (files: any, validExtensions: Array<string>, folder: string, imagenes: string[]) => {
  return new Promise<string[]>((resolve, reject) => {
    const { archivos } = files;
   
    for (let archivo of archivos) {
    
      /*Validar extension */
      const nameSplit = archivo.name.split('.');
      const extension = nameSplit[nameSplit.length - 1];


      if (!validExtensions.includes(extension)) {
        reject(`La extension '${extension}' no es permitida, ${validExtensions}`);
      }

      const temporalName = uuidv4() + '.' + extension;
      const rutaDeCarga = path.join(__dirname, '../../public/uploads/products', folder, temporalName);


      archivo.mv(rutaDeCarga, (err: Error) => {
        if (err) {
          reject(err);
        }
      });

      imagenes.push(temporalName);

      resolve(imagenes);
    }

  });
}

const deleteArchives = (folderName: string) => {
  const carpetaRemover = path.join(__dirname, '../../public/uploads/products', folderName);

  fs.readdir(carpetaRemover, (err, files) => {

    if(!files){
      return ;
    }

    const unlinkPromises = files.map(file => {
      const filePath = path.join(carpetaRemover, file);
      return fs.unlink(filePath, (err) => {  });
    });

    if (err) {
      return `Algo salio mal al borrar los ficheros del directorio: ${carpetaRemover}`
    }

    return Promise.all(unlinkPromises);
  });
}

export { uploadArchive, deleteArchives }