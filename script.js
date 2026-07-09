import { db } from "./firebase-config.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");

async function searchPhone() {
  const phoneName = searchInput.value.trim().toLowerCase();

  const snapshot = await getDocs(collection(db, "phones"));

  let found = false;

  snapshot.forEach((doc) => {
    const phone = doc.data();

    if (phone.phone === phoneName) {
      found = true;

      result.innerHTML = `
        <h2>${phone.phone.toUpperCase()}</h2>

        <p>🎯 General: <strong>${phone.general}</strong></p>
        <p>🔴 Red Dot: <strong>${phone.redDot}</strong></p>
        <p>🔍 2× Scope: <strong>${phone.scope2x}</strong></p>
        <p>🎯 4× Scope: <strong>${phone.scope4x}</strong></p>
        <p>🎯 Sniper: <strong>${phone.sniper}</strong></p>
        <p>👀 Free Look: <strong>${phone.freeLook}</strong></p>
      `;
    }
  });

  if (!found) {
    result.innerHTML = `
      <h2>Phone Not Found</h2>
      <p>This phone hasn't been added yet.</p>
    `;
  }
}

searchBtn.addEventListener("click", searchPhone);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchPhone();
  }
});