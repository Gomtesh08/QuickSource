
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDsftB2OS2zfe9moESWpKMfh2HtrJZsIDo",
  authDomain: "quicksource6208.firebaseapp.com",
  projectId: "quicksource6208",
  storageBucket: "quicksource6208.appspot.com",
  messagingSenderId: "409526438327",
  appId: "1:409526438327:web:887623f7e46a23540b4032"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export default storage ;