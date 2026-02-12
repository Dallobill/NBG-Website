document.addEventListener("DOMContentLoaded", function () {
  initHamburgerMenu();
  initFAQAccordion();
  initContactForm();
});

function initHamburgerMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (!hamburger || !navMenu) return;

  const closeMenu = () => navMenu.classList.remove("show");
  const toggleMenu = () => navMenu.classList.toggle("show");

  // Click toggles
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Keyboard toggles (Enter / Space)
  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close menu when clicking a nav link
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    const clickedInsideMenu = navMenu.contains(e.target);
    const clickedHamburger = hamburger.contains(e.target);
    if (!clickedInsideMenu && !clickedHamburger) closeMenu();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

function initFAQAccordion() {
  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const isCurrentlyOpen = answer && answer.style.display === "block";

      // Close all answers
      document.querySelectorAll(".faq-answer").forEach((a) => {
        a.style.display = "none";
      });

      // Toggle the clicked answer
      if (answer && !isCurrentlyOpen) {
        answer.style.display = "block";
      }
    });
  });
}

function initContactForm() {
  const contactForm = document.querySelector("#contact form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // Stop normal form submission 
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const formData = new FormData(this);

    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      // Submit to Formspree
      const response = await fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        //Success! Show Message
        showSuccessMessage(this);
        this.reset(); // Clear the form
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      // Error handling
      alert('Sorry, there was an error sending your message. Please try emailing us directly at northeastbucketgetters@gmail.com');
    } finally {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

function showSuccessMessage(form) {
  // Create success message
  const successDiv = document.createElement('div');
  successDiv.style.cssText = `
    background: linear-gradient(135deg, #28a745, #20c997);
    color: white;
    padding: 20px;
    border-radius: 14px;
    margin-top: 20px;
    text-align: center;
    font-weight: 700;
    box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3);
    animation: slideIn 0.4s ease;
    `;

    successDiv.innerHTML = `
      <div style="font-size: 48px; margin-bottom: 10px;"></div>
      <h3 style="margin: 0 0 10px 0; font-size: 1.5rem;">Message Sent</h3>
      <p style="margin: 0; opacity: 0.95;">We'll get back to you within 24-48 hours.</p>
      `;

      // Insert after form
      form.parentNode.insertBefore(successDiv, form.nextSibling);

      // Remove message after 8 seconds
      setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transition = 'opacity 0.5s ease';
        setTimeout(() => successDiv.remove(), 500);
      }, 8000);
}
