# Vibe Commerce - Full-Stack E-Commerce Cart

This project is a full-stack MERN application built for the Vibe Commerce technical screening. It features a complete shopping flow, from browsing products to a mock checkout, with a focus on a high-quality, modern user experience.

The entire application is built on the MERN stack (MongoDB, Express, React, Node.js) and includes a custom-built, interactive dark theme.

##  Live Demo Video

* **1-Minute Demo:** [https://youtu.be/RBhbYDxnZoc](https://youtu.be/RBhbYDxnZoc)

---

##  Features

* **Interactive Dark Theme:** A fully custom "live" animated gradient background with a mouse-tracking spotlight effect.
* **Modern UI/UX:** Smooth "pop-on-hover" animations for product cards, modern button styles, and responsive design for all devices.
* **Full E-Commerce Flow:** Browse products, add items, and update quantities directly from the product list or the cart page.
* **Persistent Cart:** The user's cart is saved in a MongoDB database, so it persists even after a page refresh.
* **Multi-Page Navigation:** Uses React Router for a seamless experience between the Products, Cart, and Checkout pages.
* **Global State:** Uses React's Context API to manage the cart state efficiently across the entire application.
* **REST API:** A complete backend API built with Node.js and Express to handle all cart logic.

---

##  Tech Stack

* **Frontend:** React, React Router, Context API, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose)
* **Styling:** Custom CSS (Animations, Gradients, Dark Mode)

---

##  How to Run Locally

To get this project running on your local machine, please follow these steps.

### Prerequisites

* Node.js (v16 or later)
* A MongoDB Atlas account (or a local MongoDB instance)

### 1. Clone the Repository

```bash
git clone [https://github.com/raonapoleon/vibe-commerce-cart.git](https://github.com/raonapoleon/vibe-commerce-cart.git)
cd vibe-commerce-cart

Backend Setup

# 1. Navigate to the backend folder
cd backend

# 2. Install all dependencies
npm install

# 3. Create a .env file
#    You must add your own variables to this file:
#    I have not Shared my mongodb_URI

PORT=5001
MONGO_URI=your_mongodb_connection_string_goes_here

# 4. Start the backend server (it will run on http://localhost:5001)
npm start

Frontend Setup

# 1. Navigate to the frontend folder
cd frontend

# 2. Install all dependencies
npm install

# 3. Start the frontend app (it will open in your browser)
npm start

```

## API Endpoints

All routes are prefixed with `/api`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/products` | Get the list of all mock products. |
| **GET** | `/cart` | Get all items in the persistent cart + total price. |
| **POST** | `/cart` | Add a new item to the cart (or increment quantity). |
| `PUT` | `/cart/item/:productId` | Update the specific quantity of an item in the cart. |
| **DELETE** | `/cart/:id` | Remove an item from the cart (using the product ID). |
| **POST** | `/checkout` | Process checkout, clear the cart, and return a mock receipt. |
