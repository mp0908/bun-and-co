const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartSummaryCount = document.getElementById("cartSummaryCount");
const cartSummaryTotal = document.getElementById("cartSummaryTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

const checkoutSection = document.getElementById("checkout");
const checkoutItems = document.getElementById("checkoutItems");
const checkoutItemCount = document.getElementById("checkoutItemCount");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutMessage = document.getElementById("checkoutMessage");

const products = {
  1: { id: 1, name: "Classic Bun", price: 9.99 },
  2: { id: 2, name: "Smoky BBQ", price: 10.99 },
  3: { id: 3, name: "Cheese Bomb", price: 11.99 },
  4: { id: 4, name: "Spicy Heat", price: 12.49 },
  5: { id: 5, name: "Double Stack", price: 13.99 },
  6: { id: 6, name: "Dry Aged Special", price: 15.99 }
};

let cartData = [];

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function getCartCount() {
  return cartData.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function renderCart() {
  const count = getCartCount();
  const total = getCartTotal();

  cartCount.textContent = count;
  cartSummaryCount.textContent = count;
  cartSummaryTotal.textContent = formatPrice(total);
  checkoutItemCount.textContent = `${count} item${count === 1 ? "" : "s"}`;
  checkoutTotal.textContent = formatPrice(total);

  cartItems.innerHTML = "";
  checkoutItems.innerHTML = "";

  if (cartData.length === 0) {
    cartEmpty.hidden = false;
    checkoutItems.innerHTML = '<div class="checkout-item">Your order summary will appear here once you add something from the menu.</div>';
    checkoutBtn.disabled = true;
    return;
  }

  cartEmpty.hidden = true;
  checkoutBtn.disabled = false;

  cartData.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div class="cart-row">
        <strong>${item.name}</strong>
        <span>${formatPrice(item.price * item.quantity)}</span>
      </div>
      <div class="cart-item-meta">${formatPrice(item.price)} each</div>
      <div class="cart-item-controls">
        <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
        <button class="remove-btn" data-action="remove" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartItems.appendChild(cartItem);

    const checkoutItem = document.createElement("div");
    checkoutItem.className = "checkout-item";
    checkoutItem.innerHTML = `
      <div class="checkout-headline">
        <strong>${item.name}</strong>
        <span>${formatPrice(item.price * item.quantity)}</span>
      </div>
      <p>${item.quantity} x ${formatPrice(item.price)}</p>
    `;
    checkoutItems.appendChild(checkoutItem);
  });
}

function addToCart(productId) {
  const product = products[productId];
  const existingItem = cartData.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartData.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function updateQuantity(productId, action) {
  const item = cartData.find((entry) => entry.id === productId);
  if (!item) {
    return;
  }

  if (action === "increase") {
    item.quantity += 1;
  }

  if (action === "decrease") {
    item.quantity -= 1;
  }

  cartData = cartData.filter((entry) => entry.quantity > 0);
  renderCart();
}

function removeItem(productId) {
  cartData = cartData.filter((item) => item.id !== productId);
  renderCart();
}

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

checkoutBtn.addEventListener("click", () => {
  if (cartData.length === 0) {
    return;
  }

  cart.classList.remove("active");
  checkoutSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-id]");

  if (addButton && !addButton.dataset.action) {
    addToCart(Number(addButton.dataset.id));
    cart.classList.add("active");
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) {
    return;
  }

  const productId = Number(actionButton.dataset.id);
  const action = actionButton.dataset.action;

  if (action === "increase" || action === "decrease") {
    updateQuantity(productId, action);
  }

  if (action === "remove") {
    removeItem(productId);
  }
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (cartData.length === 0) {
    checkoutMessage.textContent = "Add at least one burger before placing your order.";
    return;
  }

  const formData = new FormData(checkoutForm);
  const customerName = formData.get("customerName");
  const orderType = formData.get("orderType");

  checkoutMessage.textContent = `Thanks, ${customerName}. Your ${orderType.toString().toLowerCase()} order has been received and is ready for the next payment step.`;
  checkoutForm.reset();
  cartData = [];
  renderCart();
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

renderCart();
