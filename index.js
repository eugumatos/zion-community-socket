import express from 'express';
import http from 'http';
import cors from 'cors';

import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.use(cors());
app.use(express.json());

app.post('/update-post', (req, res) => {
  const { post } = req.body;

  io.emit('post-update', { post });

  res.json({ post });
});

io.on('connection', (socket) => {
  console.log('Client conected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client desconected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
