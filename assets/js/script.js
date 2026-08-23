document.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
  initFAQAccordion();
  initContactForm();
});

function initHamburgerMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (!hamburger || !navMenu) return;

  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-controls", "nav-menu");

  const setMenuState = (isOpen) => {
    navMenu.classList.toggle("show", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  };

  const toggleMenu = () => setMenuState(!navMenu.classList.contains("show"));
  const closeMenu = () => setMenuState(false);

  hamburger.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  hamburger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMenu();
    }
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) closeMenu();
  });
}

function initFAQAccordion() {
  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach((button, index) => {
    const answer = button.nextElementSibling;
    if (!answer) return;

    const answerId = `faq-answer-${index + 1}`;
    answer.id = answerId;
    button.setAttribute("aria-controls", answerId);
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
      const wasOpen = button.getAttribute("aria-expanded") === "true";

      faqButtons.forEach((otherButton) => {
        const otherAnswer = otherButton.nextElementSibling;
        otherButton.setAttribute("aria-expanded", "false");
        if (otherAnswer) otherAnswer.style.display = "none";
      });

      if (!wasOpen) {
        answer.style.display = "block";
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function initContactForm() {
  const contactForm = document.querySelector("#contact form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    const formData = new FormData(this);

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    try {
      const response = await fetch(this.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submission failed");

      showSuccessMessage(this);
      this.reset();
    } catch (error) {
      alert(
        "Sorry, there was an error sending your message. Please email us directly at northeastbucketgetters@gmail.com."
      );
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
}

function showSuccessMessage(form) {
  const existingMessage = document.querySelector(".form-success-message");
  if (existingMessage) existingMessage.remove();

  const successMessage = document.createElement("div");
  successMessage.className = "form-success-message";
  successMessage.setAttribute("role", "status");
  successMessage.innerHTML = `
    <h3>Message sent.</h3>
    <p>Thanks for reaching out. NBG will follow up as soon as possible.</p>
  `;

  form.parentNode.insertBefore(successMessage, form.nextSibling);

  setTimeout(() => {
    successMessage.remove();
  }, 8000);
}
