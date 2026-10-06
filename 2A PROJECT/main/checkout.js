/**
 * Checkout Page Logic (checkout.js)
 * Manages order summary rendering, billing form validation, order placement, clearing cart, and order success UI.
 */

document.addEventListener('DOMContentLoaded', () => {

  const checkoutFlowSection = document.getElementById('checkoutFlowSection');
  const orderSuccessSection = document.getElementById('orderSuccessSection');
  const orderSummaryList = document.getElementById('orderSummaryList');
  const checkoutSubtotal = document.getElementById('checkoutSubtotal');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutAlert = document.getElementById('checkoutAlert');

  // Load cart from localStorage
  const cart = window.getCart ? window.getCart() : (JSON.parse(localStorage.getItem('cart')) || []);

  // Update navbar badge count
  if (window.updateCartBadge) {
    window.updateCartBadge();
  }

  // ── Render Order Summary List ──
  function renderOrderSummary() {
    if (!orderSummaryList || !checkoutSubtotal) return;

    if (!cart || cart.length === 0) {
      orderSummaryList.innerHTML = `<li class="order-summary-item text-muted">No items in cart.</li>`;
      checkoutSubtotal.textContent = '$0.00';
      return;
    }

    let subtotal = 0;

    const listHtml = cart.map(item => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 1;
      const total = price * qty;
      subtotal += total;

      return `
        <li class="order-summary-item">
          <div>
            <p class="order-item-title">${item.title}</p>
            <span class="order-item-qty">Qty: ${qty} × $${price.toFixed(2)}</span>
          </div>
          <span class="order-item-total">$${total.toFixed(2)}</span>
        </li>
      `;
    }).join('');

    orderSummaryList.innerHTML = listHtml;
    checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  }

  renderOrderSummary();

  // ── Form Submission Handling ──
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check form validity using HTML5 validity
      if (!checkoutForm.checkValidity()) {
        e.stopPropagation();
        checkoutForm.classList.add('was-validated');

        if (checkoutAlert) {
          checkoutAlert.className = 'alert alert-danger mb-4 d-block';
          checkoutAlert.textContent = 'Please fill in all required billing information fields.';
        }
        return;
      }

      // Generate Order ID (e.g. ORD-2026-001)
      const randomNum = Math.floor(100 + Math.random() * 900);
      const generatedOrderId = `ORD-2026-${randomNum}`;

      // Clear cart from localStorage
      localStorage.removeItem('cart');

      // Update navbar cart badge to 0
      if (window.updateCartBadge) {
        window.updateCartBadge();
      }

      // Populate Order ID in Success Screen
      const orderIdValueElem = document.getElementById('orderIdValue');
      if (orderIdValueElem) {
        orderIdValueElem.textContent = generatedOrderId;
      }

      // Hide Checkout Flow and Show Success UI
      if (checkoutFlowSection) {
        checkoutFlowSection.classList.add('d-none');
      }
      if (orderSuccessSection) {
        orderSuccessSection.classList.remove('d-none');
      }

      // Scroll smoothly to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
