const app = require('./app');
const socketIO = require("socket.io");
const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
    console.log(`Server listening to http://localhost:${port}`)
);

const io = socketIO(server);

let clients = 0;

io.on("connection", (socket) => {
    clients++;
    socket.emit('newClientConnect',{ description: 'Hey, socket work fine!'});
    socket.broadcast.emit('newClientConnect',{ description: clients + ` Clients connected!`})
    socket.on('disconnect', function () {
        clients--;
        socket.broadcast.emit('newClientConnect',{ description: clients + ` Clients connected!`})
    });
});