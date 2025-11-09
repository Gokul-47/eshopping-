// =========================
// cart-utils.js (Secure Version)
// =========================

// Sanitize text to prevent XSS
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[m]));
}

// Add product to cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!Array.isArray(cart)) cart = [];

  // Ensure product has quantity
  const existing = cart.find((item) => item.name === product.name);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    product.quantity = product.quantity || 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Get cart items
function getCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return Array.isArray(cart) ? cart : [];
}

// Clear cart
function clearCart() {
  localStorage.setItem("cart", JSON.stringify([]));
  updateCartCount();
  renderCartItems();
}

// Remove product from cart by name
function removeFromCart(productName) {
  let cart = getCart().filter(item => item.name !== productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

// Update cart count in navbar
function updateCartCount() {
  const cart = getCart();
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    countEl.textContent = count;
  }
}

// Render cart items
function renderCartItems() {
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;

  const cart = getCart();
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "Your cart is empty.";
    cartContainer.appendChild(emptyMsg);
    return;
  }

  cart.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("cart-item");

    // Image
    const img = document.createElement("img");
    img.src = product.img;
    img.alt = escapeHTML(product.name);
    img.loading = "lazy";

    // Info
    const info = document.createElement("div");
    info.classList.add("cart-info");

    const nameEl = document.createElement("h4");
    nameEl.textContent = product.name;

    const priceEl = document.createElement("p");
    priceEl.textContent = `Price: ${product.price}`;

    const quantityEl = document.createElement("p");
    quantityEl.textContent = `Quantity: ${product.quantity || 1}`;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeFromCart(product.name));

    info.appendChild(nameEl);
    info.appendChild(priceEl);
    info.appendChild(quantityEl);
    info.appendChild(removeBtn);

    card.appendChild(img);
    card.appendChild(info);
    cartContainer.appendChild(card);
  });
}

// Initialize cart page
function initCartPage() {
  updateCartCount();
  renderCartItems();
}

// Run automatically if on cart page
if (document.getElementById("cart-items")) {
  initCartPage();
}
