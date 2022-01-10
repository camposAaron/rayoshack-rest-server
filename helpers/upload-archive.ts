import { v4 as uuidv4 } from 'uuid';

import path from 'path';

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
      const rutaDeCarga = path.join(__dirname, '../../public/uploads', folder, temporalName);
      console.log(rutaDeCarga);


      archivo.mv(rutaDeCarga, (err: Error) => {
        if (err) {
          reject('xdxdd');
        }
      });

      imagenes.push(temporalName);
    }

    resolve(imagenes);
  });
}

export default uploadArchive 