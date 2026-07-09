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

  if (phoneName === "") {
    result.innerHTML = `
      <h2>Enter a Phone Model</h2>
      <p>Please type your phone model.</p>
    `;
    return;
  }

  try {
    const snapshot = await getDocs(collection(db, "phones"));

    let found = false;

    snapshot.forEach((doc) => {
      const phone = doc.data();

      if (
        phone.phone &&
        phone.phone.toLowerCase() === phoneName
      ) {
        found = true;

        result.innerHTML = `
          <h2>${phone.phone}</h2>

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
        <p>This phone has not been added yet.</p>
      `;
    }

  } catch (error) {
    console.error(error);

    result.innerHTML = `
      <h2>Error</h2>
      <p>Failed to load data from Firebase.</p>
    `;
  }
}

searchBtn.addEventListener("click", searchPhone);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchPhone();
  }
});
