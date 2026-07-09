import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

loginBtn.addEventListener("click", async () => {

  const email = "peacepearl2011@gmail.com";
  const password = document.getElementById("password").value;

  if (!password) {
    message.style.color = "red";
    message.textContent = "Please enter your password.";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    message.style.color = "green";
    message.textContent = "✅ Login successful!";

    setTimeout(() => {
      window.location.href = "admin.html";
    }, 1000);

  } catch (error) {
    message.style.color = "red";
    message.textContent = "❌ Incorrect password.";
  }

});
