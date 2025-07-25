import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { setupSocket } from './socket';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://your-frontend.onrender.com"],
    credentials: true,
  },
});

setupSocket(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
