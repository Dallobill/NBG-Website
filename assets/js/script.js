
document.addEventListener("DOMContentLoaded", function () {
  initHamburgerMenu();
  initFAQAccordion();
  initContactForm();
});


function initHamburgerMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (!hamburger || !navMenu) return;

  // Toggle menu on hamburger click
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  // Close menu when clicking a nav link
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });
}

function initFAQAccordion() {
  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const isCurrentlyOpen = answer.style.display === "block";

      // Close all answers first
      document.querySelectorAll(".faq-answer").forEach((a) => {
        a.style.display = "none";
      });

      // Toggle the clicked answer
      if (!isCurrentlyOpen) {
        answer.style.display = "block";
      }
    });
  });
}


function initContactForm() {
  const contactForm = document.querySelector("#contact form");

  if (!contactForm) return;

  // Add loading state on form submission
  contactForm.addEventListener("submit", function (e) {
    const submitBtn = this.querySelector('button[type="submit"]');

    if (!submitBtn) return;

    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.6";
    submitBtn.style.cursor = "not-allowed";

    // Formspree will redirect after submission
    // Fallback timeout in case it doesn't
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      submitBtn.style.cursor = "pointer";
    }, 5000);
  });
}
