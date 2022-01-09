import express, { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dbConnection from '../database/config';
import http, { Server } from 'http';

import {socketController} from '../sockets/socket.controller';
import socketIO from 'socket.io';

import { categoriaRouter, userRouter,
     direccionRouter, authRouter, promocionRouter, productoRouter, carritoRouter } from '../routes';

class myServer {
    private app: Application;
    private port: String;
    private server: Server ;
    private  io: socketIO.Server;
   
    private apiPaths = {
        auth: '/api/auth',
        categorias: '/api/categoria',
        carrito: '/api/carrito',
        direcciones: '/api/direccion',
        // find :       '/api/find',
        promociones:'/api/promocion',
        productos: '/api/producto',
        users: '/api/usuario',
        uploads :    '/api/upload'
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
        this.sockets();
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
        this.app.use(this.apiPaths.auth,  authRouter);
        this.app.use(this.apiPaths.categorias, categoriaRouter);
        this.app.use(this.apiPaths.direcciones, direccionRouter);
        this.app.use(this.apiPaths.users, userRouter);
        this.app.use(this.apiPaths.promociones, promocionRouter)
        this.app.use(this.apiPaths.productos, productoRouter);
        this.app.use(this.apiPaths.carrito, carritoRouter);
        this.app.use(this.apiPaths.uploads, require('../routes/upload'));
        // // this.app.use(this.path.find, require('../routes/find'));
        // this.app.use(this.apiPaths.inventario, require('../routes/inventario'));
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