const socket = io();

const myFace = document.getElementById('myFace');
const muteBtn = document.getElementById('mute');
const cameraBtn = document.getElementById('camera');

let myStream;
let muted = false;
let cameraOff = false;

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    myFace.srcObject = myStream;
  } catch (e) {
    console.log(e);
  }
}

getMedia();

const handlebuttonBtn = () => {
  if (!muted) {
    muteBtn.innerText = 'Unmute';
    muted = true;
  } else {
    muteBtn.innerText = 'Mute';
    muted = false;
  }
};
const handlecameraBtn = () => {
  if (!cameraOff) {
    cameraBtn.innerText = 'Camera Off';
    cameraOff = true;
  } else {
    cameraBtn.innerText = 'Camera On';
    cameraOff = false;
  }
};

muteBtn.addEventListener('click', handlebuttonBtn);
cameraBtn.addEventListener('click', handlecameraBtn);
