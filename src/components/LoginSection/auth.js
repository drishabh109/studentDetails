import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgbVHQfLOT0-JZD_pdzOZTohqLfsOP8jg",
  authDomain: "login-880bb.firebaseapp.com",
  projectId: "login-880bb",
  storageBucket: "login-880bb.appspot.com",
  messagingSenderId: "983346445551",
  appId: "1:983346445551:web:32715f1f0dccd430f2ef1a",
  measurementId: "G-HZ481L7J2M",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
