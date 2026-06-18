import { getElement } from "../utils.js";
import display from "../displayProducts.js";
const setupSearch = (store) => {
  const form = getElement(".input-form");
  const nameInput = getElement(".search-input");
  const filterError = getElement(".filter-error");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });
  nameInput.addEventListener("input", function () {
    const value = nameInput.value.trim().toLowerCase();
    if (value) {
      const newStore = store.filter((product) => {
        let { name } = product;
        name = name.toLowerCase();
        return name.startsWith(value);
      });
      display(newStore, getElement(".products-container"), true);
      if (newStore.length < 1) {
        filterError.textContent = "Sorry, No Products Matched Your Search";
      } else {
        filterError.textContent = "";
      }
    } else {
      filterError.textContent = "";
      display(store, getElement(".products-container"), true);
    }
  });
};

export default setupSearch;
