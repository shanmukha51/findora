import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { auth } from "./firebase.js";

export function escapeHTML(value = "") {
  return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
}

export function showToast(message, type = "success") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function avatar(user) {
  const name = user?.displayName || user?.email || "User";
  return name.trim().charAt(0).toUpperCase();
}

function renderAuth(user) {
  document.querySelectorAll("[data-auth-guest]").forEach(el => el.hidden = !!user);
  document.querySelectorAll("[data-auth-user]").forEach(el => el.hidden = !user);
  document.querySelectorAll("[data-user-name]").forEach(el => el.textContent = user?.displayName || user?.email?.split("@")[0] || "Student");
  document.querySelectorAll("[data-user-avatar]").forEach(el => el.textContent = avatar(user));
}

async function logout() {
  await signOut(auth);
  showToast("You have been logged out.");
  setTimeout(() => location.href = "index.html", 500);
}

function setupNavigation() {
  const toggle = document.querySelector("#menuToggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) toggle.addEventListener("click", () => nav.classList.toggle("open"));
  document.querySelectorAll("[data-logout]").forEach(btn => btn.addEventListener("click", logout));
}

setupNavigation();
onAuthStateChanged(auth, user => {
  renderAuth(user);
  document.dispatchEvent(new CustomEvent("findora-auth-ready", { detail: user }));
});

export function getInitials(user) { return avatar(user); }
