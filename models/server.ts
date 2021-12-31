import express, { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dbConnection from '../database/config';
import http, { Server } from 'http';

import {socketController} from '../sockets/socket.controller';
import socketIO from 'socket.io';


class myServer {
    private app: Application;
    private port: String;
    private server: Server;
    private  io: socketIO.Server;
   


    private apiPaths = {
        auth: '/api/auth',
        categorias: '/api/categorias',
        carrito: '/api/carrito',
        direcciones: '/api/direcciones',
        inventario: '/api/inventario',
        // find :       '/api/find',
        promociones: '/api/promociones',
        productos: '/api/productos',
        users: '/api/usuarios'
        // uploads :    '/api/uploads'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.server = http.createServer(this.app);
        this.io = new socketIO.Server(this.server);
        
        //Middlewares
        this.middlewares();
        
        //Rutas de mi aplicacion
        this.routes();
        
        //Conectar a base de datos
        this.connectDB();

        //eventos de socket
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());
        //lectura y parseo a json
        this.app.use(express.json());
        //Servir carpeta pública
        this.app.use(express.static('public'));

        //fileupload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        // this.app.use(this.apiPaths.categorias, require('../routes/categoria'));
        // this.app.use(this.apiPaths.auth, require('../routes/auth'));
        // this.app.use(this.apiPaths.direcciones, require('../routes/direccion'));
        // // this.app.use(this.path.find, require('../routes/find'));
        // this.app.use(this.apiPaths.inventario, require('../routes/inventario'));
        // this.app.use(this.apiPaths.promociones, require('../routes/promocion'));
        // this.app.use(this.apiPaths.productos, require('../routes/Producto'));
        // // this.app.use(this.path.uploads, require('../routes/upload'));
        // this.app.use(this.apiPaths.users, require('../routes/usuario'));
        // this.app.use(this.apiPaths.carrito, require('../routes/carrito'));

    }

    sockets(){
        this.io.on('conecction', ( socket )=> socketController(socket));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Escuchando en el puerto: ', this.port);
        });
    }

}

export default myServer;