# Tea Fancy

![Tea Fancy](images/TeaFancyMainPage.png)

**Tea Fancy** is an ecommerce tea website built with HTML, CSS, and vanilla JavaScript. The project includes a homepage, an aboutus page, a locations page, a contact page, a shopping page, and a page for each single product to create a  pleasant shopping experience.

## Project Overview

Tea Fancy is an ecommerce frontend project designed to promote a fictional premium tea distribution company. The application lets users browse teas and filters those tea products by search, tea type, and price! The user can open individual product detail pages with product descriptions about various tea brands so they can decide what to add to their shopping carts. Cart information is stored in localStorage, which allows product selections and totals to persist across page refreshes. 

The project uses static HTML pages for routing, shared CSS for visual design and responsiveness, and JavaScript modules for reusable behavior. Product data is fetched from an external JSON endpoint, processed into a localstorage and displayed dynamically in the shop to be reused across the cart and product detail pages. The result is a website that creates a shopping experience with just vanilla JavaScript. 

## Features

- **Responsive page layouts:** The homepage, about page, locations page, contact page, shop page, and product pages are styled for desktop, tablet, and mobile screen sizes.
- **Dynamic product catalog:** Product cards are rendered from fetched JSON data rather than hardcoded directly into the shop page.
- **Filter controls:** The shop filters are grouped into a responsive flex layout with search, tea type, and price controls.
- **Single product pages:** Product detail pages load the selected tea by URL query parameter and display its image, name, company, price, description, and source references.
- **Product sources:** Product pages support source data from the API as text, URLs, arrays, or source objects and render URL sources as external links.
- **Shopping cart drawer:** Users can open and close the cart overlay from the navigation.
- **Cart persistence:** Cart contents, item counts, and totals are saved with localStorage.
- **Cart controls:** Users can add products, remove items, and increase or decrease quantities directly in the cart.
- **Animations and visual polish:** Several pages use fade and move up animations to make the interface feel more refined.

## Overall Application Structure

The application follows a static multi-page structure supported by reusable JavaScript modules. Each HTML page contains its own page shell, navigation, cart overlay, and content section. Page specific scripts live in `src/pages/` and import shared modules for sidebar behavior, cart behavior, product rendering, filtering, and data access.

Product data flows from the external JSON endpoint defined in `src/utils.js` into `fetchProducts`, then into `setupStore`, where each product is normalized into a simpler object containing the `id`, `name`, `price`, `company`, and image URL. The shop page renders that store through `displayProducts`, while filters reuse the same store to render narrowed product lists. The product detail page reads richer API fields directly, including descriptions and source references. The cart reads products from the store, tracks selected items in memory, and writes cart state back to `localStorage`.

### `index.html` and `index.js`

`index.html` is the homepage for Tea Fancy. It introduces the brand with a full page video background, navigation, cart access, and a shopping button that sends users to the shopping page if pressed. `index.js` imports global sidebar and cart modules so the shared navigation behavior works on the homepage.

### `aboutus.html` and `src/pages/about.js`

The about page presents Tea Fancy's brand story and mission. Its layout pairs written content with a responsive image and a shop button. The page script imports the same sidebar and cart behavior used across the site, which keeps the page consistent with the broader navigation system.

### `locations.html` and `src/pages/locations.js`

The locations page displays a store location message and map image in a centered responsive layout. The page keeps the same navbar, sidebar, and cart overlay structure as the rest of the site, while its visual content focuses on the map.

### `contacts.html` and `src/pages/contacts.js`

The contact page combines a brand image with a contact form. The script listens for form submission, preventing the default page to refresh, while displaying a thank you response after submission.

### `shop.html` and `src/pages/shop.js`

The shop page is the main product catalog experience. `shop.js` fetches product data when needed, stores normalized products with `setupStore`, renders the product grid through `displayProducts`, and initializes search, tea type, and price filters. Its filter controls are arranged in responsive groups across the top of the shop area, and the "no results" message appears with the filter controls when search or price filtering returns no products. It also hides the loading screen after the page has finished preparing the catalog.

### `product.html` and `src/pages/product.js`

The product detail page reads the selected product ID from the URL query string. It fetches the product data, finds the matching item, updates the page title and product detail fields, renders product source references, and wires the add-to-cart button to the shared cart system. Its description and sources area use the available product-info space so longer text does not feel cramped. If product loading fails, it displays an error message and a link back home.

### `src/displayProducts.js`

`displayProducts` renders product cards into a target container. Each card includes an image, product name, formatted price, a link to the product detail page, and an add-to-cart button. It also attaches cart behavior when rendering the main product list.

### `src/store.js`

`store.js` manages the product store. It converts the raw API product data into the smaller structure the frontend needs and saves it to `localStorage`. It also exports `findProduct`, which the cart uses to locate product data by ID.

### `src/cart/setupCart.js`

`setupCart.js` controls the shopping cart state. It loads cart data from `localStorage`, adds new products, increases or decreases item quantities, removes products, updates cart counts and totals, renders existing cart items, and persists every cart change.

### `src/cart/addToCartDOM.js`

`addToCartDOM` creates the DOM markup for each cart item. It displays the product image, name, price, remove button, quantity controls, and current amount. This keeps cart item rendering separate from cart state logic.

### `src/cart/toggleCart.js` and `src/toggleSidebar.js`

These modules control shared overlay behavior. `toggleCart.js` opens and closes the cart drawer, while `toggleSidebar.js` opens and closes the mobile navigation sidebar. Both are imported into page scripts so the same interactions work across the site.

### `src/filters/search.js`

The search filter listens for user input in the shop search bar. It normalizes the search value for case insensitive matching, filters products by matching the start of each product name, re-renders the product grid, and displays a "no results" message when nothing matches.

### `src/filters/companies.js`

The tea type filter builds its button list dynamically from available product company type values. Selecting a button re-renders the shop grid with either all products or only products that match the selected type.

### `src/filters/price.js`

The price filter calculates the highest product price, configures the range input, displays the current maximum price value, re-renders products that fall below or equal to the selected price, and shares the same "no results" message area used by search.

### `src/utils.js`

`utils.js` stores shared helper functionality. It defines the external product API URL, provides a safe DOM selector helper, formats prices into US currency, and wraps `localStorage` reads and writes.

## Challenges Faced / What I Learned

One challenge that I had when building this application was searching for a product API store to distributes the tea brands that I wanted to showcase. I couldn't find a tea shop API that fit my descriptions so I created on myself and hosted that data onto GitHub pages. 
Another important challenge was keeping the interface responsive across several different page types. The about, contact, locations, shop, and product pages each have different layouts, but they still needed to feel like one cohesive brand. This project strengthened my understanding of CSS layout techniques, including grid, flexbox, responsive media queries, image scaling, overlays, and page specific styling. The shop filters and product detail page were especially useful for practicing how to use leftover space without making the layout feel crowded.

## Deployment

You can find this project deployed here: https://teafancy.netlify.app/
