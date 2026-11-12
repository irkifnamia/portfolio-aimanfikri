/* Allow only catalogued GitHub PDF paths; never use a URL supplied in the query. */
(function(){
  const id=new URLSearchParams(location.search).get("id");
  const cert=(window.portfolioCertificateCatalog||[]).find(c=>c.id===id);
  const title=document.getElementById("certificate-page-title");
  const sub=document.getElementById("certificate-document-title");
  const root=document.getElementById("trainer-pdf-pages");
  if(!cert){
    title.textContent="Certificate not found";
    sub.textContent="No matching document";
    root.remove();
    document.getElementById("trainer-pdf-status").textContent="Please select a certificate from the Tech portfolio.";
    return;
  }
  document.title=cert.title+" | Aiman Fikri Jamaludin";
  title.textContent=cert.title;
  sub.textContent=cert.title;
  root.dataset.src=cert.src;
})();