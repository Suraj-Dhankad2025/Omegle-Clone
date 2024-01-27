import { Socket } from "socket.io";
import http from "http";

import express  from 'express';
import { Server } from 'socket.io';
import {UserManager} from "./managers/UserManger";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});
const usersManager = new UserManager();

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  usersManager.addUser("randomName",socket);
  
  socket.on('chat-message', (message: string) => {
    io.emit('chat-message', { id: socket.id, message });
  });

  socket.on('disconnect', () => {
    usersManager.removeUser(socket.id);
  });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
  });