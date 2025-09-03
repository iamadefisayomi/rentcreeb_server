import { Server } from 'socket.io';
import { isDev } from './constant';

const onlineUsers = new Map<string, string>(); // userId -> socketId

export function setupSocket(io: Server) {
  io.on('connection', (socket) => {
    isDev && console.log('A user connected', socket.id);

    socket.on('joinChat', ({ chatId, userId }) => {
      socket.join(chatId);
      isDev && console.log(`User ${userId} with socket ${socket.id} joined chat ${chatId}`);

      // Mark user as online
      if (userId) {
        onlineUsers.set(userId, socket.id);
        // Broadcast to others (optional)
        io.emit('userStatus', { userId, status: 'online' });
      }
    });

    socket.on('userTyping', ({ chatId, user }) => {
      socket.to(chatId).emit('userTyping', { chatId, user });
    });

    socket.on('sendMessage', ({ chatId, message }) => {
      io.to(chatId).emit('newMessage', message);
    });

    socket.on('messageSeen', ({ chatId, userId }) => {
      socket.to(chatId).emit('messageSeen', { chatId, userId });
    });

    socket.on('disconnect', () => {
      isDev && console.log('User disconnected', socket.id);

      // Remove user from onlineUsers
      for (const [userId, sId] of onlineUsers.entries()) {
        if (sId === socket.id) {
          onlineUsers.delete(userId);
          io.emit('userStatus', { userId, status: 'offline' });
          break;
        }
      }
    });
  });
}
