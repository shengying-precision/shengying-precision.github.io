document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
    });
  }
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
});

let currentLang = "zh";

function applyLang(lang){
  document.documentElement.lang = lang === "en" ? "en" : "zh-Hant";
  document.querySelectorAll("[data-zh]").forEach(el => {
    const value = el.getAttribute(`data-${lang}`);
    if (value) el.textContent = value;
  });
}

function toggleLang(){
  currentLang = currentLang === "zh" ? "en" : "zh";
  applyLang(currentLang);
}
