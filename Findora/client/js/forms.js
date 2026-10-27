import { auth, db, storage } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";
import { showToast } from "./app.js";

const protectedPage = document.querySelector("[data-protected-page]");
onAuthStateChanged(auth, user => {
  if (protectedPage && !user) location.href = `login.html?redirect=${encodeURIComponent(location.pathname.split("/").pop())}`;
  if (user) {
    document.querySelectorAll("[name='reporter']").forEach(i => i.value = user.displayName || "");
    document.querySelectorAll("[name='email']").forEach(i => i.value = user.email || "");
  }
});

async function submitReport(form, status) {
  const user = auth.currentUser;
  if (!user) return location.href = "login.html";
  const fd = new FormData(form);
  const submit = form.querySelector("button[type=submit]");
  submit.disabled = true; submit.textContent = "Publishing…";
  try {
    let imageURL = "";
    const file = fd.get("image");
    if (file && file.size) {
      const safe = file.name.replace(/[^a-z0-9.\-_]/gi, "-");
      const imageRef = ref(storage, `items/${user.uid}/${Date.now()}-${safe}`);
      await uploadBytes(imageRef, file);
      imageURL = await getDownloadURL(imageRef);
    }
    const item = {
      name: fd.get("itemName").trim(), category: fd.get("category"), status,
      location: fd.get("location").trim(), date: fd.get("date"), description: fd.get("description").trim(),
      reporter: user.displayName || fd.get("reporter") || "Findora member", email: user.email,
      reporterId: user.uid, imageURL, createdAt: serverTimestamp(), resolved: false, views: 0
    };
    await addDoc(collection(db, "items"), item);
    showToast(`${status === "lost" ? "Lost" : "Found"} item published successfully!`);
    form.reset();
    setTimeout(() => location.href = "browse.html", 700);
  } catch (err) {
    console.error(err); showToast("Could not publish the item. Check Firebase rules and try again.", "error");
    submit.disabled = false; submit.textContent = "Publish Report →";
  }
}

const lost = document.getElementById("lostForm"); if (lost) lost.addEventListener("submit", e => { e.preventDefault(); submitReport(lost, "lost"); });
const found = document.getElementById("foundForm"); if (found) found.addEventListener("submit", e => { e.preventDefault(); submitReport(found, "found"); });
