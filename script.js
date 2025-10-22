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
  