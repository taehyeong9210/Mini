const socket = io();

const welcome = document.getElementById('welcome');
const form = document.querySelector('form');
const room = document.getElementById('room');
const nameform = welcome.querySelector('#name');

room.hidden = true;

let roomName;

function handleRoomSubmit(e) {
  e.preventDefault();
  const input = form.querySelector('input');
  socket.emit('enter_room', input.value, showRoom);
  roomName = input.value;
  input.value = '';
}

function addMessage(message) {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(e) {
  e.preventDefault();
  const input = room.querySelector('#msg input');
  socket.emit('new_message', input.value, roomName, () => {
    addMessage(`You : ${input.value}`);
    input.value = '';
  });
}

function handleNickSubmit(e) {
  e.preventDefault();
  const input = welcome.querySelector('#name input');
  socket.emit('nickname', input.value);
  input.value = '';
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector('h3');
  h3.innerText = `Room Name: ${roomName}`;
  const msgform = room.querySelector('#msg');
  msgform.addEventListener('submit', handleMessageSubmit);
}
nameform.addEventListener('submit', handleNickSubmit);
form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', (user, newCount) => {
  addMessage(`${user} arrived`);
  const h3 = room.querySelector('h3');
  h3.innerText = `Room Name: ${roomName} (${newCount})`;
});

socket.on('bye', (left, newCount) => {
  addMessage(`${left} Left;;`);
  const h3 = room.querySelector('h3');
  h3.innerText = `Room Name: ${roomName} (${newCount})`;
});

socket.on('new_message', addMessage);

socket.on('room_change', (rooms) => {
  const roomList = welcome.querySelector('ul');
  if (rooms.length === 0) {
    roomList.innerHTML = '';
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement('li');
    li.innerText = room;
    roomList.append(li);
  });
});
