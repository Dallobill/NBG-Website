document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('show');
    });

    //  Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  }

});

document.addEventListener('DOMContentLoad', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const isOpen = answer.style.display === 'block';

      document.querySelectorAll('.faq-answer').forEach(a => {
        a.style.display = 'none';
      });

      answer.style.display = isOpen ? 'none' : 'block';

    });
  });
});

document.getElementById("contactForm").addEventListener("submit", function(event) {
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();
  let errorMessage = "";

  if (!name) errorMessage += "Name is required.\n";
  if (!email) errorMessage += "Email is required.\n";
  if (!message) errorMessage += "Message is required.\n";

  if (errorMessage) {
    alert(errorMessage);
    event.preventDefault();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementaryById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const faqButtons = document.querySelectorAll('.faq-question');
  
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isCurrentlyOpen = answer.style.display === 'block';

      document.querySelectorAll('.faq-answer').forEach(a => {
        a.style.display = 'none';
      });

      if (!isCurrentlyOpen) {
        answer.style.display = 'block';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('#contact form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const submitBtn = this.querySelector('button[type="submit]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Sending...';
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }, 5000);
    });
  }
});