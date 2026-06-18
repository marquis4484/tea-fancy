// global imports
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";
// specific
import { addToCart } from "../cart/setupCart.js";
import { getElement, formatPrice, allProductsUrl } from "../utils.js";

// selections
const loading = getElement(".page-loading");
const centerDOM = getElement(".single-product-center");
const pageTitleDOM = getElement(".page-hero-title");
const imgDOM = getElement(".single-product-img");
const titleDOM = getElement(".single-product-title");
const companyDOM = getElement(".single-product-company");
const priceDOM = getElement(".single-product-price");
const descDOM = getElement(".single-product-desc");
const sourcesDOM = getElement(".single-product-sources");
const cartBtn = getElement(".addToCartBtn");

// cart product
let productID;

const isUrl = (value) => {
  try {
    return Boolean(new URL(value));
  } catch (error) {
    return false;
  }
};

const escapeHTML = (value) => {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

const getSourceMarkup = (source) => {
  if (typeof source === "string") {
    const text = source.trim();
    if (!text) return "";
    if (isUrl(text)) {
      const escapedUrl = escapeHTML(text);
      return `<li><a href="${escapedUrl}" target="_blank" rel="noopener noreferrer">${escapedUrl}</a></li>`;
    }
    return `<li>${escapeHTML(text)}</li>`;
  }

  if (source && typeof source === "object") {
    const label = source.label || source.name || source.title || source.url;
    const url = source.url || source.href || source.link;
    if (url && isUrl(url)) {
      const escapedUrl = escapeHTML(url);
      return `<li><a href="${escapedUrl}" target="_blank" rel="noopener noreferrer">${escapeHTML(label || url)}</a></li>`;
    }
    if (label) return `<li>${escapeHTML(label)}</li>`;
  }

  return "";
};

const displaySources = (sources) => {
  const productSources = Array.isArray(sources)
    ? sources
    : sources
      ? [sources]
      : [];
  const sourcesMarkup = productSources.map(getSourceMarkup).join("");

  if (!sourcesMarkup) {
    sourcesDOM.innerHTML = "";
    return;
  }

  sourcesDOM.innerHTML = `
    <h3 class="single-product-sources-title">Sources</h3>
    <ul class="single-product-sources-list">
      ${sourcesMarkup}
    </ul>
  `;
};

// shows product when page loads
window.addEventListener("DOMContentLoaded", async function () {
  const urlID = window.location.search;
  console.log(urlID);

  try {
    const response = await fetch(`${allProductsUrl}${urlID}`);

    if (response.status >= 200 && response.status <= 299) {
      const exactRes = await response.json();
      // grab data
      const newUrlId = urlID.slice(4);
      const res = exactRes.filter((item) => {
        return item.id == newUrlId;
      });
      console.log(res);
      const product = res[0];

      const { id, fields } = product;
      productID = id;

      const { name, company, price, description } = fields;
      const productSources =
        fields.sources || fields.source || fields.Sources || fields.Source;
      const image = fields.image[0].thumbnails.large.url;
      // set values

      document.title = `${name} `;
      pageTitleDOM.textContent = `${name}`;
      imgDOM.src = image;
      titleDOM.textContent = name;
      companyDOM.textContent = `by ${company}`;
      priceDOM.textContent = formatPrice(price);
      descDOM.textContent = description;
      displaySources(productSources);
  
    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `
    <div>
    <h3 class="error">sorry, something went wrong</h3>
    <a href="index.html" class="btn">back home</a>
    </div> 
     `;
    }
  } catch (error) {
    console.log(error);
  }

  loading.style.display = "none";
});

cartBtn.addEventListener("click", function () {
  addToCart(productID);
});
