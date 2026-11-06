const P=[
 [2021,"Parc fotovoltaic 61 MW","Oraș Bechet, Dolj","SG","Prodfer Construct SRL","e"],
 [2021,"Parc fotovoltaic","Com. Dudești, Brăila","SG","Wiren Energy Efficiency SRL","e"],
 [2021,"Parc fotovoltaic","Com. Studina, Olt","SG","Power&Lighting Tehnorob","e"],
 [2019,"Drum expres Craiova–Pitești, tronson 1 (km 0–1+900 și km 9+400–17+700)","Dolj","SG","DP Consult S.A.",""],
 [2019,"Centrală electrică cu ciclu combinat cu turbine cu gaze","Mintia, Hunedoara","SG","ISPE S.A.","e"],
 [2018,"Fabrică de producere a etanolului din celuloză","Podari, Dolj","SG","Bilfinger Tebodin România",""],
 [2017,"Dezvoltare CTE Iernut prin construcția unei centrale termoelectrice noi","Iernut, Mureș","SG","ISPE S.A.","e"],
 [2014,"Extinderea depozitului de zgură și cenușă","Paroșeni, Hunedoara","SG","ISPE S.A.","e"],
 [2013,"Instalație de desulfurare a gazelor arse","Paroșeni, Hunedoara","SG","Vector Studio SRL","e"],
 [2013,"Parc fotovoltaic","Com. Aricești-Rahtivani, Prahova","SG","Bester Generation","e"],
 [2012,"Parc fotovoltaic","Com. Cetate, Dolj","SG+PT","Eco Dinam Group","e"],
 [2012,"Amplasare turbine eoliene","Cerna, Tulcea","SG+RT","Bester Generation","e"],
 [2012,"Fundații sisteme eoliene","Com. Baia, Tulcea","PT","AT Consult SRL","e"],
 [2012,"Parc fotovoltaic","Oraș Dăbuleni, Dolj","PT","INEMPI","e"],
 [2011,"Parcare subterană","București","SG","S.C. Kentel Design S.R.L.",""],
 [2011,"Proiectare drumuri","Com. Ilovița, Mehedinți","SG+RT+PT","Comuna Ilovița",""],
 [2010,"Hală și zid de sprijin cu piloți forați","Drăgășani, Vâlcea","SG+PT","S.C. Adriels Group SRL",""],
 [2010,"Rerutare conducte de petrol și gaze","Bulbuceni, Gorj","SG","IAT Global SRL","e"],
 [2009,"Hotel S+P+6E","Mamaia, Constanța","SG","Arhinet Plus SRL",""],
 [2009,"Amplasare parc fotovoltaic","Com. Segarcea, Dolj","RT","Quantum Energy SA","e"],
 [2009,"Amplasament haldă de steril","Galați","SG","ArcelorMittal",""],
 [2009,"Terminal GPL, capacitate 4000 mc","Midia, Constanța","SG+V","Setraco Holding SA","e"],
 [2008,"Bloc de locuințe S+P+8E","Str. Dacia nr. 60L, Craiova, Dolj","SG","Solarex Impex SRL",""],
 [2008,"Locuință S+P+10E","Str. 13 Decembrie, Brașov","SG","Fadi Ossman",""],
 [2008,"Hipermarket Dedeman","Bacău","SG","Dedeman",""],
 [2007,"Bloc de locuințe 2S+P+10E","Str. Dacia nr. 5C, Craiova, Dolj","SG","Medeira Construct SRL",""],
 [2007,"Imobil S+D+P+11E","Str. Depozitelor nr. 3, Pitești, Argeș","SG","Arcadia Invest SRL",""],
 [2007,"Amplasare siloz 250 t","Titu, Dâmbovița","SG","Elpreco SA",""]
];
const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;");
const row=p=>`<div class="proj"><span class="yr">${p[0]}</span><h3>${esc(p[1])}</h3><div class="phases">${p[3].split("+").map(x=>`<span class="ph">${x}</span>`).join("")}</div><div class="meta">${esc(p[2])} · Beneficiar: ${esc(p[4])}</div></div>`;
const recent=document.getElementById("recent");
if(recent)recent.innerHTML=[P[0],P[3],P[4]].map(row).join("");
const projects=document.getElementById("projects");
function renderProjects(f){
  const list=P.filter(p=>f==="all"||(f==="energie"?p[5]==="e":p[3].split("+").includes(f)));
  projects.innerHTML=list.map(row).join("");
}
if(projects){
  renderProjects("all");
  document.getElementById("filters").addEventListener("click",e=>{
    const b=e.target.closest("button");if(!b)return;
    document.querySelectorAll("#filters button").forEach(x=>x.setAttribute("aria-pressed",x===b?"true":"false"));
    renderProjects(b.dataset.f);
  });
}
const y=new Date().getFullYear();
document.querySelectorAll(".years").forEach(e=>e.textContent=y-2002);
document.querySelectorAll(".yearnow").forEach(e=>e.textContent=y);
const nav=document.getElementById("nav"),menuBtn=document.getElementById("menuBtn");
menuBtn.addEventListener("click",()=>{const o=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",o)});
document.querySelectorAll(".copy").forEach(b=>b.addEventListener("click",()=>{
  const t=b.dataset.copy;
  const sel=()=>{const r=document.createRange();r.selectNodeContents(b.previousElementSibling);const s=getSelection();s.removeAllRanges();s.addRange(r);};
  if(!navigator.clipboard){sel();return;}
  navigator.clipboard.writeText(t).then(()=>{b.textContent="Copiat";setTimeout(()=>b.textContent="Copiază",1500)}).catch(sel);
}));
