/* Game logic for Psychordle. Depends on puzzles.js (DIAGNOSES, SEARCH_ALIASES,
   CASES, MAX, LABEL, DIFFS), which must be loaded before this file. */

/* normalize for matching */
function norm(s){
  return s.toLowerCase()
    .replace(/\(.*?\)/g,"")        // drop parentheticals
    .replace(/[^a-z0-9 ]/g," ")    // punctuation -> space
    .replace(/\bdisorder\b/g,"")   // 'disorder' optional
    .replace(/\s+/g," ").trim();
}
/* a typed string is a valid guess only if it matches a list entry exactly (after normalization) */
const NORM_SET = new Set(DIAGNOSES.map(norm));
function isValidGuess(text){ return NORM_SET.has(norm(text)); }

/* ---------- Dates / daily release ---------- */
function todayStr(){
  const d=new Date();
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function isReleased(c){ return !c.date || c.date <= todayStr(); }   // future-dated cases stay hidden
function fmtDate(s){
  const [y,m,d]=s.split("-").map(Number);
  return new Date(y,m-1,d).toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"});
}
/* today's case for a difficulty = the released case with the latest date */
function todaysCase(diff){
  const released = CASES[diff].filter(isReleased);
  if(!released.length) return null;
  return released.reduce((a,b)=> (b.date||"") > (a.date||"") ? b : a);
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
  // keep best result (a win never overwritten by a later loss)
  if(!(prev && prev.result==="win" && result!=="win")){
    p[id] = { result, wrong };
  }
  try{ localStorage.setItem(STORE_KEY, JSON.stringify(p)); }catch(e){}
}
function caseById(id){
  for(const d of DIFFS){ const c=CASES[d].find(x=>x.id===id); if(c) return {diff:d,theCase:c}; }
  return null;
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
  homeEl.style.display = sec==="home"?"block":"none";
  gameEl.style.display = sec==="game"?"block":"none";
  archiveEl.style.display = sec==="archive"?"block":"none";
  window.scrollTo(0,0);
}
function goHome(){ renderHomeProgress(); show("home"); }

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

/* ---------- Start ---------- */
function startDifficulty(diff){
  const pick = todaysCase(diff);
  if(pick) beginCase(diff, pick);
}
/* cycle to the next released case in the same difficulty (newest → oldest) */
function nextCase(){
  const released = CASES[state.diff].filter(isReleased).sort((a,b)=>(b.date||"").localeCompare(a.date||""));
  if(!released.length) return;
  const idx = released.findIndex(c=>c.id===state.theCase.id);
  beginCase(state.diff, released[(idx+1)%released.length]);
}
function beginCase(diff, theCase){
  const prior = loadProgress()[theCase.id];
  if(prior){ showPreviousResult(diff, theCase, prior); return; }
  state = { diff, max:MAX[diff], theCase, revealed:1, attempts:[] };
  const isToday = theCase.date === todayStr();
  $("diffLabel").textContent = LABEL[diff] + " · " + state.max + " guesses"
    + (theCase.date ? " · " + (isToday ? "Today's case" : fmtDate(theCase.date)) : "");
  show("game");
  playArea.style.display="block"; endArea.style.display="none";
  guessIn.value=""; hideAC(); refreshSubmit();
  render();
}

function showPreviousResult(diff, theCase, rec){
  state = { diff, max:MAX[diff], theCase, revealed:theCase.clues.length, attempts:[], over:true };
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
  // log
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
  // SKIP
  if(raw===""){
    state.attempts.push("skip");
    (state.log=state.log||[]).push({type:"skip",text:"Skipped — asked for another clue"});
    afterAttempt();
    return;
  }
  if(!isValidGuess(raw)) return; // invalid text is never submittable
  const correct = state.theCase.accept.includes(norm(raw)) || norm(raw)===norm(state.theCase.answer);
  if(correct){ endRound(true); return; }
  // valid but wrong
  state.attempts.push("wrong");
  (state.log=state.log||[]).push({type:"wrong",text:raw});
  guessIn.value=""; refreshSubmit();
  afterAttempt();
}
function afterAttempt(){
  guessIn.value=""; hideAC(); refreshSubmit();
  if(state.attempts.length >= state.max){ endRound(false); return; }
  if(state.revealed < state.theCase.clues.length) state.revealed++;
  render();
  const last=cluesEl.lastElementChild; if(last) last.scrollIntoView({behavior:"smooth",block:"center"});
}
function endRound(won){
  state.over=true;
  if(won) state.attempts.push("win");
  state.revealed = state.theCase.clues.length;
  const wrong = state.attempts.filter(x=>x==="wrong").length;
  saveResult(state.theCase.id, won?"win":"loss", wrong);
  render();
  playArea.style.display="none"; endArea.style.display="block";
  resultEl.innerHTML = won
    ? '<div class="big win">Correct! 🎉</div><div class="hint">Solved with '+wrong+' wrong guess(es).</div>'
    : '<div class="big lose">Out of guesses</div>';
  answerEl.innerHTML = '<div>Diagnosis: <b>'+escapeHtml(state.theCase.answer)+'</b></div>'
    + '<div style="margin-top:8px;color:var(--muted)">'+escapeHtml(state.theCase.teach)+'</div>';
  endArea.scrollIntoView({behavior:"smooth",block:"center"});
}

/* ---------- Submit button state (strict validation) ---------- */
function refreshSubmit(){
  const val = guessIn.value.trim();
  if(val===""){
    submitBtn.disabled=false;
    submitBtn.textContent="Skip and see next clue";
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
  const p = loadProgress();
  const list = $("archList"); list.innerHTML="";
  DIFFS.forEach(diff=>{
    const grp=document.createElement("div"); grp.className="arch-group";
    const h=document.createElement("h3"); h.textContent=LABEL[diff]+" · "+MAX[diff]+" guesses"; grp.appendChild(h);
    const released = CASES[diff].filter(isReleased)
      .sort((a,b)=>(b.date||"").localeCompare(a.date||""));   // newest first; future dates hidden
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

renderHomeProgress();
