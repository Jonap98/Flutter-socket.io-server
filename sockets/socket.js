const { io } = require('../index');

// .on es para escuchar
// .emit es para emitir
// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    });

    client.on('mensaje', (paylod) => {
        console.log('Mensaje', paylod);

        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });

});