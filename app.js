const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const sample = {
  earth: {
    title:"Earth",
    past:{heading:"A planet shaped over billions of years",text:"Earth formed approximately 4.54 billion years ago. Geological evidence, radiometric dating and the fossil record help scientists reconstruct its development.",basis:"Radiometric dating, geology and fossil evidence",method:"Cross-checking physical samples, stratigraphy and scientific literature",confidence:"High for broad formation history",source:"Starter overview · source links to be added"},
    present:{heading:"A living planet under continuous observation",text:"Earth is monitored through satellites, research stations, ocean buoys and field observations. This prototype does not yet retrieve live measurements.",basis:"Satellite observations and instrument measurements",method:"Combine time-stamped observations from validated providers",confidence:"Not assessed here — no live feed connected",source:"Live data connector not yet installed"},
    future:{heading:"Several possible paths — not one certain future",text:"Climate models and other scientific projections explore possible outcomes under stated assumptions. Results vary with emissions, policy, technology and natural variability.",basis:"Scientific models and conditional projections",method:"Compare model scenarios, assumptions, uncertainty ranges and dates",confidence:"Conditional; depends on scenario and model",source:"Illustrative explanation · no forecast calculated"}
  },
  hyderabad:{
    title:"Hyderabad",
    past:{heading:"A historic Deccan city",text:"Hyderabad was founded in 1591 by Muhammad Quli Qutb Shah. Its history includes the Qutb Shahi period, the Nizams and its later development as a major Indian city.",basis:"Historical records, inscriptions and archival scholarship",method:"Compare dated documents and accounts from multiple sources",confidence:"High for the broad founding history",source:"Starter overview · source links to be added"},
    present:{heading:"A major urban, technology and cultural centre",text:"Hyderabad is the capital of Telangana and a centre for technology, education, healthcare, pharmaceuticals and culture. Current statistics are not connected in this prototype.",basis:"Government statistics and dated institutional reporting",method:"Use latest available datasets and show their publication dates",confidence:"Not assessed here — no current dataset connected",source:"Live data connector not yet installed"},
    future:{heading:"Urban development depends on many choices",text:"Possible changes involve transport, housing, infrastructure, technology and climate resilience. Specific future outcomes require explicit scenarios and evidence.",basis:"Urban planning scenarios and demographic projections",method:"State assumptions, compare scenarios and display uncertainty",confidence:"Scenario-based, not a guaranteed prediction",source:"Illustrative scenario framework · no forecast calculated"}
  },
  ai:{
    title:"Artificial intelligence",
    past:{heading:"A field built over decades of research",text:"Artificial intelligence draws on mathematics, logic, computing and cognitive science. The term became prominent in the 1950s, followed by successive periods of progress and renewed research.",basis:"Academic publications and documented research history",method:"Trace key publications, institutions and technical milestones",confidence:"High for the broad research chronology",source:"Starter overview · source links to be added"},
    present:{heading:"AI systems are used across many fields",text:"Modern AI includes machine learning, language models, image generation, robotics and decision-support tools. Capabilities vary by system and task.",basis:"Technical documentation, evaluations and peer-reviewed research",method:"Compare documented capabilities, benchmarks and limitations",confidence:"System-specific; must be evaluated individually",source:"Current technical sources not yet connected"},
    future:{heading:"The future depends on technical and social choices",text:"Possible developments include more capable assistants, scientific tools and automation. Timelines, impacts and risks remain uncertain.",basis:"Research trends, expert forecasts and scenario analysis",method:"Separate measured trends from assumptions and speculative scenarios",confidence:"Uncertain; no single outcome can be established",source:"Scenario framework · no forecast calculated"}
  }
};

let activeSubject = "Earth";
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function getData(query){
  const q=slug(query);
  if(q.includes("hyderabad")) return sample.hyderabad;
  if(q.includes("artificial intelligence")||q==="ai") return sample.ai;
  if(q.includes("earth")||q.includes("planet")) return sample.earth;
  const title=query.trim().replace(/\s+/g," ");
  return {title,
    past:{heading:`Historical research: ${title}`,text:`A verified historical conclusion about “${title}” is not available in this prototype. The full engine must locate dated records and corroborating sources before presenting a historical account.`,basis:"Historical documents, archives and primary records",method:"Find dated evidence; cross-check independent records; identify disagreements",confidence:"Not assessed — evidence not yet retrieved",source:"Research required · no source retrieved"},
    present:{heading:`Current research: ${title}`,text:`Current information about “${title}” has not been retrieved. A proper result should show the latest observation date, data provider and any limitations.`,basis:"Current measurements, official datasets and recent reporting",method:"Retrieve current records; check timestamp, provider and coverage",confidence:"Not assessed — no current data retrieved",source:"Live source not connected"},
    future:{heading:`Future scenarios: ${title}`,text:`No subject-specific forecast has been calculated. Future analysis should compare evidence-based models with clearly labelled hypothetical scenarios, including assumptions and uncertainty.`,basis:"Forecast models, trend analysis and stated assumptions",method:"Define time horizon; compare scenarios; report uncertainty and sensitivity",confidence:"Unknown — no model or scenario run",source:"No forecast calculated"}
  };
}
function visualMarkup(period){
  const palettes={past:["#7187d4","#b9c8ff"],present:["#39a987","#a6e6d1"],future:["#9b79d5","#d6c2ff"]};
  const [a,b]=palettes[period];
  const label={past:"HISTORICAL EVIDENCE",present:"OBSERVATION WINDOW",future:"POSSIBLE PATHWAYS"}[period];
  const shapes=period==="past"
    ? `<path d="M28 82 C75 12 120 125 170 56 S255 32 292 65" fill="none" stroke="${a}" stroke-width="3" stroke-linecap="round"/><circle cx="28" cy="82" r="6" fill="${a}"/><circle cx="170" cy="56" r="6" fill="${a}"/><circle cx="292" cy="65" r="6" fill="${a}"/><path d="M28 100H292" stroke="${b}" stroke-width="1.5" stroke-dasharray="4 5"/>`
    : period==="present"
    ? `<circle cx="160" cy="57" r="43" fill="${b}" opacity=".55"/><circle cx="160" cy="57" r="27" fill="none" stroke="${a}" stroke-width="2"/><path d="M160 17V57L187 72" fill="none" stroke="${a}" stroke-width="3" stroke-linecap="round"/><circle cx="160" cy="57" r="4" fill="${a}"/>`
    : `<path d="M25 88 C80 85 100 72 145 62 S230 28 295 18" fill="none" stroke="${a}" stroke-width="3" stroke-linecap="round"/><path d="M25 88 C80 85 100 72 145 62 S230 45 295 38" fill="none" stroke="${b}" stroke-width="2" stroke-dasharray="5 5"/><path d="M25 88 C80 85 100 72 145 62 S230 12 295 2" fill="none" stroke="${b}" stroke-width="2" stroke-dasharray="5 5" opacity=".7"/><circle cx="25" cy="88" r="5" fill="${a}"/><circle cx="145" cy="62" r="5" fill="${a}"/>`;
  return `<div class="result-visual"><div class="visual-label">${label}</div><div class="visual-stage"><svg viewBox="0 0 320 115" role="img" aria-label="${label} conceptual illustration">${shapes}</svg></div><div class="visual-label">CONCEPTUAL VIEW · NOT RAW DATA</div></div>`;
}
function render(period){
  $$(".time-tab").forEach(b=>{const on=b.dataset.period===period;b.classList.toggle("active",on);b.setAttribute("aria-selected",String(on))});
  const d=getData(activeSubject)[period];
  const label=period.toUpperCase()+" PERSPECTIVE";
  $("#periodPanel").innerHTML=`
    <div class="result-main">
      <div class="period-kicker">${label}</div>
      <h3>${escapeHtml(d.heading)}</h3>
      <p>${escapeHtml(d.text)}</p>
      <div class="method-list">
        <div class="method-row"><span class="method-bullet"></span><span><b>Evidence / basis:</b> ${escapeHtml(d.basis)}</span></div>
        <div class="method-row"><span class="method-bullet"></span><span><b>Analysis method:</b> ${escapeHtml(d.method)}</span></div>
        <div class="method-row"><span class="method-bullet"></span><span><b>Confidence / uncertainty:</b> ${escapeHtml(d.confidence)}</span></div>
      </div>
      <div class="source-status">${escapeHtml(d.source)}</div>
    </div>
    ${visualMarkup(period)}
    <div class="analysis-grid">
      <div class="analysis-card"><small>WHAT THIS IS BASED ON</small><b>Evidence</b><p>${escapeHtml(d.basis)}</p></div>
      <div class="analysis-card"><small>HOW IT IS ASSESSED</small><b>Method</b><p>${escapeHtml(d.method)}</p></div>
      <div class="analysis-card"><small>HOW CERTAIN?</small><b>Confidence</b><p>${escapeHtml(d.confidence)}</p></div>
    </div>`;
}
function explore(q){
  if(!q.trim()) return;
  activeSubject=q.trim();
  $("#resultTitle").textContent=activeSubject;
  $("#resultsSection").hidden=false;
  render("past");
  $("#resultsSection").scrollIntoView({behavior:"smooth",block:"nearest"});
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
