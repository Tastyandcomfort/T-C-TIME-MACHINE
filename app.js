const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const sample = {
  earth: {
    title:"Earth",
    past:{heading:"A planet shaped over billions of years",text:"Earth formed approximately 4.54 billion years ago. Its geological record, fossils and other physical evidence help scientists reconstruct the development of oceans, continents and life. This is a starter overview, not a complete geological timeline.",labels:[["VERIFIED","verified"],["HISTORICAL SCIENCE","verified"]]},
    present:{heading:"A living planet under continuous observation",text:"Earth is monitored through scientific instruments, satellites, research stations and field observations. Climate, ecosystems, oceans and human activity are changing, but this prototype does not yet display live measurements.",labels:[["CURRENT CONTEXT","current"],["LIVE DATA NOT CONNECTED","hypothetical"]]},
    future:{heading:"Several possible paths — not one certain future",text:"Scientists use climate models, population projections and other evidence-based methods to explore possible futures. Outcomes depend on assumptions and human choices. These are projections, not guaranteed events.",labels:[["SCIENTIFIC FORECASTS","forecast"],["SCENARIOS VARY","hypothetical"]]}
  },
  hyderabad:{
    title:"Hyderabad",
    past:{heading:"From historic Deccan city to modern metropolis",text:"Hyderabad was founded in 1591 by Muhammad Quli Qutb Shah. Its history includes the Qutb Shahi period, the Nizams, integration into India and later rapid urban growth. This is a concise starter summary.",labels:[["HISTORICAL OVERVIEW","verified"]]},
    present:{heading:"A major urban, technology and cultural centre",text:"Hyderabad is the capital of Telangana and an important centre for technology, education, healthcare, pharmaceuticals and culture. Current traffic, weather, civic and population figures require live or recently published sources, which are not connected in this prototype.",labels:[["GENERAL CONTEXT","current"],["LIVE DATA NOT CONNECTED","hypothetical"]]},
    future:{heading:"Urban growth will depend on planning and investment",text:"Possible future developments include changes in transport, housing, infrastructure, technology and climate resilience. Any specific claim about Hyderabad in a future year needs a dated source, model or clearly stated scenario.",labels:[["SCENARIO","hypothetical"],["NOT A CERTAIN PREDICTION","hypothetical"]]}
  },
  ai:{
    title:"Artificial intelligence",
    past:{heading:"A field built over decades of research",text:"The foundations of artificial intelligence draw on mathematics, logic, computing and cognitive science. The term became prominent in the 1950s, followed by periods of progress, reduced funding and renewed advances.",labels:[["HISTORICAL OVERVIEW","verified"]]},
    present:{heading:"AI systems are used across many fields",text:"Modern AI includes machine learning, language models, image generation, robotics and decision-support systems. Capabilities and limitations vary by system; claims should be evaluated against independent evidence and documented testing.",labels:[["CURRENT CONTEXT","current"]]},
    future:{heading:"The future depends on technical and social choices",text:"Possible developments include more capable assistants, scientific tools and automation. Risks, timelines and outcomes remain uncertain. This prototype does not claim to predict when or whether any particular breakthrough will occur.",labels:[["FORECASTS AND SCENARIOS","forecast"],["UNCERTAINTY","hypothetical"]]}
  }
};
let activeSubject = "Earth", activePeriod = "past";
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}
function getData(query){
  const q=slug(query);
  if(q.includes("hyderabad")) return sample.hyderabad;
  if(q.includes("artificial intelligence")||q==="ai") return sample.ai;
  if(q.includes("earth")||q.includes("planet")) return sample.earth;
  const title=query.trim().replace(/\s+/g," ");
  return {title,past:{heading:`Explore the history of ${title}`,text:"A verified historical account for this subject has not yet been connected. In the full data engine, this section will combine dated records, archival material and source references rather than inventing a history.",labels:[["SOURCE DATA REQUIRED","hypothetical"]]},present:{heading:`Understand ${title} today`,text:"Current information is not connected for this search yet. Phase 2 will add suitable public data providers and display publication dates, source links and update status.",labels:[["LIVE SOURCE NOT CONNECTED","hypothetical"]]},future:{heading:`Explore possible futures for ${title}`,text:"No subject-specific forecast is available in this prototype. Future exploration will distinguish model-based projections from hypothetical scenarios and explain the assumptions behind each.",labels:[["NO FORECAST AVAILABLE","hypothetical"],["NO CLAIM OF CERTAINTY","hypothetical"]]}}
}
function render(period){
  activePeriod=period;
  $$(".time-tab").forEach(b=>{const on=b.dataset.period===period;b.classList.toggle("active",on);b.setAttribute("aria-selected",String(on))});
  const d=getData(activeSubject)[period];
  const labels=d.labels.map(([name,cls])=>`<span class="status ${cls}">${name}</span>`).join("");
  $("#periodPanel").innerHTML=`<div class="period-kicker">${period.toUpperCase()} PERSPECTIVE</div><h3>${escapeHtml(d.heading)}</h3><p>${escapeHtml(d.text)}</p><div class="period-meta">${labels}</div>`;
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function explore(q){
  if(!q.trim()) return;
  activeSubject=q.trim(); $("#resultTitle").textContent=activeSubject;
  $("#resultsSection").hidden=false; render("past");
  $("#resultsSection").scrollIntoView({behavior:"smooth",block:"start"});
  $("#suggestions").hidden=true;
}
$("#searchForm").addEventListener("submit",e=>{e.preventDefault();explore($("#searchInput").value)});
$("#searchInput").addEventListener("input",()=>{
  const q=$("#searchInput").value.trim(), box=$("#suggestions");
  if(!q){box.hidden=true;return}
  const options=["Earth","Hyderabad","Artificial intelligence","Ancient civilizations","Moon","Climate change","Internet","Solar System"].filter(x=>x.toLowerCase().includes(q.toLowerCase())).slice(0,5);
  box.innerHTML=options.map(x=>`<button type="button" class="suggestion">${escapeHtml(x)}</button>`).join("");
  box.hidden=!options.length;
  $$(".suggestion",box).forEach(b=>b.addEventListener("click",()=>{$("#searchInput").value=b.textContent;explore(b.textContent)}));
});
$$(".time-tab").forEach(b=>b.addEventListener("click",()=>render(b.dataset.period)));
$$(".category-card").forEach(b=>b.addEventListener("click",()=>{$("#searchInput").value=b.dataset.query;explore(b.dataset.query)}));
$("#clearResults").addEventListener("click",()=>{$("#resultsSection").hidden=true;$("#searchInput").focus()});
$("#themeToggle").addEventListener("click",()=>{const root=document.documentElement;const dark=root.dataset.theme!=="dark";root.dataset.theme=dark?"dark":"light";$("#themeToggle").textContent=dark?"☀":"◐";});
