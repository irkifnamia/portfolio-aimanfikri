/* Render the original GitHub-hosted PDF into canvases (no browser PDF toolbar). */
(function(){
  "use strict";
  const root=document.getElementById("trainer-pdf-pages");
  const status=document.getElementById("trainer-pdf-status");
  if(!root||!status)return;
  const pdfjs=window.pdfjsLib;
  if(!pdfjs){status.textContent="Document viewer unavailable. Please refresh the page.";return;}
  pdfjs.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const source="assets/trainer-profile-aiman.pdf";
  pdfjs.getDocument({url:source}).promise.then(async pdf=>{
    status.textContent="Rendering "+pdf.numPages+" pages…";
    for(let n=1;n<=pdf.numPages;n++){
      const page=await pdf.getPage(n);
      const wrap=document.createElement("figure");
      wrap.className="trainer-pdf-page";
      const canvas=document.createElement("canvas");
      canvas.setAttribute("role","img");
      canvas.setAttribute("aria-label","Trainer Profile page "+n+" of "+pdf.numPages);
      const label=document.createElement("figcaption");
      label.textContent="Page "+n+" of "+pdf.numPages;
      wrap.append(canvas,label);
      root.appendChild(wrap);
      const natural=page.getViewport({scale:1});
      const available=Math.max(230,Math.min(900,root.clientWidth-32));
      const scale=available/natural.width;
      const viewport=page.getViewport({scale});
      const dpr=Math.min(window.devicePixelRatio||1,2);
      canvas.width=Math.round(viewport.width*dpr);
      canvas.height=Math.round(viewport.height*dpr);
      canvas.style.width=Math.round(viewport.width)+"px";
      canvas.style.height=Math.round(viewport.height)+"px";
      const context=canvas.getContext("2d",{alpha:false});
      await page.render({canvasContext:context,viewport,transform:dpr===1?null:[dpr,0,0,dpr,0,0]}).promise;
    }
    status.hidden=true;
  }).catch(err=>{
    console.error("Unable to render PDF",err);
    status.textContent="The document could not be displayed. Please refresh the page.";
  });
})();