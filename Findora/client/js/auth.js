import { auth, db, authPersistence } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { showToast } from "./app.js";

await authPersistence;

const register = document.getElementById("registerForm");
if (register) register.addEventListener("submit", async e => {
  e.preventDefault();
  const fd = new FormData(register);
  const name = fd.get("name").trim(), email = fd.get("email").trim(), password = fd.get("password"), confirm = fd.get("confirmPassword");
  if (password !== confirm) return showToast("Passwords do not match.", "error");
  if (password.length < 6) return showToast("Use at least 6 characters.", "error");
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    await setDoc(doc(db, "users", user.uid), { name, email, role: "user", createdAt: serverTimestamp() }, { merge: true });
    showToast("Account created. Welcome to Findora!");
    setTimeout(() => location.href = "dashboard.html", 700);
  } catch (err) { showToast(authMessage(err), "error"); }
});

const login = document.getElementById("loginForm");
if (login) login.addEventListener("submit", async e => {
  e.preventDefault();
  const fd = new FormData(login);
  try {
    await signInWithEmailAndPassword(auth, fd.get("email").trim(), fd.get("password"));
    showToast("Welcome back! Your session is saved on this device.");
    setTimeout(() => location.href = "dashboard.html", 650);
  } catch (err) { showToast(authMessage(err), "error"); }
});

const reset = document.getElementById("resetForm");
if (reset) reset.addEventListener("submit", async e => {
  e.preventDefault();
  const email = new FormData(reset).get("email").trim();
  try { await sendPasswordResetEmail(auth, email); showToast("Password reset email sent."); reset.reset(); }
  catch (err) { showToast(authMessage(err), "error"); }
});

function authMessage(err) {
  const map = {
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password is too weak. Use at least 6 characters.",
    "auth/network-request-failed": "Network problem. Please try again."
  };
  return map[err.code] || "Something went wrong. Please try again.";
}
