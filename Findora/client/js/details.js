import { doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { db } from "./firebase.js";
import { escapeHTML, showToast } from "./app.js";
const box = document.getElementById("detailsContainer");
const id = new URLSearchParams(location.search).get("id");
async function load() {
  if (!id) return box.innerHTML = `<div class="empty-state"><h2>Item not found</h2><a class="btn btn-primary" href="browse.html">Back to browse</a></div>`;
  const snap = await getDoc(doc(db,"items",id));
  if (!snap.exists()) return box.innerHTML = `<div class="empty-state"><h2>Item not found</h2><a class="btn btn-primary" href="browse.html">Back to browse</a></div>`;
  const x = snap.data();
  try { await updateDoc(doc(db,"items",id), {views: increment(1)}); } catch {}
  const image = x.imageURL ? `<img src="${escapeHTML(x.imageURL)}" alt="${escapeHTML(x.name)}">` : `<div class="details-placeholder">${x.status === "lost" ? "🔎" : "📦"}<span>No photo uploaded</span></div>`;
  box.innerHTML = `<div class="details-grid"><div class="details-image">${image}</div><div class="details-content">
    <div class="details-status-row"><span class="status-pill ${x.status}">${x.status === "lost" ? "Lost item" : "Found item"}</span><span class="muted">${Number(x.views||0)+1} views</span></div>
    <h1>${escapeHTML(x.name)}</h1><p class="details-description">${escapeHTML(x.description || "No description provided.")}</p>
    <div class="details-info"><div class="info-row"><span class="info-icon">📍</span><div><span>Location</span><strong>${escapeHTML(x.location || "Unknown")}</strong></div></div><div class="info-row"><span class="info-icon">🏷</span><div><span>Category</span><strong>${escapeHTML(x.category || "Other")}</strong></div></div><div class="info-row"><span class="info-icon">📅</span><div><span>Date</span><strong>${escapeHTML(x.date || "Recently")}</strong></div></div><div class="info-row"><span class="info-icon">👤</span><div><span>Reported by</span><strong>${escapeHTML(x.reporter || "Findora member")}</strong></div></div></div>
    <div class="details-actions"><a class="btn btn-primary btn-large" href="mailto:${encodeURIComponent(x.email || "")}?subject=Findora%20-%20${encodeURIComponent(x.name || "item")}">✉ Contact reporter</a><button class="btn btn-soft btn-large" id="shareBtn">↗ Share</button></div>
    <p class="safety-note">🛡 Meet in a public campus location and verify ownership before handing over an item.</p></div></div>`;
  document.getElementById("shareBtn")?.addEventListener("click", async () => { try { await navigator.clipboard.writeText(location.href); showToast("Item link copied!"); } catch { showToast("Copy the page URL to share this item."); } });
}
load().catch(() => box.innerHTML = `<div class="empty-state"><h2>Could not load this item.</h2></div>`);
