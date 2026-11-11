const groups={"career":{"title":"Career","back":"education.html","items":["Awards & Achievements","Mentoring & Knowledge Sharing","Professional Development","Innovation, R&D & PLC","CQI Excellence Programmes","PSPM Analysis & Monitoring","Special Assignments","Teaching Materials","Student Work & Outcomes"]},"academia":{"title":"Academia","back":"research.html","items":["Certifications & Accreditation","Scopus","Google Scholar","Academia.edu","Publications","Research Grants"]},"tech":{"title":"Tech","back":"technology.html","items":["Certifications & Accreditation","GitHub Repositories","Practice Reports","Training Reports","Training Recordings"]}};
const params=new URLSearchParams(window.location.search);const item=params.get("item")||"";const m=/^(career|academia|tech)-(0[1-9]|1[0-9])$/.exec(item);const group=m&&groups[m[1]];const index=m?Number(m[2])-1:-1;const title=group&&group.items[index];
const heading=document.getElementById("collection-title");const crumb=document.getElementById("collection-breadcrumb");const groupLabel=document.getElementById("collection-pillar");const intro=document.getElementById("collection-intro");
if(title){document.title=title+" | Aiman Fikri Jamaludin";heading.textContent=title;crumb.textContent="← "+group.title;crumb.href=group.back;groupLabel.textContent=group.title+" / Portfolio collection";intro.textContent="This collection is being curated. Verified work, documents and supporting materials will be added here.";}else{document.title="Portfolio Collections | Aiman Fikri Jamaludin";heading.textContent="Portfolio Collections";crumb.textContent="← My Portfolio";crumb.href="index.html#pillars";groupLabel.textContent="Career · Academia · Tech";intro.textContent="Browse the three professional pillars from the homepage.";}

/* Featured teaching resource for Career → Teaching Materials */
if(item==="career-08"){
  intro.textContent="Browse my Mathematics Learning Hub below.";
  const panel=document.getElementById("teaching-site-panel");
  const empty=document.querySelector(".empty-gallery");
  if(panel&&empty){
    panel.hidden=false;
    empty.hidden=true;
    const frame=document.getElementById("teaching-site-frame");
    if(frame&&frame.dataset.src)frame.src=frame.dataset.src;
  }
}
