// =========================
// HERO BANNER SLIDER
// =========================
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 3500); // Auto slide every 3.5s


// =========================
// PRODUCT DATA (MANUAL)
// =========================
const productData = {
  "new-arrivals": [
    { img: "images/f1.webp", name: "Men’s Casual Shirt", price: "₹799", alt: "Men’s Casual Cotton Shirt for Daily Wear" },
    { img: "images/w1.webp", name: "Women’s Stylish Kurti", price: "₹999", alt: "Elegant Women’s Stylish Kurti with Embroidery" },
    { img: "images/f4.webp", name: "Men’s Slim Fit Jeans", price: "₹1,499", alt: "Men’s Slim Fit Blue Denim Jeans" },
    { img: "images/w2.webp", name: "Women’s Crop Top", price: "₹699", alt: "Trendy Women’s Crop Top Casual Wear" }
  ],

  "hot-deals": [
    { img: "images/e1.webp", name: "Bluetooth Headphones", price: "₹1,299", alt: "Wireless Bluetooth Headphones with Mic" },
    { img: "images/e2.webp", name: "Smartphone 5G", price: "₹15,999", alt: "Latest 5G Smartphone with High-Resolution Display" },
    { img: "images/e3.webp", name: "Smartwatch Pro", price: "₹3,499", alt: "Smartwatch Pro with Fitness Tracking Features" },
    { img: "images/e4.webp", name: "Laptop Backpack", price: "₹899", alt: "Durable Laptop Backpack with Multiple Compartments" }
  ],

  "trending-offers": [
    { img: "images/e5.webp", name: "LED TV 43-inch", price: "₹21,999", alt: "LED TV 43-inch Full HD Smart Display" },
    { img: "images/a10.webp", name: "Mixer Grinder", price: "₹2,499", alt: "Powerful Mixer Grinder for Kitchen Use" },
    { img: "images/a4.webp", name: "Microwave Oven", price: "₹7,899", alt: "Compact Microwave Oven for Home Cooking" },
    { img: "images/a1.webp", name: "Air Conditioner 1.5T", price: "₹32,499", alt: "Energy Efficient Air Conditioner 1.5 Ton Capacity" }
  ],

  "seasonal-picks": [
    { img: "images/z1.webp", name: "Face Cream", price: "₹499", alt: "Moisturizing Face Cream for Glowing Skin" },
    { img: "images/z2.webp", name: "Hair Dryer", price: "₹1,299", alt: "Compact Hair Dryer with Fast Drying Feature" },
    { img: "images/z3.webp", name: "Perfume Set", price: "₹899", alt: "Long-Lasting Perfume Set for Men and Women" },
    { img: "images/z4.webp", name: "Makeup Kit", price: "₹1,999", alt: "All-in-One Makeup Kit with Brushes and Shades" }
  ]
};


// =========================
// PRODUCT RENDER FUNCTION
// =========================
function renderProducts(sectionId, products = []) {
  const container = document.getElementById(sectionId);
  if (!container) return;

  // Clear previous content
  container.innerHTML = "";

  // ✅ Sanitize product data to prevent XSS
  const escapeHTML = (str) =>
    String(str || "").replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[m]));

  // ✅ Fallback for invalid data
  if (!Array.isArray(products) || products.length === 0) {
    container.innerHTML = "<p>No products available.</p>";
    return;
  }

  // ✅ Create and render cards
  products.forEach((product) => {
    const name = escapeHTML(product.name);
    const price = escapeHTML(product.price);
    const img = escapeHTML(product.img);

    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${img}" alt="${name}" loading="lazy" decoding="async">
      <div class="product-info">
        <h4>${name}</h4>
        <p class="price">${price}</p>
      </div>
    `;

    // ✅ Navigate to product details safely
    card.addEventListener("click", function () {
      window.location.href =
        "product-details.html?name=" +
        encodeURIComponent(product.name) +
        "&price=" +
        encodeURIComponent(product.price) +
        "&img=" +
        encodeURIComponent(product.img);
    });

    container.appendChild(card);
  });
}


updateCartCount();
// =========================
// INITIAL RENDER
// =========================
renderProducts("new-arrivals", productData["new-arrivals"]);
renderProducts("hot-deals", productData["hot-deals"]);
renderProducts("trending-offers", productData["trending-offers"]);
renderProducts("seasonal-picks", productData["seasonal-picks"]);
