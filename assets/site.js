document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const year = document.querySelector("#year");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (year) year.textContent = new Date().getFullYear();

  const closeNav = () => {
    if (!nav || !toggle) return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });
  }

  const applyLang = (lang) => {
    const normalized = lang === "en" ? "en" : "zh";
    root.lang = normalized === "en" ? "en" : "zh-Hant";

    document.querySelectorAll("[data-zh]").forEach((el) => {
      const value = el.getAttribute(normalized === "en" ? "data-en" : "data-zh");
      if (value) el.innerHTML = value;
    });

    document.querySelectorAll(".lang-tag").forEach((btn) => {
      btn.textContent = normalized === "en" ? "EN / 中" : "中 / EN";
    });

    localStorage.setItem("shengying_lang", normalized);
  };

  const savedLang = localStorage.getItem("shengying_lang") || "zh";
  applyLang(savedLang);

  window.toggleLang = () => {
    const nextLang = root.lang === "en" ? "zh" : "en";
    applyLang(nextLang);
  };

});
