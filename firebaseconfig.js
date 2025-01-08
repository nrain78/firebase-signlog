// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyDbXso3lqTUbMqGdAvfAOoQ1QSzEyMuL0g",
  authDomain: "form-authentication-3584b.firebaseapp.com",
  projectId: "form-authentication-3584b",
  storageBucket: "form-authentication-3584b.firebasestorage.app",
  messagingSenderId: "376645350884",
  appId: "1:376645350884:web:c248cb776e4cfe776a03f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up
function signUp(event) {
  event.preventDefault();
  // Get user input values
  const firstName = document.getElementById("firstname").value;
  const lastName = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const repeatPassword = document.getElementById("reppassword").value;
  // Validate Input Fields
  if (!email || !password || !repeatPassword) {
    alert("Please fill out all fields.");
    return;
  }
  if (password !== repeatPassword) {
    alert(`Password does'nt match.`);
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      // Get account creation date
      const creationTime = user.metadata.creationTime;
      console.log("User signed up successfully:", user);
      alert(
        `Welcome, ${firstName} ${lastName}! Your account has been created. ${creationTime}`
      );
      document.getElementById("firstname").value = "";
      document.getElementById("lastname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("reppassword").value = "";

      window.location.href = "./login.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error [${errorCode}]: ${errorMessage}`);
      alert(`Error: ${errorMessage}`);
    });
}
// Sign In
function signIn(event) {
  event.preventDefault();
  // Get user input values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  window.location.href = "./success.html"
  // Validate Input Fields
  if (!email || !password) {
    alert("Please fill out all fields.");
    return;
  }
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const creationTime = user.metadata.creationTime;
      console.log("User signed in successfully:", user);
      alert(
        `Welcome, You're signed in. ${creationTime}`
      );
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error [${errorCode}]: ${errorMessage}`);
      alert(`Error: ${errorMessage}`);
    });
}


document.addEventListener("DOMContentLoaded", function() {
    const signUpButton = document.getElementById("btn");
    const signInButton = document.getElementById("btn2");
  
    if (signUpButton) {
      signUpButton.addEventListener("click", signUp);
    }
  
    if (signInButton) {
      signInButton.addEventListener("click", signIn);
    }
});
  