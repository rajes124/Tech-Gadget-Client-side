import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ auth import
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDzxCVSYPRym0eLHaMPYD7eVYHpBUEPC1c",
  authDomain: "tech-gadget-417a4.firebaseapp.com",
  projectId: "tech-gadget-417a4",
  storageBucket: "tech-gadget-417a4.firebasestorage.app",
  messagingSenderId: "675303645919",
  appId: "1:675303645919:web:838e9e9133e9096f17bf6a",
  measurementId: "G-N8XTW8M5XB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export auth
export const auth = getAuth(app);
