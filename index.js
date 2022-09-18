const app = require('./app');
const socketIO = require("socket.io");
const logger = require("./utils/logger");
const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
    console.log(`Server listening to http://localhost:${port}`)
);

const io = socketIO(server);

let clients = 0;

io.on("connection", (socket) => {
    clients++;

    io.to(socket.id).emit('private', `your secret code is ${socket.id}`);

    socket.emit('newClientConnect', { description: 'Hey, socket work fine!'} );
    socket.broadcast.emit('newClientConnect',{ description: clients + ` Clients connected!`})

    socket.on('newMessage', msg => {
        logger.d(`New message : ${JSON.stringify(msg)}`)
        io.emit('incomingMessage', { message: msg } );
    });

    socket.on('disconnect', function () {
        clients--;
        socket.broadcast.emit('newClientConnect',{ description: clients + ` Clients connected!`})
    });
});