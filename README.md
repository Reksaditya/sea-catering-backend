# SEA Catering Backend

A Node.js backend built with **Express**, **Prisma**, and **PostgreSQL** for managing subscriptions, meal plans, and admin dashboard.

## ⚙️ Tech Stack
- Express.js, Node.js
- PostgreSQL, Prisma ORM
- JWT Auth with Role-based Access (User/Admin)

## 🚀 Features
- Authentication (Signup, Signin)
- Meal Plan Management
- Subscription System (create, pause, cancel, reactivate)
- Admin Dashboard: MRR, new subscriptions, reactivations
- Protected routes using middleware

## 📦 Getting Started

```bash
git clone https://github.com/Reksaditya/sea-catering-backend.git
cd sea-catering-backend
npm install
```

Create `.env` file:

```env
DATABASE_URL="postgresql://postgres:dode@localhost:5432/sea_catering?schema=public"
JWT_SECRET="supersecret"
```

Prisma setup:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Start server:

```bash
npm run start
```

## 🔐 Auth Header Format

```
Authorization: Bearer <token>
```

## 📌 API Endpoints

### 🧑‍ User
- `POST /auth/signup` – Create account  
- `POST /auth/signin` – Login  
- `GET /mealplan` – All meal plans  
- `POST /subscription` – Create subscription  
- `PATCH /subscription/:id/pause` – Pause  
- `PATCH /subscription/:id/reactivate` – Reactivate  
- `DELETE /subscription/:id` – Cancel  
- `GET /subscription/me` – View own subscription  

### 🛠️ Admin
- `GET /admin/metrics` – Dashboard data  
- `GET /admin/subscriptions` – View all subscriptions  

## 📂 Structure

```
├── controllers/
├── routes/
├── services/
├── middleware/
├── prisma/
├── app.js
└── server.js
```

## 👤 Author
[Reksaditya](https://github.com/Reksaditya)

Copyright (c) 2025 Reksaditya