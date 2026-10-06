/**
 * e-Book Author 02 - Interactive Logic (Bootstrap 5 Integrated)
 * Reference: https://websitedemos.net/ebook-author-02/
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Navbar Auto-close on Link Click
  const navbarCollapse = document.getElementById('navbarContent');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  if (navbarCollapse && window.bootstrap) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse && navbarCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }

  // 2. Floating Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('visible', window.scrollY > 300);
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Newsletter Form Submission Handling
  const newsletterForm = document.getElementById('newsletterForm');
  const subscriberEmail = document.getElementById('subscriberEmail');
  const formAlert = document.getElementById('formAlert');

  if (newsletterForm && formAlert) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (subscriberEmail && subscriberEmail.value.trim() !== '') {
        const email = subscriberEmail.value.trim();
        formAlert.className = 'form-alert mt-3 p-2 small rounded text-center bg-success text-white d-block';
        formAlert.textContent = `Thank you for subscribing (${email})! Check your inbox soon.`;
        subscriberEmail.value = '';
        setTimeout(() => {
          formAlert.classList.add('d-none');
          formAlert.classList.remove('d-block');
        }, 5000);
      }
    });
  }

  // 4. ScrollSpy Nav Highlight
  const sections = document.querySelectorAll('section[id], footer[id]');
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + section.offsetHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });
    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) link.classList.add('active');
      });
    }
  });

});
