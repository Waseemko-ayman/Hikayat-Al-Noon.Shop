# 🛍️ Hikayat Al-Noon | Fashion Store

![Next.js](https://img.shields.io/badge/Next.js-15.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1.10-green)
![Vercel](https://img.shields.io/badge/deploy-vercel-black)

A modern full-stack e-commerce platform built with **Next.js 16, TypeScript, Supabase, and Stripe**, designed as a scalable and production-ready fashion store with a complete admin dashboard.

---

## 🚀 Project Overview

Hikayat Al-Noon is a complete e-commerce system that combines a modern shopping experience with a powerful admin dashboard.

It includes:
- A responsive storefront for browsing and purchasing products  
- Secure authentication system (Email/Password + OTP)  
- Persistent cart and checkout flow  
- Stripe payment integration with webhook handling  
- Admin dashboard for managing products, orders, users, and analytics  

---

## ✨ Key Features

### 🛒 Storefront
- Product listing with dynamic pages (`/product/[slug]`)
- Featured and related products
- Product reviews and ratings
- Blog, FAQ, contact, privacy pages

### 🔐 Authentication
- Email/password authentication
- Phone OTP login
- Password reset & email verification
- Protected routes & session handling

### 🛍️ Cart & Checkout
- Add / update / remove cart items
- Size & quantity selection
- Persistent cart stored in Supabase
- Stripe checkout integration
- Order confirmation flow

### 📦 Orders & Payments
- Stripe webhook handling
- Order status management
- Email notifications via Resend

### 📊 Admin Dashboard
- Analytics & visitor tracking
- Manage products, orders, users, messages
- Newsletter & FAQ management
- Charts and reports (Recharts)

### 👤 User Account
- Profile management
- Avatar upload (Supabase Storage)
- Order history
- Account settings

---

## 🧠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + Shadcn UI + Radix UI
- **Backend:** Supabase (Auth, DB, Storage, Realtime)
- **Payments:** Stripe
- **Emails:** Resend
- **State Management:** React Context + React Query
- **Forms:** React Hook Form + Yup
- **UI/UX:** Framer Motion, Recharts, Lucide Icons

---

## 🏗️ Architecture

- `app/` → Pages & routing (storefront, auth, dashboard)
- `components/` → Reusable UI components (atoms, molecules, organisms)
- `features/` → Feature-based logic modules
- `context/` → Global state providers (auth, cart, analytics)
- `utils/` → Helper functions
- `validations/` → Yup schemas
- `config/` → API & Supabase setup

---

## 🔐 Security & Performance

- Role-based access control (Admin / User)
- Secure API routes with server-side protection
- Supabase Row Level Security (RLS)
- React Query caching for performance optimization
- Dynamic imports for heavy dashboard components
- SEO metadata + Open Graph support

---

## ⚡ Highlights

- Full e-commerce flow (Browse → Cart → Checkout → Payment → Order)
- Real-time admin analytics dashboard
- Modular reusable component system
- Production-ready authentication system
- Scalable architecture with clean separation of concerns

---

## 🧩 Challenges Solved

- Supabase session sync between client & server
- Persistent cart logic with database upserts
- Stripe webhook order lifecycle handling
- Secure admin-only route protection
- Preventing duplicate analytics tracking

---

## 📌 Purpose

This project demonstrates a **production-ready e-commerce platform** built with modern frontend architecture, backend integration, and scalable UI design patterns.

---

## 📫 Contact

- Portfolio: https://waseemabdelhadi.vercel.app/en  
- LinkedIn: [https://www.linkedin.com/in/waseem-abd-elhadi-1b293624b ](https://www.linkedin.com/in/waseem-abd-elhadi-%F0%9F%87%B5%F0%9F%87%B8-1b293624b/) 
- Email: wasimabdelhadi78@gmail.com

---

## Quickstart

### Prerequisites
- Node.js 18 or newer
- npm, yarn, or pnpm

---

### Install
```bash
npm install
# or
yarn
# or
pnpm install
```

---

## Authors

- [@Waseemko-ayman](https://www.github.com/Waseemko-ayman)
