import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { db } from "./firebase.js";
const reports=document.getElementById('homeReports');
if(reports){
  try{
    const snap=await getDocs(collection(db,'items')); const items=snap.docs.map(d=>d.data());
    reports.textContent=items.length || '0';
    document.getElementById('homeLost').textContent=items.filter(x=>x.status==='lost').length;
    document.getElementById('homeFound').textContent=items.filter(x=>x.status==='found').length;
    document.getElementById('homeMembers').textContent=new Set(items.map(x=>x.reporterId).filter(Boolean)).size || '0';
  }catch(e){ console.warn('Home stats unavailable',e); }
}
