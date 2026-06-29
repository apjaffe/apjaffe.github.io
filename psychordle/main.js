/* Game logic for Psychordle. Depends on puzzles.js (DIAGNOSES, SEARCH_ALIASES,
   CASES, MAX, LABEL, DIFFS), which must be loaded before this file. */

/* normalize for matching */
function norm(s){
  return s.toLowerCase()
    .replace(/\(.*?\)/g,"")
    .replace(/[^a-z0-9 ]/g," ")
    .replace(/\bdisorder\b/g,"")
    .replace(/\s+/g," ").trim();
}
const NORM_SET = new Set(DIAGNOSES.map(norm));
function isValidGuess(text){ return NORM_SET.has(norm(text)); }

/* ---------- Dates / daily release ---------- */
function todayStr(){
  const d=new Date();
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function isReleased(c){ return !c.date || c.date <= todayStr(); }
function fmtDate(s){
  const [y,m,d]=s.split("-").map(Number);
  return new Date(y,m-1,d).toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"});
}
function todaysCase(diff){
  const released = CASES[diff].filter(isReleased);
  if(!released.length) return null;
  return released.reduce((a,b)=> (b.date||"") > (a.date||"") ? b : a);
}
/* Released cases sorted newest → oldest — used for prev/next navigation */
function releasedOrdered(diff){
  return CASES[diff].filter(isReleased).sort((a,b)=>(b.date||"").localeCompare(a.date||""));
}

/* ---------- Progress (localStorage) ---------- */
const STORE_KEY = "psychordle_progress_v1";
function loadProgress(){
  try{ return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch(e){ return {}; }
}
function saveResult(id, result, wrong){
  const p = loadProgress();
  const prev = p[id];
  if(!(prev && prev.result==="win" && result!=="win")){
    p[id] = { result, wrong };
  }
  try{ localStorage.setItem(STORE_KEY, JSON.stringify(p)); }catch(e){}
}

/* ---------- In-progress session (localStorage) ---------- */
const SESS_KEY = "psychordle_session_v1";
function saveSession(){
  if(!state || state.over){ clearSession(); return; }
  try{
    localStorage.setItem(SESS_KEY, JSON.stringify({
      id: state.theCase.id,
      diff: state.diff,
      attempts: state.attempts,
      log: state.log||[],
      revealed: state.revealed
    }));
  }catch(e){}
}
function loadSession(id){
  try{
    const s = JSON.parse(localStorage.getItem(SESS_KEY));
    return (s && s.id===id) ? s : null;
  }catch(e){ return null; }
}
function clearSession(){
  try{ localStorage.removeItem(SESS_KEY); }catch(e){}
}

/* ---------- URL hash ---------- */
function setHash(id){
  history.replaceState(null, '', '#'+id);
}
function clearHash(){
  history.replaceState(null, '', location.pathname+location.search);
}

/* ---------- Lookup ---------- */
function caseByDiffDate(diff, date){
  if(!DIFFS.includes(diff)) return null;
  const c = CASES[diff].find(x=>x.date===date);
  return c ? {diff, theCase:c} : null;
}

/* ---------- State ---------- */
let state = null;
const $ = id => document.getElementById(id);
const homeEl=$("home"), gameEl=$("game"), archiveEl=$("archive");
const cluesEl=$("clues"), dotsEl=$("dots"), logEl=$("guesslog");
const guessIn=$("guess"), acEl=$("ac"), submitBtn=$("submit");
const playArea=$("playArea"), endArea=$("endArea"), resultEl=$("result"), answerEl=$("answerbox"), playHint=$("playHint");

/* ---------- Navigation ---------- */
function show(sec){
  homeEl.style.display  = sec==="home"?"block":"none";
  gameEl.style.display  = sec==="game"?"block":"none";
  archiveEl.style.display = sec==="archive"?"block":"none";
  if(sec!=="game") $("caseNav").style.display="none";
  window.scrollTo(0,0);
}
function goHome(){ clearHash(); renderHomeProgress(); show("home"); }

function renderHomeProgress(){
  const p = loadProgress();
  const tl = $("todayLabel"); if(tl) tl.textContent = "Today · " + fmtDate(todayStr());
  DIFFS.forEach(d=>{
    const released = CASES[d].filter(isReleased);
    const total = released.length;
    const played = released.filter(c=>p[c.id]).length;
    const won = released.filter(c=>p[c.id] && p[c.id].result==="win").length;
    const today = todaysCase(d);
    const status = today && !p[today.id] ? "Today's case ready" : (played+" / "+total+" played · "+won+" solved");
    const el = document.querySelector('[data-prog="'+d+'"]');
    if(el) el.textContent = status;
  });
}

/* ---------- Prev / Next case nav ---------- */
function updateCaseNav(){
  const nav = $("caseNav");
  if(!state){ nav.style.display="none"; return; }
  const list = releasedOrdered(state.diff);
  // Hide entirely if only one case in this difficulty
  nav.style.display = list.length > 1 ? "" : "none";
}
function prevCase(){
  const list = releasedOrdered(state.diff);
  const idx = list.findIndex(c=>c.id===state.theCase.id);
  beginCase(state.diff, list[(idx-1+list.length)%list.length]);
}
function nextCase(){
  const list = releasedOrdered(state.diff);
  const idx = list.findIndex(c=>c.id===state.theCase.id);
  beginCase(state.diff, list[(idx+1)%list.length]);
}

/* ---------- Start ---------- */
function startDifficulty(diff){
  const pick = todaysCase(diff);
  if(pick) beginCase(diff, pick);
}
function beginCase(diff, theCase){
  const prior = loadProgress()[theCase.id];
  if(prior){ showPreviousResult(diff, theCase, prior); return; }

  // Restore an in-progress session if one exists for this case
  const sess = loadSession(theCase.id);
  if(sess){
    state = { diff, max:MAX[diff], theCase,
              attempts: sess.attempts, log: sess.log, revealed: sess.revealed };
  } else {
    state = { diff, max:MAX[diff], theCase, revealed:1, attempts:[], log:[] };
  }

  setHash(diff+"-"+(theCase.date||""));
  const isToday = theCase.date === todayStr();
  $("diffLabel").textContent = LABEL[diff] + " · " + state.max + " guesses"
    + (theCase.date ? " · " + (isToday ? "Today's case" : fmtDate(theCase.date)) : "");
  show("game");
  playArea.style.display="block"; endArea.style.display="none";
  guessIn.value=""; hideAC(); refreshSubmit();
  updateCaseNav();
  render();
}

function showPreviousResult(diff, theCase, rec){
  state = { diff, max:MAX[diff], theCase, revealed:theCase.clues.length, attempts:[], over:true };
  setHash(diff+"-"+(theCase.date||""));
  const isToday = theCase.date === todayStr();
  $("diffLabel").textContent = LABEL[diff] + " · " + state.max + " guesses"
    + (theCase.date ? " · " + (isToday ? "Today's case" : fmtDate(theCase.date)) : "");
  show("game");
  render();
  playArea.style.display="none"; endArea.style.display="block";
  const won = rec.result === "win";
  resultEl.innerHTML = (won
    ? '<div class="big win">Correct! 🎉</div><div class="hint">Solved with '+rec.wrong+' wrong guess(es).</div>'
    : '<div class="big lose">Out of guesses</div>')
    + '<div class="hint" style="margin-top:6px">You\'ve already played this case.</div>';
  answerEl.innerHTML = '<div>Diagnosis: <b>'+escapeHtml(theCase.answer)+'</b></div>'
    + '<div style="margin-top:8px;color:var(--muted)">'+escapeHtml(theCase.teach)+'</div>';
  updateCaseNav();
}

function render(){
  // dots
  dotsEl.innerHTML="";
  for(let i=0;i<state.max;i++){
    const d=document.createElement("span"); d.className="dot";
    const a=state.attempts[i];
    if(a==="win") d.classList.add("win");
    else if(a==="wrong") d.classList.add("used");
    else if(a==="skip") d.classList.add("skip");
    if(i===state.attempts.length && !isOver()) d.classList.add("current");
    dotsEl.appendChild(d);
  }
  // clues
  cluesEl.innerHTML="";
  for(let i=0;i<state.revealed;i++){
    const c=document.createElement("div"); c.className="clue";
    c.innerHTML='<div class="lbl">Clue '+(i+1)+'</div>'+escapeHtml(state.theCase.clues[i]);
    cluesEl.appendChild(c);
  }
  // guess log
  logEl.innerHTML="";
  (state.log||[]).forEach(entry=>{
    const it=document.createElement("div");
    it.className="gitem "+entry.type;
    const mark = entry.type==="skip" ? "↷" : "✕";
    it.innerHTML='<span class="mark">'+mark+'</span><span>'+escapeHtml(entry.text)+'</span>';
    logEl.appendChild(it);
  });
}
function isOver(){ return state && state.over; }

/* ---------- Submit / Skip ---------- */
function doSubmit(){
  if(isOver()) return;
  const raw = guessIn.value.trim();
  if(raw===""){
    state.attempts.push("skip");
    (state.log=state.log||[]).push({type:"skip",text:"Skipped — asked for another clue"});
    afterAttempt();
    return;
  }
  if(!isValidGuess(raw)) return;
  const correct = state.theCase.accept.includes(norm(raw)) || norm(raw)===norm(state.theCase.answer);
  if(correct){ endRound(true); return; }
  state.attempts.push("wrong");
  (state.log=state.log||[]).push({type:"wrong",text:raw});
  guessIn.value=""; refreshSubmit();
  afterAttempt();
}
function afterAttempt(){
  guessIn.value=""; hideAC(); refreshSubmit();
  if(state.attempts.length >= state.max){ endRound(false); return; }
  if(state.revealed < state.theCase.clues.length) state.revealed++;
  saveSession();
  render();
  const last=cluesEl.lastElementChild; if(last) last.scrollIntoView({behavior:"smooth",block:"center"});
}
function endRound(won){
  state.over=true;
  if(won) state.attempts.push("win");
  state.revealed = state.theCase.clues.length;
  const wrong = state.attempts.filter(x=>x==="wrong").length;
  saveResult(state.theCase.id, won?"win":"loss", wrong);
  clearSession();
  render();
  playArea.style.display="none"; endArea.style.display="block";
  resultEl.innerHTML = won
    ? '<div class="big win">Correct! 🎉</div><div class="hint">Solved with '+wrong+' wrong guess(es).</div>'
    : '<div class="big lose">Out of guesses</div>';
  answerEl.innerHTML = '<div>Diagnosis: <b>'+escapeHtml(state.theCase.answer)+'</b></div>'
    + '<div style="margin-top:8px;color:var(--muted)">'+escapeHtml(state.theCase.teach)+'</div>';
  endArea.scrollIntoView({behavior:"smooth",block:"center"});
}

/* ---------- Submit button state ---------- */
function refreshSubmit(){
  const val = guessIn.value.trim();
  if(val===""){
    const isLastGuess = state && state.attempts.length === state.max - 1;
    submitBtn.disabled=false;
    submitBtn.textContent= isLastGuess ? "Give up" : "Skip and see next clue";
    submitBtn.className="btn skip";
    guessIn.classList.remove("invalid");
    playHint.className="hint"; playHint.textContent="Leave blank to skip, or pick a diagnosis from the list.";
  } else if(isValidGuess(val)){
    submitBtn.disabled=false;
    submitBtn.textContent="Submit guess";
    submitBtn.className="btn";
    guessIn.classList.remove("invalid");
    playHint.className="hint"; playHint.textContent="Press submit to lock in this diagnosis.";
  } else {
    submitBtn.disabled=true;
    submitBtn.textContent="Submit guess";
    submitBtn.className="btn";
    guessIn.classList.add("invalid");
    playHint.className="hint warn"; playHint.textContent="Keep typing and choose a diagnosis from the suggestions — only listed diagnoses count.";
  }
}

/* ---------- Autocomplete ---------- */
let acItems=[], acIdx=-1;
function updateAC(){
  refreshSubmit();
  const ql=guessIn.value.trim().toLowerCase();
  const nq=norm(guessIn.value);
  if(ql.length<2){ hideAC(); return; }
  acItems = DIAGNOSES.filter(d=>
    d.toLowerCase().includes(ql) ||
    norm(d).includes(nq) ||
    (SEARCH_ALIASES[d]||"").includes(ql)
  ).slice(0,10);
  if(!acItems.length){ hideAC(); return; }
  acIdx=-1; acEl.innerHTML="";
  acItems.forEach((d,i)=>{
    const el=document.createElement("div"); el.textContent=d;
    el.addEventListener("mousedown",e=>{e.preventDefault();chooseAC(i);});
    acEl.appendChild(el);
  });
  acEl.classList.add("show");
}
function chooseAC(i){ guessIn.value=acItems[i]; hideAC(); refreshSubmit(); guessIn.focus(); }
function hideAC(){ acEl.classList.remove("show"); acEl.innerHTML=""; acItems=[]; acIdx=-1; }
function moveAC(dir){
  if(!acItems.length) return;
  acIdx=(acIdx+dir+acItems.length)%acItems.length;
  [...acEl.children].forEach((c,i)=>c.classList.toggle("sel",i===acIdx));
  acEl.children[acIdx].scrollIntoView({block:"nearest"});
}

/* ---------- Archive ---------- */
function renderArchive(){
  setHash("archive");
  const p = loadProgress();
  const list = $("archList"); list.innerHTML="";
  DIFFS.forEach(diff=>{
    const grp=document.createElement("div"); grp.className="arch-group";
    const h=document.createElement("h3"); h.textContent=LABEL[diff]+" · "+MAX[diff]+" guesses"; grp.appendChild(h);
    const released = releasedOrdered(diff);
    released.forEach(c=>{
      const rec=p[c.id];
      const btn=document.createElement("button"); btn.className="arch";
      const dateStr = c.date ? fmtDate(c.date) : "";
      const isToday = c.date === todayStr();
      const title = rec ? c.answer : (isToday ? "Today's case" : dateStr || "Case");
      const meta = (rec
        ? (rec.result==="win" ? "Solved with "+rec.wrong+" wrong" : "Not solved — "+rec.wrong+" wrong before running out")
        : "Not played yet — diagnosis hidden")
        + (dateStr ? " · " + dateStr : "");
      const badge = rec ? (rec.result==="win"?"win":"loss") : "new";
      const badgeText = rec ? (rec.result==="win"?"Solved":"Missed") : "New";
      btn.innerHTML='<div><div style="font-weight:600">'+escapeHtml(title)+'</div><div class="meta">'+escapeHtml(meta)+'</div></div>'
                  +'<span class="badge '+badge+'">'+badgeText+'</span>';
      btn.addEventListener("click",()=>beginCase(diff,c));
      grp.appendChild(btn);
    });
    list.appendChild(grp);
  });
  show("archive");
}

function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

/* ---------- Wiring ---------- */
document.querySelectorAll(".diff").forEach(b=>b.addEventListener("click",()=>startDifficulty(b.dataset.diff)));
submitBtn.addEventListener("click",doSubmit);
$("again").addEventListener("click",nextCase);
$("menu").addEventListener("click",goHome);
$("toArchive").addEventListener("click",renderArchive);
$("archBack").addEventListener("click",goHome);
$("title").addEventListener("click",goHome);
$("prevCase").addEventListener("click",prevCase);
$("nextCaseBtn").addEventListener("click",nextCase);
guessIn.addEventListener("input",updateAC);
guessIn.addEventListener("keydown",e=>{
  if(e.key==="ArrowDown"){e.preventDefault();moveAC(1);}
  else if(e.key==="ArrowUp"){e.preventDefault();moveAC(-1);}
  else if(e.key==="Enter"){
    e.preventDefault();
    if(acIdx>=0){chooseAC(acIdx);}
    else if(!submitBtn.disabled){doSubmit();}
  } else if(e.key==="Escape"){hideAC();}
});
document.addEventListener("click",e=>{ if(!e.target.closest(".inputrow")) hideAC(); });

/* ---------- Init: restore from URL hash on load ---------- */
(function(){
  const raw = location.hash.slice(1);
  if(!raw){ renderHomeProgress(); return; }
  if(raw==="archive"){ renderArchive(); return; }
  // Hash format: "<diff>-<date>" e.g. "easy-2026-06-28"
  const dash = raw.indexOf("-");
  if(dash>0){
    const diff = raw.slice(0, dash);
    const date = raw.slice(dash+1);
    const found = caseByDiffDate(diff, date);
    if(found){ beginCase(found.diff, found.theCase); return; }
  }
  renderHomeProgress();
})();
