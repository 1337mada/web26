/* ---------- lucrări ---------- */
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
const row=p=>`<div class="proj"><span class="yr">${p[0]}</span><h3>${esc(p[1])}</h3><div class="phases">${p[3].split("+").map(x=>`<span class="ph-tag">${x}</span>`).join("")}</div><div class="meta">${esc(p[2])} · Beneficiar: ${esc(p[4])}</div></div>`;
const recent=document.getElementById("recent");
if(recent)recent.innerHTML=[P[0],P[3],P[4],P[5]].map(row).join("");
const projects=document.getElementById("projects");
function renderProjects(f){
  projects.innerHTML=P.filter(p=>f==="all"||(f==="energie"?p[5]==="e":p[3].split("+").includes(f))).map(row).join("");
}
if(projects){
  renderProjects("all");
  document.getElementById("filters").addEventListener("click",e=>{
    const b=e.target.closest("button");if(!b)return;
    document.querySelectorAll("#filters button").forEach(x=>x.setAttribute("aria-pressed",x===b?"true":"false"));
    renderProjects(b.dataset.f);
  });
}

/* ---------- ani, dată ---------- */
const now=new Date(),y=now.getFullYear();
document.querySelectorAll(".years").forEach(e=>e.textContent=y-2002);
document.querySelectorAll(".yearnow").forEach(e=>e.textContent=y);
document.querySelectorAll(".datenow").forEach(e=>e.textContent=String(now.getMonth()+1).padStart(2,"0")+"."+y);

/* ---------- meniu ---------- */
const nav=document.getElementById("nav"),menuBtn=document.getElementById("menuBtn");
menuBtn.addEventListener("click",()=>{const o=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",o)});
document.querySelectorAll(".sub-toggle").forEach(b=>b.addEventListener("click",()=>{
  const li=b.closest(".has-sub");const o=li.classList.toggle("open");b.setAttribute("aria-expanded",o);
}));
document.addEventListener("click",e=>{document.querySelectorAll(".has-sub.open").forEach(li=>{if(!li.contains(e.target)){li.classList.remove("open");li.querySelector(".sub-toggle").setAttribute("aria-expanded","false")}})});
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".has-sub.open").forEach(li=>li.classList.remove("open"))});

/* ---------- copiere ---------- */
document.querySelectorAll(".copy").forEach(b=>b.addEventListener("click",()=>{
  const t=b.dataset.copy;
  const sel=()=>{const r=document.createRange();r.selectNodeContents(b.previousElementSibling);const s=getSelection();s.removeAllRanges();s.addRange(r);};
  if(!navigator.clipboard){sel();return;}
  navigator.clipboard.writeText(t).then(()=>{b.textContent="Copiat";setTimeout(()=>b.textContent="Copiază",1500)}).catch(sel);
}));

/* ---------- galerie ---------- */
const lb=document.getElementById("lb");
if(lb&&lb.showModal){
  const im=document.getElementById("lbImg"),cap=document.getElementById("lbCap");
  document.querySelectorAll(".g-item").forEach(a=>a.addEventListener("click",e=>{
    e.preventDefault();im.src=a.getAttribute("href");im.alt=a.dataset.cap;cap.textContent=a.dataset.cap;lb.showModal();
  }));
  document.getElementById("lbClose").addEventListener("click",()=>lb.close());
  lb.addEventListener("click",e=>{if(e.target===lb)lb.close()});
}

/* ---------- planșa MEF: fundație continuă, izobare σz/q (Boussinesq) ---------- */
(function(){
  const cv=document.getElementById("fem");if(!cv)return;
  const ctx=cv.getContext("2d");
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // domeniu: x ∈ [-6,6] m, z ∈ [-1.6, 7] m (z=0 teren natural, pozitiv în jos)
  const X0=-6,X1=6,Z0=-1.9,Z1=6.4,B=2.4,b=B/2,Df=1.5,t=0.55,col=0.45;
  function rnd(i,j){const s=Math.sin(i*127.1+j*311.7)*43758.5453;return s-Math.floor(s)}
  // noduri cu îndesire spre fundație
  const xs=[],zs=[];const NX=30,NZ=17;
  for(let i=0;i<=NX;i++){const u=i/NX*2-1;xs.push(6*Math.sign(u)*Math.pow(Math.abs(u),1.55))}
  for(let j=0;j<=NZ;j++){const v=j/NZ;zs.push(Z1*Math.pow(v,1.45))}
  const nodes=[];
  for(let j=0;j<=NZ;j++){nodes.push([]);for(let i=0;i<=NX;i++){
    let x=xs[i],z=zs[j];
    if(i>0&&i<NX&&j>0&&j<NZ){const dx=(xs[i+1]-xs[i-1])/2,dz=(zs[j+1]-zs[j-1])/2;x+=(rnd(i,j)-.5)*dx*.35;z+=(rnd(j,i)-.5)*dz*.35}
    nodes[j].push([x,z]);
  }}
  function sig(x,z){ // σz/q sub talpă, bandă de lățime B la adâncimea Df
    const zz=z-Df;if(zz<=0.02)return (Math.abs(x)<=b&&zz>-t)?1:0;
    const a1=Math.atan((x+b)/zz),a2=Math.atan((x-b)/zz),al=a1-a2;
    return (al+Math.sin(al)*Math.cos(al+2*a2))/Math.PI;
  }
  const tris=[];
  for(let j=0;j<NZ;j++)for(let i=0;i<NX;i++){
    const a=nodes[j][i],c=nodes[j][i+1],d=nodes[j+1][i+1],e=nodes[j+1][i];
    const T=(i+j)%2?[[a,c,d],[a,d,e]]:[[a,c,e],[c,d,e]];
    T.forEach(tr=>{const cx=(tr[0][0]+tr[1][0]+tr[2][0])/3,cz=(tr[0][1]+tr[1][1]+tr[2][1])/3;
      tris.push({p:tr,s:sig(cx,cz),r:Math.hypot(cx,(cz-Df)*1.2)})});
  }
  tris.sort((p,q)=>p.r-q.r);const rmax=tris[tris.length-1].r;
  const bands=[.8,.6,.4,.2,.1];
  function col_(s,C){for(let k=0;k<bands.length;k++)if(s>=bands[k])return C["c"+(k+1)];return null}
  function css(){const st=getComputedStyle(document.documentElement),g=n=>st.getPropertyValue(n).trim();
    return{ink:g("--ink"),ink2:g("--ink-2"),sheet:g("--sheet"),gold:g("--gold"),rule:g("--rule-2"),c1:g("--c1"),c2:g("--c2"),c3:g("--c3"),c4:g("--c4"),c5:g("--c5"),mono:g("--f-mono")||"monospace"}}
  let W=0,H=0,k=1,ox=0,oy=0;
  function size(){const r=cv.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
    W=r.width;H=r.height;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    k=Math.min(W/(X1-X0),H/(Z1-Z0));ox=W/2;oy=-Z0*k+(H-(Z1-Z0)*k)/2}
  const P_=(x,z)=>[ox+x*k,oy+z*k];
  function arrow(x1,y1,x2,y2,C,h=7){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();const a=Math.atan2(y2-y1,x2-x1);
    ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-h*Math.cos(a-.35),y2-h*Math.sin(a-.35));ctx.lineTo(x2-h*Math.cos(a+.35),y2-h*Math.sin(a+.35));ctx.closePath();ctx.fillStyle=C.ink;ctx.fill()}
  function tick(x,y){ctx.beginPath();ctx.moveTo(x-4,y+4);ctx.lineTo(x+4,y-4);ctx.stroke()}
  function draw(frac){
    const C=css();ctx.clearRect(0,0,W,H);ctx.fillStyle=C.sheet;ctx.fillRect(0,0,W,H);
    const n=Math.floor(tris.length*frac),fs=Math.max(9,Math.min(11,W/52));
    // mesh
    for(let m=0;m<n;m++){const T=tris[m],c=col_(T.s,C);const q=T.p.map(p=>P_(p[0],p[1]));
      ctx.beginPath();ctx.moveTo(q[0][0],q[0][1]);ctx.lineTo(q[1][0],q[1][1]);ctx.lineTo(q[2][0],q[2][1]);ctx.closePath();
      if(c){ctx.fillStyle=c;ctx.fill()}
      ctx.strokeStyle=C.ink2;ctx.globalAlpha=.32;ctx.lineWidth=.6;ctx.stroke();ctx.globalAlpha=1}
    // teren natural
    ctx.strokeStyle=C.ink;ctx.lineWidth=1.4;const g0=P_(X0,0),g1=P_(X1,0);
    ctx.beginPath();ctx.moveTo(g0[0],g0[1]);ctx.lineTo(g1[0],g1[1]);ctx.stroke();
    ctx.lineWidth=.8;for(let x=X0+.2;x<X1;x+=.45){const p=P_(x,0);ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(p[0]-5,p[1]+6);ctx.stroke()}
    // fundație (talpă + stâlp), hașurată
    const shape=[[-b,Df],[b,Df],[b,Df-t],[col/2,Df-t],[col/2,-1.15],[-col/2,-1.15],[-col/2,Df-t],[-b,Df-t]].map(p=>P_(p[0],p[1]));
    ctx.beginPath();shape.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();
    ctx.fillStyle=C.sheet;ctx.fill();ctx.save();ctx.clip();ctx.strokeStyle=C.ink;ctx.lineWidth=.7;
    const L=P_(-b,0)[0]-50,R=P_(b,0)[0]+50,T0=P_(0,-1.3)[1],B0=P_(0,Df)[1];
    for(let x=L-(B0-T0);x<R;x+=6){ctx.beginPath();ctx.moveTo(x,B0);ctx.lineTo(x+(B0-T0),T0);ctx.stroke()}
    ctx.restore();ctx.beginPath();shape.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();
    ctx.strokeStyle=C.ink;ctx.lineWidth=1.5;ctx.stroke();
    // încărcare N
    ctx.lineWidth=1.3;ctx.strokeStyle=C.ink;const a0=P_(0,-1.85),a1=P_(0,-1.2);arrow(a0[0],a0[1],a1[0],a1[1],C,8);
    ctx.font=`500 ${fs+1}px ${C.mono}`;ctx.fillStyle=C.ink;ctx.textBaseline="middle";ctx.fillText("N",a0[0]+7,a0[1]+6);
    // cotă B
    ctx.lineWidth=.8;const yB=P_(0,Df+.55)[1],xl=P_(-b,0)[0],xr=P_(b,0)[0];
    ctx.beginPath();ctx.moveTo(xl,yB);ctx.lineTo(xr,yB);ctx.moveTo(xl,P_(0,Df)[1]+2);ctx.lineTo(xl,yB+5);ctx.moveTo(xr,P_(0,Df)[1]+2);ctx.lineTo(xr,yB+5);ctx.stroke();
    tick(xl,yB);tick(xr,yB);ctx.textAlign="center";ctx.fillStyle=C.ink;ctx.fillText("B = 2.40",(xl+xr)/2,yB-8);
    // cotă Df
    const xD=P_(-b-1.05,0)[0],y0=P_(0,0)[1],y1=P_(0,Df)[1];
    ctx.beginPath();ctx.moveTo(xD,y0);ctx.lineTo(xD,y1);ctx.moveTo(xD-5,y1);ctx.lineTo(xl-2,y1);ctx.stroke();tick(xD,y0);tick(xD,y1);
    ctx.save();ctx.translate(xD-8,(y0+y1)/2);ctx.rotate(-Math.PI/2);ctx.fillText("Df = 1.50",0,0);ctx.restore();
    // cote teren
    ctx.textAlign="left";ctx.font=`400 ${fs}px ${C.mono}`;ctx.fillStyle=C.ink2;
    const ct=P_(X0+.25,0);ctx.fillText("±0.00 CTN",ct[0],ct[1]-9);
    // legendă σz/q
    const lx=W-Math.max(78,W*.13),ly=P_(0,0)[1]+14,lh=Math.min(16,H/22);
    ctx.fillStyle=C.ink;ctx.font=`500 ${fs}px ${C.mono}`;ctx.fillText("σz / q",lx,ly);
    bands.forEach((v,i)=>{const yy=ly+12+i*lh;ctx.fillStyle=C["c"+(i+1)];ctx.fillRect(lx,yy,14,lh-3);ctx.strokeStyle=C.ink;ctx.lineWidth=.6;ctx.strokeRect(lx,yy,14,lh-3);
      ctx.fillStyle=C.ink2;ctx.font=`400 ${fs}px ${C.mono}`;ctx.fillText("≥ "+v.toFixed(1),lx+20,yy+(lh-3)/2)});
    // scară grafică 0–4 m
    const sx=P_(X0+.3,0)[0],sy=H-16;ctx.lineWidth=.8;ctx.strokeStyle=C.ink;
    for(let i=0;i<4;i++){ctx.fillStyle=i%2?C.sheet:C.ink;ctx.fillRect(sx+i*k,sy,k,4);ctx.strokeRect(sx+i*k,sy,k,4)}
    ctx.fillStyle=C.ink2;ctx.font=`400 ${fs-1}px ${C.mono}`;ctx.textAlign="center";
    [0,2,4].forEach(m=>ctx.fillText(String(m),sx+m*k,sy-7));ctx.textAlign="left";ctx.fillText("m",sx+4*k+6,sy+2);
  }
  let started=false;
  function render(anim){size();if(!anim||reduce){draw(1);return}
    const t0=performance.now(),dur=1400;
    (function f(t){const p=Math.min(1,(t-t0)/dur);draw(.25+.75*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}
  render(true);started=true;
  let to;new ResizeObserver(()=>{if(!started)return;clearTimeout(to);to=setTimeout(()=>render(false),120)}).observe(cv);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change",()=>render(false));
})();
