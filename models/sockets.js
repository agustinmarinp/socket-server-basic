class Sockets {

    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {

        // On connection
        this.io.on('connection', (socket) => {

            // escuchar mensaje del cliente
            socket.on('mensajeCliente', (data) => {
                console.log(data);
                this.io.emit('mensajeServer', data);
            }
            );
        });
    }
}

module.exports = Sockets;