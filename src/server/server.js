const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = 4001;
const index = require("../routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

let roomsCount = 1;

io.on("connection", (socket) => {
    let roomId = "room" + roomsCount;

    socket.join(roomId);

    io.to(roomId).emit('chat message', socket.id, 'login', '')
    io.to(roomId).emit('room config', io.engine.clientsCount, roomId);

    console.log("New client connected");
    console.log("Total users logged: " + io.engine.clientsCount);

    socket.on('disconnecting', function() {
        let rooms = socket.rooms;
    
        rooms.forEach(function(roomId) {
            io.to(roomId).emit('chat message', socket.id, 'logout', '');
            io.to(roomId).emit('room config', io.engine.clientsCount, roomId);
        });
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        console.log("Total users logged: " + io.engine.clientsCount);
    });

    socket.on("chat message", (roomId, message) => {
        io.to(roomId).emit('chat message', socket.id, 'chat', message);
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));