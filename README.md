# 🌿 Bean & Bloom

> *Where Every Sip Blossoms*

Bean & Bloom is a full-stack web application for a premium café based in Papua New Guinea. Built with Next.js, it features an online ordering system, table reservations, an admin dashboard, and Google OAuth authentication — all connected to a live Supabase database.

---

## ✨ Features

### Customer Facing
- 🏠 **Home Page** — Hero section, coffee product showcase, Why Choose Us, testimonials, and a contact form
- ☕ **Order Page** — Live menu fetched from the database with category filtering, search, cart, and order placement
- 📅 **Reservation Page** — Interactive calendar to book a table with date, time slot, duration, location, and guest count
- 🔐 **Authentication** — Sign in / Sign up with Google OAuth or email & password
- 👤 **Profile Dropdown** — Navbar profile picture with links to reservations and orders

### Admin Facing
- 🛠️ **Admin Dashboard** — Accessible only to users with the `admin` role
- 🍽️ **Menu Management** — Add, edit, delete, and toggle availability of menu items with drag & drop image upload
- 📦 **Order Management** — View all customer orders and update their status
- 📅 **Reservation Management** — View all bookings with status tracking
- 👥 **User Management** — View all registered users and their roles

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Database | [Supabase](https://supabase.com/) (PostgreSQL) |
| ORM | [Prisma](https://www.prisma.io/) |
| Auth | [NextAuth.js](https://next-auth.js.org/) |
| Storage | [Supabase Storage](https://supabase.com/storage) |
| Language | TypeScript |

---

## 📁 Project Structure

```
my-app/
├── app/
│   ├── page.tsx               # Home page
│   ├── order/page.tsx         # Order / menu page
│   ├── reservation/page.tsx   # Table booking page
│   ├── admin/                 # Admin dashboard
│   │   ├── page.tsx
│   │   └── AdminDashboard.tsx
│   ├── login/
│   │   ├── signin/page.tsx    # Sign in page
│   │   └── signup/page.tsx    # Sign up page
│   └── api/
│       ├── auth/              # NextAuth + register routes
│       └── menu/              # Menu CRUD API routes
├── components/
│   ├── Navbar.tsx             # Sticky navbar with profile dropdown
│   ├── Footer.tsx             # Animated expandable footer
│   ├── CategoryBar.tsx        # Sticky category filter bar
│   ├── CartSidebar.tsx        # Order cart sidebar
│   ├── MenuManager.tsx        # Admin menu management UI
│   ├── ImageUpload.tsx        # Drag & drop image uploader
│   ├── ContactForm.tsx        # Contact form (client component)
│   └── Providers.tsx          # Session + cart providers
├── lib/
│   ├── prisma.ts              # Prisma client singleton
│   ├── supabase.ts            # Supabase client
│   ├── cart-context.tsx       # Cart state (useReducer)
│   ├── toast-context.tsx      # Toast notifications
│   └── products.ts            # Category types
└── prisma/
    └── schema.prisma          # Database schema
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) account
- A [Google Cloud](https://console.cloud.google.com) project with OAuth credentials

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/bean-and-bloom.git
cd bean-and-bloom/my-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Admin registration
ADMIN_SECRET_CODE=your-admin-secret-code
```

Create a `.env` file for Prisma:

```bash
DATABASE_URL=your-pooled-connection-string-port-6543
DIRECT_URL=your-direct-connection-string-port-5432
```

### 4. Set up the database

Run the SQL in `prisma/schema.prisma` against your Supabase project, then generate the Prisma client:

```bash
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin Access

To register as an admin:
1. Go to `/login/signup`
2. Toggle **Register as Admin**
3. Enter the `ADMIN_SECRET_CODE` from your `.env.local`
4. After login, a **Manage Store** link will appear in the navbar dropdown

---

## 🖼️ Image Uploads

Menu item images are stored in a Supabase Storage bucket called `menu-images`. The admin can drag & drop images directly in the menu management form or paste an external URL.

---

## 📦 Database Schema

| Table | Description |
|---|---|
| `User` | Registered users with role (user/admin) |
| `Account` | OAuth provider accounts |
| `Session` | Active sessions |
| `MenuItem` | Menu items with name, price, stock, image |
| `Reservation` | Table bookings |
| `Order` | Customer orders |
| `OrderItem` | Individual items within an order |

---

## 🌿 About

Bean & Bloom is a local café brand from Papua New Guinea with a mission to bring premium coffee culture to the Pacific — using local beans and making quality accessible to everyone.

---

## 📄 License

This project is private and not open for redistribution.
