import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAEnkg6XZPI_bvq9jUmqjm4V-vKNCcXdns",
  authDomain: "twitterclone-8fbe1.firebaseapp.com",
  projectId: "twitterclone-8fbe1",
  storageBucket: "twitterclone-8fbe1.appspot.com",
  messagingSenderId: "407690199615",
  appId: "1:407690199615:web:587b52b7e03f5d3330ee8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);