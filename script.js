const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");

let cartData = [];

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (siteNav) {
  siteNav.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      body.classList.remove("menu-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    }
  });
}

cartBtn.addEventListener("click", () => {
  cart.classList.toggle("active");
});

if (cartCloseBtn) {
  cartCloseBtn.addEventListener("click", () => {
    cart.classList.remove("active");
  });
}

document.addEventListener("click", (event) => {
  if (event.target.dataset.id) {
    cartData.push(event.target.dataset.id);
    cartCount.textContent = cartData.length;

    const item = document.createElement("div");
    item.textContent = "Burger #" + event.target.dataset.id;
    cartItems.appendChild(item);
  }
});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.15
});

reveals.forEach((element) => observer.observe(element));
