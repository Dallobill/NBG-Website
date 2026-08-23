document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initFAQ();
  initReveal();
  initContactForm();
  processInstagramEmbeds();
});

function initNavigation() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.querySelector(".site-nav");
  const menu = document.getElementById("nav-menu");

  if (!toggle || !nav || !menu) return;

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  };

  toggle.addEventListener("click", () => {
    setOpen(!nav.classList.contains("is-open"));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("is-open")) return;
    if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });

  const desktopQuery = window.matchMedia("(min-width: 901px)");
  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}

function initFAQ() {
  const questions = [...document.querySelectorAll(".faq-question")];

  questions.forEach((question, index) => {
    const answer = question.nextElementSibling;
    if (!answer) return;

    const answerId = `faq-answer-${index + 1}`;
    answer.id = answerId;
    question.setAttribute("aria-controls", answerId);

    question.addEventListener("click", () => {
      const opening = question.getAttribute("aria-expanded") !== "true";

      questions.forEach((otherQuestion) => {
        const otherAnswer = otherQuestion.nextElementSibling;
        otherQuestion.setAttribute("aria-expanded", "false");
        if (otherAnswer) otherAnswer.style.display = "none";
      });

      if (opening) {
        question.setAttribute("aria-expanded", "true");
        answer.style.display = "block";
      }
    });
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 }
  );

  items.forEach((item) => observer.observe(item));
}

function processInstagramEmbeds() {
  if (window.instgrm?.Embeds) {
    window.instgrm.Embeds.process();
    return;
  }

  const embedScript = document.querySelector('script[src*="instagram.com/embed.js"]');
  if (!embedScript) return;

  embedScript.addEventListener(
    "load",
    () => {
      if (window.instgrm?.Embeds) window.instgrm.Embeds.process();
    },
    { once: true }
  );
}

function initContactForm() {
  const form = document.querySelector(".contact-form");
  const status = document.querySelector(".form-status");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const originalLabel = submitButton?.textContent || "Send Message";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
    status.textContent = "";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submission failed");

      form.reset();
      status.textContent = "Message sent. NBG will follow up as soon as possible.";
    } catch (error) {
      status.textContent = "Message could not be sent. Please email northeastbucketgetters@gmail.com.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }
  });
}
