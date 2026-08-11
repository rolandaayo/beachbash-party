"use client";

export type CartAddDetail = {
  fromX: number;
  fromY: number;
  label?: string;
};

/** Fly a ticket emoji into the nav cart, then notify the cart icon to bounce. */
export function flyToCart(fromEl: HTMLElement | null, label = "🎟️") {
  const cart = document.getElementById("nav-cart-btn");
  if (!fromEl || !cart) {
    window.dispatchEvent(new CustomEvent("bb-cart-bump"));
    return;
  }

  const start = fromEl.getBoundingClientRect();
  const end = cart.getBoundingClientRect();

  const flyer = document.createElement("div");
  flyer.className = "cart-flyer";
  flyer.textContent = label;
  flyer.style.left = `${start.left + start.width / 2}px`;
  flyer.style.top = `${start.top + start.height / 2}px`;
  document.body.appendChild(flyer);

  // Force layout then animate toward cart
  requestAnimationFrame(() => {
    const dx = end.left + end.width / 2 - (start.left + start.width / 2);
    const dy = end.top + end.height / 2 - (start.top + start.height / 2);
    flyer.style.setProperty("--cart-dx", `${dx}px`);
    flyer.style.setProperty("--cart-dy", `${dy}px`);
    flyer.classList.add("cart-flyer-go");
  });

  const finish = () => {
    flyer.remove();
    window.dispatchEvent(new CustomEvent("bb-cart-bump"));
  };

  flyer.addEventListener("animationend", finish, { once: true });
  setTimeout(finish, 700);
}
