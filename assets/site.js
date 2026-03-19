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

  document.querySelectorAll(".inquiry-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const mailto = form.getAttribute("data-mailto") || "sy.huachin@gmail.com";
      const company = data.get("company") || "";
      const name = data.get("name") || "";
      const email = data.get("email") || "";
      const phone = data.get("phone") || "";
      const inquiryType = data.get("inquiryType") || "RFQ";
      const volume = data.get("volume") || "";
      const specification = data.get("specification") || "";

      const subject = `[Website RFQ] ${company} / ${inquiryType}`;
      const body = [
        `Company: ${company}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Inquiry Type: ${inquiryType}`,
        `Estimated Volume: ${volume}`,
        "",
        "Product / Specification Summary:",
        `${specification}`,
        "",
        "Please attach drawings or specification files if available.",
      ].join("\n");

      window.location.href = `mailto:${mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  });
});
