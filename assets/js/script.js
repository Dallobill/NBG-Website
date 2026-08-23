// Load responsive overrides after the base stylesheet.
// Keeping this separate lets us harden phone/tablet layouts without destabilizing desktop CSS.
(() => {
  if (!document.querySelector('link[data-nbg-responsive="true"]')) {
    const responsiveStyles = document.createElement("link");
    responsiveStyles.rel = "stylesheet";
    responsiveStyles.href = "assets/css/responsive.css";
    responsiveStyles.setAttribute("data-nbg-responsive", "true");
    document.head.appendChild(responsiveStyles);
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
  initFAQAccordion();
  initContactForm();
  initTrainingProof();
});

function initTrainingProof() {
  const resultsSection = document.getElementById("results");
  if (!resultsSection) return;

  const resultsNavLink = document.querySelector('a[href="#results"]');
  if (resultsNavLink) resultsNavLink.textContent = "TRAINING IN ACTION";

  addTrainingProofStyles();

  resultsSection.innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Real NBG Training Footage</p>
      <h2>See NBG Training in Action</h2>
      <p>
        These are real posts from NBG training. Watch the sessions, see the coaching environment,
        and get a feel for how athletes work before booking a workout.
      </p>
    </div>

    <div class="instagram-proof-grid" aria-label="NBG basketball training videos from Instagram">
      <article class="instagram-proof-card">
        <div class="instagram-proof-label">NBG Training Post</div>
        <blockquote
          class="instagram-media"
          data-instgrm-permalink="https://www.instagram.com/reel/DNTicwHIWjB/"
          data-instgrm-version="14"
        >
          <a href="https://www.instagram.com/reel/DNTicwHIWjB/" target="_blank" rel="noopener">View this NBG training reel on Instagram</a>
        </blockquote>
      </article>

      <article class="instagram-proof-card">
        <div class="instagram-proof-label">NBG Training Post</div>
        <blockquote
          class="instagram-media"
          data-instgrm-permalink="https://www.instagram.com/reel/DLfdlLIOeka/"
          data-instgrm-version="14"
        >
          <a href="https://www.instagram.com/reel/DLfdlLIOeka/" target="_blank" rel="noopener">View this NBG training reel on Instagram</a>
        </blockquote>
      </article>

      <article class="instagram-proof-card">
        <div class="instagram-proof-label">NBG Training Post</div>
        <blockquote
          class="instagram-media"
          data-instgrm-permalink="https://www.instagram.com/p/DHqmvdcMfyk/"
          data-instgrm-version="14"
        >
          <a href="https://www.instagram.com/p/DHqmvdcMfyk/" target="_blank" rel="noopener">View this NBG training post on Instagram</a>
        </blockquote>
      </article>
    </div>

    <div class="training-proof-cta">
      <div>
        <p class="eyebrow">Ready to train?</p>
        <h3>Give your athlete a chance to experience NBG firsthand.</h3>
        <p>Choose the appropriate Saturday training group or contact us for a player evaluation.</p>
      </div>
      <a class="cta-button primary" href="#training">Book Your First Workout</a>
    </div>

    <div class="benchmark-grid">
      <div><strong>Ball Handling</strong><span>Control with both hands under pressure</span></div>
      <div><strong>Shooting</strong><span>Preparation, balance, and consistency</span></div>
      <div><strong>Finishing</strong><span>Footwork, touch, and both-hand solutions</span></div>
      <div><strong>Decision-Making</strong><span>Reads, passing, spacing, and reactions</span></div>
      <div><strong>Defense</strong><span>Positioning, effort, and awareness</span></div>
      <div><strong>Confidence</strong><span>Applying skills during live play</span></div>
    </div>
  `;

  loadInstagramEmbeds();
}

function addTrainingProofStyles() {
  if (document.getElementById("nbg-training-proof-styles")) return;

  const style = document.createElement("style");
  style.id = "nbg-training-proof-styles";
  style.textContent = `
    .instagram-proof-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      align-items: start;
    }

    .instagram-proof-card {
      min-width: 0;
      padding: 12px;
      overflow: hidden;
      border: 1px solid var(--stroke);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.025);
    }

    .instagram-proof-label {
      margin-bottom: 10px;
      color: var(--orange);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.7px;
      text-transform: uppercase;
    }

    .instagram-proof-card .instagram-media {
      width: 100% !important;
      min-width: 0 !important;
      max-width: 100% !important;
      margin: 0 !important;
    }

    .instagram-proof-card > blockquote > a {
      display: flex;
      min-height: 220px;
      align-items: center;
      justify-content: center;
      padding: 24px;
      border: 1px dashed rgba(255, 255, 255, 0.16);
      border-radius: 12px;
      color: var(--orange);
      text-align: center;
      text-decoration: none;
      font-weight: 700;
    }

    .training-proof-cta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 28px;
      margin-top: 20px;
      margin-bottom: 20px;
      padding: 26px;
      border: 1px solid rgba(255, 140, 0, 0.22);
      border-radius: 16px;
      background: rgba(255, 140, 0, 0.055);
    }

    .training-proof-cta h3 {
      margin-bottom: 8px;
      font-size: 22px;
    }

    .training-proof-cta p:not(.eyebrow) {
      margin: 0;
      color: var(--muted);
      font-size: 14px;
    }

    @media (max-width: 1000px) {
      .instagram-proof-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .instagram-proof-card:last-child {
        grid-column: 1 / -1;
        width: min(100%, 520px);
        justify-self: center;
      }
    }

    @media (max-width: 640px) {
      .instagram-proof-grid {
        grid-template-columns: 1fr;
      }

      .instagram-proof-card:last-child {
        grid-column: auto;
        width: 100%;
      }

      .instagram-proof-card {
        padding: 8px;
      }

      .training-proof-cta {
        align-items: stretch;
        flex-direction: column;
        gap: 16px;
        padding: 20px;
      }

      .training-proof-cta .cta-button {
        width: 100%;
      }
    }
  `;

  document.head.appendChild(style);
}

function loadInstagramEmbeds() {
  if (window.instgrm && window.instgrm.Embeds) {
    window.instgrm.Embeds.process();
    return;
  }

  const existingScript = document.querySelector('script[src*="instagram.com/embed.js"]');
  if (existingScript) {
    existingScript.addEventListener("load", () => {
      if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process();
    }, { once: true });
    return;
  }

  const instagramScript = document.createElement("script");
  instagramScript.async = true;
  instagramScript.src = "https://www.instagram.com/embed.js";
  instagramScript.onload = () => {
    if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process();
  };
  document.body.appendChild(instagramScript);
}

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

  // Responsive navigation collapses at 1080px.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1080) closeMenu();
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
