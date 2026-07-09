import { auth, db } from "./firebase-config.js";

import {
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const saveBtn = document.getElementById("saveBtn");
const phoneList = document.getElementById("phoneList");
const logoutBtn = document.getElementById("logoutBtn");

async function loadPhones() {
  phoneList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "phones"));

  snapshot.forEach((phoneDoc) => {
    const phone = phoneDoc.data();

    phoneList.innerHTML += `
      <div style="border:1px solid #444;padding:10px;margin:10px 0;border-radius:8px;">
        <h3>${phone.phone}</h3>
        <p>General: ${phone.general}</p>
        <p>Red Dot: ${phone.redDot}</p>
        <p>2× Scope: ${phone.scope2x}</p>
        <p>4× Scope: ${phone.scope4x}</p>
        <p>Sniper: ${phone.sniper}</p>
        <p>Free Look: ${phone.freeLook}</p>

        <button onclick="deletePhone('${phoneDoc.id}')">
          🗑 Delete
        </button>
      </div>
    `;
  });
}

window.deletePhone = async (id) => {
  if (!confirm("Delete this phone?")) return;

  await deleteDoc(doc(db, "phones", id));
  loadPhones();
};

saveBtn.addEventListener("click", async () => {
  try {
    await addDoc(collection(db, "phones"), {
      phone: document.getElementById("phone").value.trim().toLowerCase(),
      general: Number(document.getElementById("general").value),
      redDot: Number(document.getElementById("redDot").value),
      scope2x: Number(document.getElementById("scope2x").value),
      scope4x: Number(document.getElementById("scope4x").value),
      sniper: Number(document.getElementById("sniper").value),
      freeLook: Number(document.getElementById("freeLook").value)
    });

    alert("✅ Phone Saved!");

    document.getElementById("phone").value = "";
    document.getElementById("general").value = "";
    document.getElementById("redDot").value = "";
    document.getElementById("scope2x").value = "";
    document.getElementById("scope4x").value = "";
    document.getElementById("sniper").value = "";
    document.getElementById("freeLook").value = "";

    loadPhones();

  } catch (error) {
    alert(error.message);
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

loadPhones();
