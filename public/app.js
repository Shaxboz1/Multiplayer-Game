// public/app.js
const socket = io();

socket.on('message', (message) => {
  console.log(message);
});

// O'yin yaratish tugmasi bosilganda
document.getElementById('createGame').addEventListener('click', () => {
  socket.emit('createGame');
});

// O'yin ga qo`shilish tugmasi bosilganda
document.getElementById('joinGame').addEventListener('click', () => {
  const gameId = prompt('O`yin ID-sini kiriting:');
  socket.emit('joinGame', gameId);
});

socket.on('gameCreated', (gameId) => {
  console.log(`O'yin yaratildi. ID: ${gameId}`);
});

socket.on('playerJoined', (playerId) => {
  console.log(`O'yinchi qo'shildi. ID: ${playerId}`);
});

socket.on('errorMessage', (message) => {
  alert(message);
});
