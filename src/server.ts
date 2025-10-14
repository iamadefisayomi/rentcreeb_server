import {config} from 'dotenv'
config()
// 
import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { setupSocket } from './socket';
import { isDev } from './constant';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://www.rentcreeb.com", "https://rentcreeb.com"],
    credentials: true,
  },
});

setupSocket(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  isDev && console.log(`Server is running on port ${PORT}`);
});
