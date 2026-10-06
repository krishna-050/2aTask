/**
 * Shopping Cart Page Logic (cart.js)
 * Manages cart rendering, quantity increment/decrement, item removal, and subtotal calculation.
 */

document.addEventListener('DOMContentLoaded', () => {

  const cartContainer = document.getElementById('cartContainer');

  function renderCartPage() {
    if (!cartContainer) return;

    const cart = window.getCart ? window.getCart() : (JSON.parse(localStorage.getItem('cart')) || []);

    // Update navbar badge count
    if (window.updateCartBadge) {
      window.updateCartBadge();
    }

    if (!cart || cart.length === 0) {
      // ── Empty Cart View ──
      cartContainer.innerHTML = `
        <div class="empty-cart-card mx-auto" style="max-width: 650px;">
          <div class="empty-cart-icon">
            <i class="fa-solid fa-basket-shopping"></i>
          </div>
          <h2 class="empty-cart-title">Your cart is empty.</h2>
          <p class="empty-cart-text">Looks like you haven't added any e-Books to your cart yet.</p>
          <a href="ebooks.html" class="btn btn-accent text-white py-3 px-4 fw-bold letter-spacing-2">Start Shopping</a>
        </div>
      `;
      return;
    }

    // Calculate Subtotal
    let subtotal = 0;

    const tableRows = cart.map(item => {
      const itemPrice = Number(item.price) || 0;
      const itemQty = Number(item.quantity) || 1;
      const itemTotal = itemPrice * itemQty;
      subtotal += itemTotal;

      return `
        <tr>
          <td class="text-center" style="width: 90px;">
            <img src="${item.image}" alt="${item.title}" class="img-fluid cart-item-img">
          </td>
          <td>
            <h4 class="cart-item-title">${item.title}</h4>
            <p class="cart-item-author">${item.author || 'Victor Hansen'}</p>
          </td>
          <td>
            <span class="cart-item-price">$${itemPrice.toFixed(2)}</span>
          </td>
          <td class="text-center" style="width: 140px;">
            <div class="qty-btn-group mx-auto">
              <button type="button" class="qty-btn qty-minus-btn" data-id="${item.id}" aria-label="Decrease quantity">-</button>
              <span class="qty-display">${itemQty}</span>
              <button type="button" class="qty-btn qty-plus-btn" data-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>
          </td>
          <td class="text-end">
            <span class="cart-item-total">$${itemTotal.toFixed(2)}</span>
          </td>
          <td class="text-center" style="width: 100px;">
            <button type="button" class="btn-remove-item" data-id="${item.id}">Remove</button>
          </td>
        </tr>
      `;
    }).join('');

    // ── Cart Items Table + Subtotal Layout ──
    cartContainer.innerHTML = `
      <div class="row g-4">
        <!-- Cart Items Table Column -->
        <div class="col-lg-8 col-12">
          <div class="cart-table-card table-responsive">
            <table class="table cart-table align-middle">
              <thead>
                <tr>
                  <th scope="col" class="text-center">Image</th>
                  <th scope="col">Book Name</th>
                  <th scope="col">Price</th>
                  <th scope="col" class="text-center">Quantity</th>
                  <th scope="col" class="text-end">Total</th>
                  <th scope="col" class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
          </div>
          <div class="mt-4">
            <a href="ebooks.html" class="btn btn-retailer m-0">← Continue Shopping</a>
          </div>
        </div>

        <!-- Order Summary Column -->
        <div class="col-lg-4 col-12">
          <div class="cart-summary-card">
            <h3 class="cart-summary-title">Cart Summary</h3>
            <div class="subtotal-row">
              <span class="subtotal-label">Subtotal</span>
              <span class="subtotal-amount">$${subtotal.toFixed(2)}</span>
            </div>
            <a href="checkout.html" class="btn btn-accent text-white w-100 py-3 fw-bold letter-spacing-2 text-center text-decoration-none d-block">Proceed to Checkout</a>
          </div>
        </div>
      </div>
    `;
  }

  // Render on initial load
  renderCartPage();

  // ── Event Delegation for Cart Actions (+, -, Remove) ──
  cartContainer.addEventListener('click', (e) => {
    const target = e.target;

    // 1. Plus Button (+)
    if (target.classList.contains('qty-plus-btn')) {
      const bookId = Number(target.getAttribute('data-id'));
      const cart = window.getCart();
      const item = cart.find(i => i.id === bookId);
      if (item) {
        item.quantity += 1;
        window.saveCart(cart);
        renderCartPage();
      }
    }

    // 2. Minus Button (-)
    if (target.classList.contains('qty-minus-btn')) {
      const bookId = Number(target.getAttribute('data-id'));
      let cart = window.getCart();
      const itemIndex = cart.findIndex(i => i.id === bookId);
      if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
          cart[itemIndex].quantity -= 1;
        } else {
          // Remove if quantity reaches 0
          cart.splice(itemIndex, 1);
        }
        window.saveCart(cart);
        renderCartPage();
      }
    }

    // 3. Remove Button
    if (target.classList.contains('btn-remove-item')) {
      const bookId = Number(target.getAttribute('data-id'));
      let cart = window.getCart();
      cart = cart.filter(i => i.id !== bookId);
      window.saveCart(cart);
      renderCartPage();
    }
  });

});
