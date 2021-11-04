const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = 4001;
const index = require("../routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
    console.log("New client connected");
    console.log("Total users logged: " + io.engine.clientsCount);

    io.emit('chat message', socket.id, 'login', '');
    io.emit('users count', io.engine.clientsCount);

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        console.log("Total users logged: " + io.engine.clientsCount);

        io.emit('chat message', socket.id, 'logout', '');
        io.emit('users count', io.engine.clientsCount);
    });

    socket.on("chat message", (message) => {
        io.emit('chat message', socket.id, 'chat', message);
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));