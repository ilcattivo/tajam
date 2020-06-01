const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server); // для обменна данными в реальном времени

const PORT = 3000;

const connections = []; // список присоединенных пользователей

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

// корневая страница
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/src/index.html');
});

// для возможности подключения ресурсов
app.use(express.static(__dirname + '/src'));

// добавление и удаление присоединенных пользователей
io.sockets.on('connection', (socket) => {
  connections.push(socket);

  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
  });

  // вернуть клиенту присланное сообщение
  socket.on('send msg', (req) => {
    io.sockets.emit('add msg', {
      msg: req.msg,
    });
  });
});
