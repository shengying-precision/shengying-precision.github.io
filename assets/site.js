
let currentLang="zh";
function toggleLang(){
 currentLang = currentLang==="zh"?"en":"zh";
 document.querySelectorAll("[data-zh]").forEach(el=>{
   el.innerText = el.getAttribute("data-"+currentLang);
 });
}
