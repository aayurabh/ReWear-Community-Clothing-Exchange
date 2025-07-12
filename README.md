# ReWear – Community Clothing Exchange

## Odoo Hackathon 2025 Submission

---

## Problem Statement

**Develop ReWear, a web-based platform that enables users to exchange unused clothing through direct swaps or a point-based redemption system. The goal is to promote sustainable fashion and reduce textile waste by encouraging users to reuse wearable garments instead of discarding them.**

### Key Features:

- User authentication (Signup/Login)
- Landing Page with search, browse, and featured items
- Product Listing, detailed View, and add/edit functionality
- User dashboard for managing listings and purchases
- Admin panel for moderating items and users
- option for direct swaps or point-based redemption

---

## Team Members

- **Saurabh Singh**  
  Email: 22se02ml074@ppsu.ac.in

- **Ronak Soni**  
  Email: 22se02ml078@ppsu.ac.in

- **Bhavesh Sharma**  
  Email: 22se02ml073@ppsu.ac.in

- **Dhruv Varia**  
  Email: 22se02ml081@ppsu.ac.in

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js ,
- **Database:** MongoDB/Mysql
- **Version Control:** Git & GitHub

---

> This repository is actively updated during the Odoo Hackathon 2025 to reflect our real-time progress.

---

## Setup Instructions

### Backend (Server)

1. Navigate to the `server` directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the `server` directory with your MongoDB URI and JWT secret:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start MongoDB locally or ensure your cloud database is running.
5. Start the server:
   ```
   npm start
   ```
   The server will run on `http://localhost:5000` by default.

---

## API Routes

### Authentication

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

### Items

- `GET /api/items` — Get all items (no authentication required)
- `GET /api/items/:id` — Get single item details
- `POST /api/items` — Create new item (requires authentication)
- `PUT /api/items/:id` — Update item (requires authentication)
- `DELETE /api/items/:id` — Delete item (requires authentication)

### Users

- `GET /api/users` — Get all users (admin only)
- `GET /api/users/:id` — Get user profile
- `PUT /api/users/:id` — Update user profile

### Swaps

- `GET /api/swaps` — Get all swaps
- `POST /api/swaps` — Create a swap

### Admin

- `GET /api/admin/items` — Moderate items
- `GET /api/admin/users` — Moderate users

---
