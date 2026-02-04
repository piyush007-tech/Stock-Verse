import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

/* 🔹 Firebase Config */
const firebaseConfig = {
  apiKey: "AIzaSyD-bxmgmOlfQrksi7oNBTk0Ex6qSuwZO68",
  authDomain: "stockverse-99104.firebaseapp.com",
  projectId: "stockverse-99104",
  storageBucket: "stockverse-99104.firebasestorage.app",
  messagingSenderId: "649558061192",
  appId: "1:649558061192:web:db63a49ec53f31adb6ef3d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ✅ WAIT FOR DOM */
document.addEventListener("DOMContentLoaded", () => {

  /* 🔹 DOM Elements */
  const title = document.getElementById("title");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const button = document.getElementById("loginBtn");
  const signupText = document.getElementById("signupText");
  const forgotPasswordText = document.getElementById("forgotPassword");

  let isLogin = true;

  /* 🔹 Toggle Login / Sign Up */
  function toggleForm() {
    isLogin = !isLogin;

    if (isLogin) {
      title.innerText = "Login";
      button.innerText = "Login";
      button.onclick = login;
    } else {
      title.innerText = "Sign Up";
      button.innerText = "Sign Up";
      button.onclick = signup;
    }
  }

  /* 🔹 Login */
  function login() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "main.html";
      })
      .catch(err => alert(err.message));
  }

  /* 🔹 Sign Up */
  function signup() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account created successfully 🎉");
        toggleForm();
      })
      .catch(err => alert(err.message));
  }

  /* 🔹 Forgot Password */
  function forgotPassword() {
    const email = emailInput.value.trim();

    if (!email) {
      alert("Please enter your email first");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent 📩");
      })
      .catch(err => alert(err.message));
  }

  /* 🔹 Attach Events */
  button.addEventListener("click", login);
  signupText.addEventListener("click", toggleForm);
  forgotPasswordText.addEventListener("click", forgotPassword);

  /* 🔹 Debug confirmation */
  console.log("✅ Login page JS loaded successfully");
});
