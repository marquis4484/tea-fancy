// global imports
import "./src/toggleSidebar.js";
import "./src/cart/toggleCart.js";
import "./src/cart/setupCart.js";

// specific imports
import fetchProducts from "./src/fetchProducts.js";
import { setupStore } from "./src/store.js";

const init = async () => {
  const products = await fetchProducts();
  if (products) {
    setupStore(products);
  }
};

window.addEventListener("DOMContentLoaded", init);
