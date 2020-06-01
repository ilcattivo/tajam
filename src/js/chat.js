const socket = io.connect(); // для обменна данными в реальном времени

const chat = document.getElementById('chat');
const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const messages = document.getElementById('messages');
const closeButton = document.getElementById('chat-close');
const messageUsButton = document.getElementById('message-us');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // отправка сообщения на сервер
  socket.emit('send msg', {
    msg: input.value,
  });

  input.value = ''; // очистка поля ввода после отправки
});
// отрисовать сообщение при его получении из сокета
socket.on('add msg', (res) => {
  const newMsg = document.createElement('div');
  newMsg.className = 'chat__message';
  newMsg.innerText = res.msg;

  messages.append(newMsg);
});

// переключить стили для отображения/скрытия формы
closeButton.addEventListener('click', () => {
  chat.classList.remove('active');
  messageUsButton.classList.add('active');
});

messageUsButton.addEventListener('click', () => {
  chat.classList.add('active');
  messageUsButton.classList.remove('active');
});
