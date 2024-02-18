const { log } = require('console');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Foylanuvchi bog`landi:', socket.id);

  // Foylanuvchi bog`landi deb xabarni barcha foylanuvchilarga yuborish
  io.emit('message', 'Foylanuvchi bog`landi');

  // O'yin yaratish
  socket.on('createGame', () => {
    const gameId = generateGameId();
    socket.join(gameId);
    socket.emit('gameCreated', gameId);
  });

  // Foylanuvchilar qo`shilganda
  socket.on('joinGame', (gameId) => {
    const room = io.sockets.adapter.rooms.get(gameId);
    if (room && room.size < 2) {
      socket.join(gameId);
      io.to(gameId).emit('playerJoined', socket.id);
    } else {
      socket.emit('errorMessage', 'O`yin to`ldi, boshqa o`yin yaratish');
    }
  });
});

function generateGameId() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server ishga tushdi: http://localhost:${PORT}`);
});
