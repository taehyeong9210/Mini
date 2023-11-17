// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Change here
import { getFirestore } from 'firebase/firestore'; // Change here
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBIRauSVYJZKOzXuyOa7mgqCjT2zF_vLWI',
  authDomain: 'twitter-clone-c06cc.firebaseapp.com',
  projectId: 'twitter-clone-c06cc',
  storageBucket: 'twitter-clone-c06cc.appspot.com',
  messagingSenderId: '197304600155',
  appId: '1:197304600155:web:e68110c215d0979b8b217e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
