// SERVIDOR DE EXPRESS
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // HTTP SERVER
        this.server = http.createServer(this.app);

        // CONFIGURACIÓN DE SOCKET SERVER
        this.io = socketio(this.server, {/* configuraciones */ });
    }

    middlewares() {

        // DESPLEGAR EL DIRECTORIO PÚBLICO
        this.app.use(express.static(path.resolve(__dirname, '../public')));

    }

    configurarSockets() {
        new Sockets(this.io);
    }


    execute() {
        // INICIALIZAR MIDDLEWARES
        this.middlewares();

        // INICIALIZAR SERVER
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port);
        });

        // INICIALIZAR SOCKETS
        this.configurarSockets();

    }
}

module.exports = Server;