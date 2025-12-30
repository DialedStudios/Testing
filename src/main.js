const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initReveal() {
  if (prefersReduced) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function highlightNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link").forEach((link) => {
    const href = link.getAttribute("href");
    if ((href === "./" && path === "index.html") || href === path) {
      link.classList.add("active");
    }
  });
}

function wireNewsletterForms() {
  const forms = document.querySelectorAll("[data-newsletter]");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (!input) return;
      input.blur();
      const toast = document.createElement("div");
      toast.textContent = "Got it. We'll keep you in the loop.";
      toast.style.position = "fixed";
      toast.style.bottom = "22px";
      toast.style.right = "22px";
      toast.style.padding = "12px 16px";
      toast.style.borderRadius = "12px";
      toast.style.background = "rgba(123, 240, 198, 0.15)";
      toast.style.border = "1px solid rgba(123, 240, 198, 0.5)";
      toast.style.color = "#f5f7fa";
      toast.style.boxShadow = "0 12px 40px rgba(0,0,0,0.35)";
      toast.style.opacity = "0";
      toast.style.transform = "translateY(6px)";
      toast.style.transition = "opacity 180ms ease, transform 220ms ease";
      document.body.appendChild(toast);
      requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
      });
      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(6px)";
        toast.addEventListener("transitionend", () => toast.remove(), { once: true });
      }, 2600);
      input.value = "";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  highlightNav();
  wireNewsletterForms();
});
