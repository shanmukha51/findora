import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { escapeHTML } from "./app.js";
const gate = document.getElementById("dashboardGate");
onAuthStateChanged(auth, async user => {
  if (!user) return location.href="login.html?redirect=dashboard.html";
  gate.hidden = true; document.getElementById("dashName").textContent = user.displayName || user.email.split("@")[0]; document.getElementById("dashEmail").textContent = user.email;
  const avatar = document.getElementById("dashAvatar"); avatar.textContent = (user.displayName || user.email).charAt(0).toUpperCase();
  let docs=[]; try { const s=await getDocs(query(collection(db,"items"),where("reporterId","==",user.uid),orderBy("createdAt","desc"))); docs=s.docs.map(d=>({id:d.id,...d.data()})); } catch { const s=await getDocs(query(collection(db,"items"),where("reporterId","==",user.uid))); docs=s.docs.map(d=>({id:d.id,...d.data()})); }
  document.getElementById("statReports").textContent=docs.length; document.getElementById("statLost").textContent=docs.filter(x=>x.status==="lost").length; document.getElementById("statFound").textContent=docs.filter(x=>x.status==="found").length; document.getElementById("myReports").innerHTML=docs.length?docs.map(x=>`<a class="mini-report" href="item-details.html?id=${x.id}"><span>${x.status==="lost"?"🔎":"📦"}</span><div><strong>${escapeHTML(x.name)}</strong><small>${escapeHTML(x.location||"")} · ${escapeHTML(x.date||"Recently")}</small></div><b>${x.status}</b></a>`).join(""):`<div class="empty-mini">You haven't reported any items yet.</div>`;
});
