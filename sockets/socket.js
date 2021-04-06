const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Imagine Dragons'));
bands.addBand(new Band('Switchfoot'));
bands.addBand(new Band('For Today'));
bands.addBand(new Band('Coldplay'));
bands.addBand(new Band('The Devil Wears Prada'));
// console.log(bands);

// .on es para escuchar
// .emit es para emitir
// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    // Emitiendole todas las bandas al cliente que se conecte
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    });

    client.on('mensaje', (paylod) => {
        console.log('Mensaje', paylod);

        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });

    // client.on('emitir-mensaje', (payload) => {
    //     // console.log(payload);
    //     // Emitiendo a todos
    //     // io.emit('nuevo-mensaje', payload);
    //     //Emitiendo a todos menos al cliente que lo emite 
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
        // console.log(payload);
    });

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

});