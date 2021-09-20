const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            auth :       '/api/auth',
            // find :       '/api/find',
            users :      '/api/usuarios',
            direcciones : '/api/direcciones',
            // products:     '/api/product',
            categorias : '/api/categorias',
            // uploads :    '/api/uploads'
        }
        
        
        //Conectar a base de datos
        this.connectDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());
        //lectura y parseo a json
        this.app.use(express.json());
        //Servir carpeta pública
        this.app.use( express.static('public'));

        //fileupload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));
    }

    routes(){
        this.app.use(this.path.auth, require('../routes/auth'));
        // this.app.use(this.path.find, require('../routes/find'));
        this.app.use(this.path.users, require('../routes/usuario'));
        // this.app.use(this.path.products, require('../routes/product'));
        this.app.use(this.path.categorias, require('../routes/categoria'));
        // this.app.use(this.path.uploads, require('../routes/upload'));
        this.app.use(this.path.direcciones, require('../routes/direccion'));
    
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Escuchando en el puerto: ', this.port);
        });        
    }


}

module.exports =  Server;