import { Server } from 'socket.io';

export function setupSocket(io: Server) {
  io.on('connection', (socket) => {
    console.log(` User connected: ${socket.id}`);

    socket.on('send_message', (message) => {
      console.log(" Message received:", message);
      socket.broadcast.emit('receive_message', message);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
