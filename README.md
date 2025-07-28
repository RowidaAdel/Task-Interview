# 🛍️ Products Gallery Web Application

A responsive and modern e-commerce web application that allows users to browse, search, filter, and sort products from the Fake Store API. The app includes full product details and shopping cart management for a seamless shopping experience.

---

## 🎯 Objective

Build a fully functional, responsive Products Gallery web application using the Fake Store API.  
The app includes product browsing, filtering, sorting, and cart management, offering users a seamless e-commerce experience.

---

## 🧱 Tech Stack

- **Framework:** React (v18+)
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **State Management:** React Context / Redux Toolkit
- **API:** [Fake Store API](https://fakestoreapi.com/)
- **Notifications:** React Toastify
- **Icons:** Lucide React
- **Deployment:** Vercel

---

## 📦 Features

### 🏠 Products Page

- ✅ Fetch products from `https://fakestoreapi.com/products`
- ✅ Display product cards with name and image
- ✅ Handle API errors with a fallback UI
- ✅ Loading state while fetching data

### 🔍 Filtering & Sorting

- ✅ Filter products by name (search bar – case-insensitive)
- ✅ Sort by:
  - Price (Low to High / High to Low)
  - Name (A–Z)

### 📄 Product Details Page

- ✅ Dynamic routing via `/products/:id`
- ✅ Show:
  - Product Name
  - Full Description
  - Image
  - Price
  - Category
  - ⭐ Rating

### 🛒 Cart Management

- ✅ Add product to cart
- ✅ Remove individual items
- ✅ Clear entire cart
- ✅ Display total items and price
- ✅ Persist cart state in localStorage

### 🌙 Optional Enhancements

- ✅ Dark/Light mode toggle
- ✅ Responsive design for all screen sizes
- ✅ Loading indicators
- ✅ Empty states (e.g., empty cart message)

---

