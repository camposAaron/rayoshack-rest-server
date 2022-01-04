import myServer from './models/server';
import dotenv from 'dotenv';
dotenv.config();


const server = new myServer();

server.listen();


