const socket = io();

const myFace = document.getElementById('myFace');
const muteBtn = document.getElementById('mute');
const cameraBtn = document.getElementById('camera');
const camerasSelect = document.getElementById('cameras');

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement('option');
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label == camera.label) {
        option.selected = true;
      }
      camerasSelect.append(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  const initialConstrains = {
    audio: true,
    video: { facingMode: 'user' },
  };
  const cameraConstains = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstains : initialConstrains,
    );
    myFace.srcObject = myStream;
    if (!deviceId) {
      await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
}

const handlebuttonBtn = () => {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = 'Unmute';
    muted = true;
  } else {
    muteBtn.innerText = 'Mute';
    muted = false;
  }
};
const handlecameraBtn = () => {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!cameraOff) {
    cameraBtn.innerText = 'Camera Off';
    cameraOff = true;
  } else {
    cameraBtn.innerText = 'Camera On';
    cameraOff = false;
  }
};

async function handleCameraChange() {
  await getMedia(camerasSelect.value);
  if (myPeerConnection) {
    const videoSender = myPeerConnection
      .getSenders()
      .find((sender) => sender.track.kind === 'video');
  }
}

muteBtn.addEventListener('click', handlebuttonBtn);
cameraBtn.addEventListener('click', handlecameraBtn);
camerasSelect.addEventListener('input', handleCameraChange);

// welcome  Form

const welcome = document.getElementById('welcome');
const call = document.getElementById('call');
const welcomeForm = welcome.querySelector('form');

call.hidden = true;

async function initCall() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
}

async function handleWelcomeSubmit(e) {
  e.preventDefault();
  const input = welcomeForm.querySelector('input');
  await initCall();
  socket.emit('join_room', input.value);
  roomName = input.value;
  input.value = '';
}

welcomeForm.addEventListener('submit', handleWelcomeSubmit);

socket.on('welcome', async () => {
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);

  socket.emit('offer', offer, roomName);
});

socket.on('offer', async (offer) => {
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit('answer', answer, roomName);
});

socket.on('answer', (answer) => {
  myPeerConnection.setRemoteDescription(answer);
});

socket.on('ice', (ice) => {
  myPeerConnection.addIceCandidate(ice);
});

// RTC 코드

function makeConnection() {
  myPeerConnection = new RTCPeerConnection();
  myPeerConnection.addEventListener('icecandidate', handleIce);
  myPeerConnection.addEventListener('addstream', handleAddStream);
  console.log(
    myStream
      .getTracks()
      .forEach((track) => myPeerConnection.addTrack(track, myStream)),
  );
}

function handleIce(data) {
  socket.emit('ice', data.candidate, roomName);
}
function handleAddStream(data) {
  const peerFace = document.getElementById('peerFace');
  peerFace.srcObject = data.stream;
}
