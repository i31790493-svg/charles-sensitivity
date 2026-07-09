import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    message.textContent = "Please enter your email and password.";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    message.style.color = "green";
    message.textContent = "Login successful! Redirecting...";

    setTimeout(() => {
      window.location.href = "admin.html";
    }, 1000);

  } catch (error) {
    message.style.color = "red";
    message.textContent = "Invalid email or password.";
  }
});
