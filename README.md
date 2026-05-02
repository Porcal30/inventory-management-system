# 📦 Inventory Management System

<p align="center">
  <b>A full-stack inventory management system for managing products, categories, suppliers, and stock transactions</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Angular-red?style=for-the-badge&logo=angular" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Database-Supabase-3FCF8E?style=for-the-badge&logo=supabase" />
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/API-Swagger-orange?style=for-the-badge&logo=swagger" />
</p>

---

# 🚀 Live Demo

🔗 **Frontend:**  
https://inventory-management-system-three-psi.vercel.app  

🔗 **Backend API:**  
https://inventory-management-backend-1a67.onrender.com  

📄 **Swagger API Documentation:**  
https://inventory-management-backend-1a67.onrender.com/api-docs  

---

# 📖 Overview

The **Inventory Management System** is a full-stack web application designed to help businesses manage inventory operations efficiently.

The system provides features for product management, category organization, supplier monitoring, and stock transaction tracking through a clean and responsive dashboard interface.

It includes secure authentication, RESTful APIs, role-based authorization, Swagger documentation, and cloud database integration using Supabase.

---

# ✨ Key Features

## 🔐 Authentication System
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Authorization

---

## 📦 Product Management
- Add products
- Update product details
- Delete products
- View all products
- Search and filter products

---

## 🗂️ Category Management
- Create categories
- Update categories
- Delete categories
- Retrieve category information

---

## 🚚 Supplier Management
- Add suppliers
- Update supplier details
- Delete suppliers
- View supplier records

---

## 📊 Stock Transaction Management
- Track stock movements
- Create stock transactions
- Monitor inventory changes
- Maintain stock history

---

## ⚙️ Backend Features
- RESTful API Architecture
- Swagger API Documentation
- Zod Validation
- Global Error Handling
- Supabase Integration
- TypeScript Backend Structure

---

# 🛠️ Tech Stack

## Frontend
- Angular
- Tailwind CSS
- RxJS

## Backend
- Node.js
- Express.js
- TypeScript
- JWT Authentication
- Swagger OpenAPI
- Zod Validation

## Database
- Supabase PostgreSQL
- Supabase Storage

---

# ⚙️ Getting Started

## 🔹 Frontend Setup

```bash
cd client
npm install
ng serve
```

Open:

```plaintext
http://localhost:4200
```

---

## 🔹 Backend Setup

```bash
cd server
npm install
npm run dev
```

Create `.env` file:

```env
PORT=5000

SUPABASE_URL=your_supabase_url

SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:4200
```

---

# 📂 Project Structure

```plaintext
inventory-management-system/
│
├── client/                 # Angular Frontend
│
├── server/                 # Express Backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── validators/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│
├── screenshots/            # System screenshots and UI previews
│
└── README.md
```

---

# 🔗 API Endpoints

# 🔐 Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get authenticated user profile |

---

# 🗂️ Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Create a new category |
| GET | `/api/categories/{id}` | Get category by ID |
| PUT | `/api/categories/{id}` | Update a category |
| DELETE | `/api/categories/{id}` | Delete a category |

---

# 📦 Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create a new product |
| GET | `/api/products/{id}` | Get product by ID |
| PUT | `/api/products/{id}` | Update a product |
| DELETE | `/api/products/{id}` | Delete a product |

---

# 📊 Stock Transactions

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/stock-transactions` | Get all stock transactions |
| POST | `/api/stock-transactions` | Create a stock transaction |

---

# 🚚 Suppliers

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/suppliers` | Get all suppliers |
| POST | `/api/suppliers` | Create a new supplier |
| GET | `/api/suppliers/{id}` | Get supplier by ID |
| PUT | `/api/suppliers/{id}` | Update a supplier |
| DELETE | `/api/suppliers/{id}` | Delete a supplier |

---

# 🎨 UI/UX Highlights

- 📱 Fully Responsive Design
- ⚡ Fast Angular SPA Performance
- 🎯 Modern Dashboard UI
- 🔄 Dynamic Data Updates
- 🌙 Clean and Organized Interface

---

# 📊 System Status

| Component | Status |
|---|---|
| Frontend | ✅ Deployed on Vercel |
| Backend | ✅ Deployed on Render |
| Database | ✅ Supabase |
| Swagger API | ✅ Functional |
| Authentication | ✅ Working |
| CRUD Operations | ✅ Working |

---

# 🔐 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization
- Input Validation using Zod

---

# 📌 Future Improvements

- 📈 Analytics Dashboard
- 📊 Sales Reporting
- 🔔 Low Stock Notifications
- 📦 Barcode Scanner Integration
- 📧 Email Notifications
- 📄 Export Reports to PDF/Excel

---

# 👨‍💻 Author

**Christian Porcal**  
📧 porcalchristian36@gmail.com
📧 shanthijosefrafaelsbarrido@gmail.com
📧 suya@me30.com

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
