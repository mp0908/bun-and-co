const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");

let cartData = [];

cartBtn.addEventListener("click", () => {
  cart.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    cartData.push(e.target.dataset.id);

    cartCount.textContent = cartData.length;

    const item = document.createElement("div");
    item.textContent = "Burger #" + e.target.dataset.id;
    cartItems.appendChild(item);
  }
});