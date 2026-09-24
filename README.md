# Product Admin Dashboard

A responsive Product Admin Dashboard built using Next.js, React, Tailwind CSS, and Axios. The application uses the DummyJSON API for authentication and product management.

## Live Demo

https://charishma-product-admin-dashboard.netlify.app/

## GitHub Repository

https://github.com/Charishma12301/product-admin-dashboard

## Demo Login Credentials

Username: `emilys`

Password: `emilyspass`

Use these credentials to access the Product Admin Dashboard.

## Features

* Login authentication with protected product pages
* Logout functionality
* Product listing with image, title, category, price, rating, and stock
* Responsive desktop table and mobile card layout
* Pagination with Previous, Next, page numbers, and page size selection
* Search products with debounce
* Category filtering
* Product sorting by price, rating, and title
* Product details page
* Add product
* Edit product
* Delete product with confirmation
* Loading, empty, and error states
* Retry functionality
* URL-based search, category, sorting, page, and page-size state
* Request cancellation using AbortController to prevent stale search results
* Protection against multiple rapid Login and Save requests

## Tech Stack

* Next.js
* React
* Tailwind CSS
* Axios
* JavaScript
* DummyJSON API

## API Endpoints Used

* `POST /auth/login`
* `GET /products`
* `GET /products/search`
* `GET /products/categories`
* `GET /products/:id`
* `POST /products/add`
* `PUT /products/:id`
* `DELETE /products/:id`

## Project Structure

```text
app/
├── login/
├── products/
│   ├── [id]/
│   │   └── edit/
│   └── add/

components/
├── Navbar.js
├── SearchBar.js
├── ProductFilters.js
├── ProductTable.js
├── ProductCard.js
├── Pagination.js
├── ProductForm.js
└── StatusMessage.js

lib/
├── axios.js
├── authApi.js
└── productApi.js
```

## Getting Started

Clone the repository and install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Then use the demo credentials provided above to log in.

## Design Choices

* Axios is configured in one shared file so authentication tokens and common API error handling are managed centrally.
* API functions are separated from UI components for better code organization.
* Small reusable components are used for the navbar, search, filters, product table, mobile cards, pagination, forms, and status messages.
* Search, category, sorting, page, and page size are stored in the URL so the current view can be shared and refreshed without losing the state.
* The UI is responsive and switches from a desktop table to mobile product cards.

## Search and Category Filtering

The DummyJSON API does not provide search and category filtering together in the same request.

Therefore, the application performs the product search first and then applies the category filter to the returned products on the client side.

## Race Condition Handling

Search requests use `AbortController`.

When the search value changes, the previous request is cancelled before its result can replace the newer search result. This prevents older responses from overwriting newer results.

The implementation can also be tested using a delayed request such as:

```text
/products/search?q=laptop&delay=2000
```

## DummyJSON Mutation Limitation

DummyJSON supports add, update, and delete API operations for demonstration purposes, but these changes are not permanently persisted on the server.

The application therefore updates the current UI after successful mutation requests so the user can immediately see the result.

## Problem Faced and Solution

One problem I faced was a production build error related to `useSearchParams()` on the Products page. The application worked correctly in development, but the production build failed during prerendering.

I fixed it by wrapping the Products page content inside a React `Suspense` boundary. After the change, I ran `npm run build` again and the production build completed successfully.

## AI Assistance

AI tools were used during development for guidance, debugging support, and understanding implementation approaches. The final implementation was tested manually, and the code was reviewed to understand how each feature works.

## Completed

* Authentication
* Protected routes
* Product listing
* Responsive UI
* Pagination
* Search with debounce
* Category filtering
* Sorting
* Product details
* Add product
* Edit product
* Delete product
* Loading, empty, and error states
* Retry functionality
* URL state management
* Race condition handling
* Rapid request prevention
* Production build testing
* Netlify deployment
