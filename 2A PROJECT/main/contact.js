/**
 * Contact Page Specific Script (contact.js)
 * Handles client-side form validation and success message notification.
 */

document.addEventListener('DOMContentLoaded', () => {

  const contactForm = document.getElementById('contactForm');
  const contactAlert = document.getElementById('contactAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstName = document.getElementById('firstName')?.value.trim();
      const lastName = document.getElementById('lastName')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();

      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // 1. Check for empty fields
      if (!firstName || !lastName || !email || !message) {
        if (contactAlert) {
          contactAlert.className = 'alert alert-danger mb-4 d-block';
          contactAlert.textContent = 'Please fill in all required fields marked with *';
        }
        return;
      }

      // 2. Validate email format
      if (!emailRegex.test(email)) {
        if (contactAlert) {
          contactAlert.className = 'alert alert-danger mb-4 d-block';
          contactAlert.textContent = 'Please enter a valid email address.';
        }
        return;
      }

      // 3. Success state
      if (contactAlert) {
        contactAlert.className = 'alert alert-success mb-4 d-block';
        contactAlert.textContent = 'Thank you! Your message has been sent successfully.';
      }

      // Reset form fields
      contactForm.reset();

      // Auto-hide alert after 6 seconds
      setTimeout(() => {
        if (contactAlert) {
          contactAlert.className = 'alert alert-success mb-4 d-none';
        }
      }, 6000);
    });
  }

});
