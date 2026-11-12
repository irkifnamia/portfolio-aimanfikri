const groups={"career":{"title":"Career","back":"education.html","items":["Awards & Achievements","Mentoring & Knowledge Sharing","Professional Development","Innovation, R&D & PLC","CQI Excellence Programmes","PSPM Analysis & Monitoring","Special Assignments","Teaching Materials","Student Work & Outcomes"]},"academia":{"title":"Academia","back":"research.html","items":["Certifications & Accreditation","Publications","Research Grants","","Publications","Research Grants"]},"tech":{"title":"Tech","back":"technology.html","items":["Certifications & Accreditation","GitHub Repositories","Practice Reports","Trainer Profile","Training Reports","Training Recordings"]}};
const params=new URLSearchParams(window.location.search);const item=params.get("item")||"";const m=/^(career|academia|tech)-(0[1-9]|1[0-9])$/.exec(item);const group=m&&groups[m[1]];const index=m?Number(m[2])-1:-1;const title=group&&group.items[index];
const heading=document.getElementById("collection-title");const crumb=document.getElementById("collection-breadcrumb");const groupLabel=document.getElementById("collection-pillar");const intro=document.getElementById("collection-intro");
if(title){document.title=title+" | Aiman Fikri Jamaludin";heading.textContent=title;crumb.textContent="← "+group.title;crumb.href=group.back;groupLabel.textContent=group.title+" / Portfolio collection";intro.textContent="This collection is being curated. Verified work, documents and supporting materials will be added here.";}else{document.title="Portfolio Collections | Aiman Fikri Jamaludin";heading.textContent="Portfolio Collections";crumb.textContent="← My Portfolio";crumb.href="index.html#pillars";groupLabel.textContent="Career · Academia · Tech";intro.textContent="Browse the three professional pillars from the homepage.";}

/* Tech collection pages use title-only headers without generic descriptions. */
if(m&&m[1]==="tech"){intro.hidden=true;}

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

/* Microsoft Power BI Data Analyst Associate credential */
if(item==="tech-01"){
  
  const panel=document.getElementById("pl300-panel");
  const placeholder=document.querySelector(".empty-gallery");
  if(panel&&placeholder){panel.hidden=false;placeholder.hidden=true;}
}

/* Verified research publications under Academia item 05. */
if(item==="academia-02"||item==="academia-05"){
  intro.hidden=true;
  const list=document.getElementById("publications-panel");
  const placeholder=document.querySelector(".empty-gallery");
  if(list&&placeholder){list.hidden=false;placeholder.hidden=true;}
}

/* Expand certificates in place; only one PDF canvas set is kept in memory. */
if(item==="tech-01"){
  const grid=document.getElementById("certificate-gallery-grid");
  const catalog=window.portfolioCertificateCatalog||[];
  if(grid){
    let active=null;
    for(const cert of catalog){
      const details=document.createElement("details");
      details.className="certificate-accordion";
      const summary=document.createElement("summary");
      summary.className="certificate-accordion-summary";
      const copy=document.createElement("span");
      copy.className="certificate-accordion-copy";
      const category=document.createElement("span");
      category.className="certificate-tile-type";
      category.textContent=cert.category;
      const title=document.createElement("strong");
      title.textContent=cert.title;
      const chevron=document.createElement("span");
      chevron.className="certificate-toggle-icon";
      chevron.setAttribute("aria-hidden","true");
      chevron.textContent="+";
      copy.append(category,title);
      summary.append(copy,chevron);
      const body=document.createElement("div");
      body.className="certificate-accordion-body";
      details.append(summary,body);
      grid.appendChild(details);
      details.addEventListener("toggle",async()=>{
        if(!details.open){
          body.replaceChildren();
          if(active===details)active=null;
          return;
        }
        if(active&&active!==details)active.open=false;
        active=details;
        if(cert.kind==="image"){
          const img=document.createElement("img");
          img.className="certificate-inline-image";
          img.src=cert.src;
          img.alt=cert.title;
          img.loading="lazy";
          img.draggable=false;
          body.appendChild(img);
          return;
        }
        const status=document.createElement("p");
        status.className="certificate-render-status";
        status.textContent="Loading certificate…";
        body.appendChild(status);
        const pdfjs=window.pdfjsLib;
        if(!pdfjs){status.textContent="Certificate viewer is unavailable. Please refresh the page.";return;}
        pdfjs.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        let pdf=null;
        try{
          pdf=await pdfjs.getDocument({url:cert.src}).promise;
          if(!details.open)return;
          for(let pageNum=1;pageNum<=pdf.numPages;pageNum++){
            const page=await pdf.getPage(pageNum);
            if(!details.open)return;
            const normal=page.getViewport({scale:1});
            const available=Math.max(220,Math.min(900,body.clientWidth-16));
            const viewport=page.getViewport({scale:available/normal.width});
            const dpr=Math.min(window.devicePixelRatio||1,2);
            const canvas=document.createElement("canvas");
            canvas.className="certificate-pdf-canvas";
            canvas.width=Math.ceil(viewport.width*dpr);
            canvas.height=Math.ceil(viewport.height*dpr);
            canvas.style.width=Math.round(viewport.width)+"px";
            canvas.style.height=Math.round(viewport.height)+"px";
            canvas.setAttribute("role","img");
            canvas.setAttribute("aria-label",cert.title+", page "+pageNum+" of "+pdf.numPages);
            body.appendChild(canvas);
            await page.render({canvasContext:canvas.getContext("2d",{alpha:false}),viewport,transform:dpr===1?null:[dpr,0,0,dpr,0,0]}).promise;
          }
          if(details.open)status.remove();
        }catch(error){
          console.error("Certificate render error",error);
          if(details.open)status.textContent="Unable to display this certificate right now.";
        }finally{
          if(pdf)pdf.destroy();
        }
      });
    }
  }
}
