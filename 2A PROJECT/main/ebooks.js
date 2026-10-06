/**
 * e-Books Page Specific Script (ebooks.js)
 * Handles book data structure, Add to Cart logic, and local storage integration.
 */

// ── 1. Book Data Structure (Actual Books from e-Books Page) ──
const books = [
  {
    id: 1,
    title: "Lines from poems",
    author: "Victor Hansen",
    price: 15.00,
    image: "image/book-01-free-img.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis leo…"
  },
  {
    id: 2,
    title: "Consider the visual",
    author: "Victor Hansen",
    price: 13.00,
    image: "image/book-02-free-img.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis leo…"
  },
  {
    id: 3,
    title: "Essence of the book",
    author: "Victor Hansen",
    price: 17.00,
    image: "image/book-04-free-img.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis leo…"
  },
  {
    id: 4,
    title: "Lines from poems",
    author: "Victor Hansen",
    price: 15.00,
    image: "image/book-05-free-img.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis leo…"
  },
  {
    id: 5,
    title: "Consider the visual",
    author: "Victor Hansen",
    price: 14.00,
    image: "image/book-03-free-img.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis leo…"
  },
  {
    id: 6,
    title: "Essence of the book",
    author: "Victor Hansen",
    price: 16.00,
    image: "image/book-06-free-img.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis leo…"
  }
];

// Expose books globally so other modules/scripts can access if needed
window.booksData = books;

// ── Expose cart helpers globally for cart.js ──
window.getCart = getCart;
window.saveCart = saveCart;
window.updateCartBadge = updateCartBadge;

// ── 2. Local Storage & Cart Helper Functions ──
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartBadgeElements = document.querySelectorAll('#cartBadge');
  cartBadgeElements.forEach(badge => {
    badge.textContent = totalCount;
  });
}

function addToCart(bookId) {
  const book = books.find(b => b.id === Number(bookId));
  if (!book) return;

  const cart = getCart();
  const existingItem = cart.find(item => item.id === book.id);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
      quantity: 1
    });
  }

  saveCart(cart);
}

// ── 3. Event Listeners ──
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  // Add to Cart button click handler
  const cartButtons = document.querySelectorAll('.add-to-cart-btn');
  cartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const bookId = btn.getAttribute('data-book-id');
      if (bookId) {
        addToCart(bookId);

        // Visual feedback state
        const originalText = btn.textContent;
        btn.textContent = 'Added ✓';
        btn.classList.add('btn-success');
        btn.classList.remove('btn-dark');

        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('btn-success');
          btn.classList.add('btn-dark');
        }, 1200);
      }
    });
  });
});
