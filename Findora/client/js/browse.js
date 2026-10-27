import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { db } from "./firebase.js";
import { escapeHTML, showToast } from "./app.js";

const container = document.getElementById("itemsContainer"), empty = document.getElementById("emptyState"), search = document.getElementById("searchInput"), status = document.getElementById("statusFilter"), category = document.getElementById("categoryFilter"), sort = document.getElementById("sortFilter"), count = document.getElementById("resultCount");
let items = [];
const favorites = new Set(JSON.parse(localStorage.getItem("findoraFavorites") || "[]"));

async function load() {
  container.innerHTML = `<div class="loading-grid"><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div></div>`;
  try {
    const snap = await getDocs(query(collection(db, "items"), orderBy("createdAt", "desc")));
    items = snap.docs.map(d => ({ id:d.id, ...d.data() }));
  } catch {
    const snap = await getDocs(collection(db, "items"));
    items = snap.docs.map(d => ({ id:d.id, ...d.data() }));
  }
  render();
}
function render() {
  const q = search.value.toLowerCase().trim();
  let list = items.filter(x => (!q || [x.name,x.description,x.location,x.category].join(" ").toLowerCase().includes(q)) && (status.value === "all" || x.status === status.value) && (category.value === "all" || x.category === category.value));
  if (sort.value === "oldest") list.reverse();
  if (sort.value === "name") list.sort((a,b) => (a.name||"").localeCompare(b.name||""));
  count.textContent = `${list.length} ${list.length === 1 ? "item" : "items"} found`;
  empty.hidden = list.length > 0;
  container.innerHTML = list.map(card).join("");
  container.querySelectorAll("[data-favorite]").forEach(btn => btn.addEventListener("click", () => toggleFavorite(btn.dataset.favorite)));
}
function card(x) {
  const fav = favorites.has(x.id);
  const image = x.imageURL ? `<img src="${escapeHTML(x.imageURL)}" alt="${escapeHTML(x.name)}" loading="lazy">` : `<div class="item-placeholder">${x.status === "lost" ? "🔎" : "📦"}</div>`;
  return `<article class="item-card">
    <a class="item-image" href="item-details.html?id=${encodeURIComponent(x.id)}">${image}<span class="status-pill ${x.status}">${x.status === "lost" ? "Lost" : "Found"}</span></a>
    <div class="item-content"><div class="item-card-top"><span class="category-chip">${escapeHTML(x.category || "other")}</span><button class="icon-btn ${fav ? "active" : ""}" data-favorite="${escapeHTML(x.id)}" title="Save">${fav ? "♥" : "♡"}</button></div>
    <h3><a href="item-details.html?id=${encodeURIComponent(x.id)}">${escapeHTML(x.name || "Unnamed item")}</a></h3><p>${escapeHTML(x.description || "No description provided.")}</p>
    <div class="item-meta"><span>📍 ${escapeHTML(x.location || "Unknown")}</span><span>🕒 ${escapeHTML(x.date || "Recently")}</span></div></div></article>`;
}
function toggleFavorite(id) { favorites.has(id) ? favorites.delete(id) : favorites.add(id); localStorage.setItem("findoraFavorites", JSON.stringify([...favorites])); showToast(favorites.has(id) ? "Saved to your favorites." : "Removed from favorites."); render(); }
[search,status,category,sort].forEach(el => el?.addEventListener("input", render));
document.getElementById("clearFilters")?.addEventListener("click", () => { search.value=""; status.value="all"; category.value="all"; sort.value="newest"; render(); });
load();
