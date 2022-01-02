import {  v4 as uuidv4 } from 'uuid';

import path from 'path';

export const uploadArchive = (files:any, validExtensions = ['jpg', 'png', 'jpeg','gif'], folder = '') => {
  return new Promise((resolve, reject) => {

    /*Validar extension */
    const { archivo } = files;
    const nameSplit = archivo.name.split('.');
    const extension = nameSplit[ nameSplit.length - 1 ];

    if(!validExtensions.includes(extension)){
         reject(`La extension '${extension}' no es permitida, ${validExtensions}`);
    }

    const temporalName = uuidv4()+'.'+extension;

    const rutaDeCarga = path.join(__dirname , '../uploads/', folder , temporalName);

    archivo.mv(rutaDeCarga, (err: Error) => {
        if (err) {
           reject(err);
        }

         resolve(temporalName);
    });

  });    
}
