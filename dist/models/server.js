"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const config_1 = __importDefault(require("../database/config"));
const http_1 = __importDefault(require("http"));
const socket_controller_1 = require("../sockets/socket.controller");
const socket_io_1 = __importDefault(require("socket.io"));
class myServer {
    constructor() {
        this.apiPaths = {
            auth: '/api/auth',
            categorias: '/api/categoria',
            carrito: '/api/carrito',
            direcciones: '/api/direccion',
            // find :       '/api/find',
            promociones: '/api/promocion',
            productos: '/api/producto',
            users: '/api/usuario'
            // uploads :    '/api/upload'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.default.Server(this.server);
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
        //Conectar a base de datos
        this.connectDB();
        //eventos de socket
        this.sockets();
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.default)();
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //lectura y parseo a json
        this.app.use(express_1.default.json());
        //Servir carpeta pública
        this.app.use(express_1.default.static('public'));
        //fileupload - carga de archivos
        this.app.use((0, express_fileupload_1.default)({
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
    sockets() {
        this.io.on('conecction', (socket) => (0, socket_controller_1.socketController)(socket));
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Escuchando en el puerto: ', this.port);
        });
    }
}
exports.default = myServer;
//# sourceMappingURL=server.js.map