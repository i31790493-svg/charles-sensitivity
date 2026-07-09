import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const saveBtn = document.getElementById("saveBtn");
const phoneList = document.getElementById("phoneList");

async function loadPhones() {
  phoneList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "phones"));

  querySnapshot.forEach((phone) => {
    const data = phone.data();

    phoneList.innerHTML += `
      <div style="border:1px solid #444;padding:10px;margin:10px 0;">
        <h3>${data.phone}</h3>
        <p>General: ${data.general}</p>
        <p>Red Dot: ${data.redDot}</p>
        <p>2× Scope: ${data.scope2x}</p>
        <p>4× Scope: ${data.scope4x}</p>
        <p>Sniper: ${data.sniper}</p>
        <p>Free Look: ${data.freeLook}</p>

        <button onclick="deletePhone('${phone.id}')">
          🗑 Delete
        </button>
      </div>
    `;
  });
}

window.deletePhone = async (id) => {
  await deleteDoc(doc(db, "phones", id));
  loadPhones();
};

saveBtn.addEventListener("click", async () => {

  await addDoc(collection(db, "phones"), {
    phone: document.getElementById("phone").value.toLowerCase(),
    general: Number(document.getElementById("general").value),
    redDot: Number(document.getElementById("redDot").value),
    scope2x: Number(document.getElementById("scope2x").value),
    scope4x: Number(document.getElementById("scope4x").value),
    sniper: Number(document.getElementById("sniper").value),
    freeLook: Number(document.getElementById("freeLook").value)
  });

  alert("✅ Phone Saved!");

  loadPhones();
});

loadPhones();