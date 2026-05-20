const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");

let cartData = [];

/* CART TOGGLE */
cartBtn.addEventListener("click", () => {
  cart.classList.toggle("active");
});

/* ADD TO CART ubacuje u kolica*/
document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    cartData.push(e.target.dataset.id);

    cartCount.textContent = cartData.length;

    const item = document.createElement("div");
    item.textContent = "Burger #" + e.target.dataset.id;

    cartItems.appendChild(item);
  }
});

/* SCROLL REVEAL kontent reveal na skrolu */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.15
});

reveals.forEach(el => observer.observe(el));