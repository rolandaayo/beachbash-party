<div align="center">

<h2 align="center">BEACHBASH PARTY 🏖️</h2>

A web experience built for **the biggest beach party Lagos has ever seen** 🇳🇬  
Designed to showcase tickets, vibes, and seamless checkout for BEACHBASH — October 10, 2026.

Built with **Next.js 16**, **Tailwind CSS v4**, and **Socket.io** for speed, real-time chat, and clean UI.

<a href="#"><strong>➥ Live Demo Coming Soon</strong></a>

</div>

<br />

### 🎉 Demo Screenshots

![BEACHBASH Desktop Demo](./public/hero-bg.jpg "Desktop Demo")

---

### ✨ Features

- 🎟️ Ticket browsing with auto-scrolling carousel
- 🛒 Cart + checkout with Paystack inline payment
- 🔐 Auth — register, login, logout (JWT + MongoDB)
- 💬 Real-time chat widget (Socket.io) — users talk to admin directly
- 📊 Admin dashboard — users, orders, messages, live payment notifications
- 🖼️ Hero slideshow with crossfade transitions
- 📱 Fully responsive — mobile-first

---

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Git](https://git-scm.com/downloads "Download Git") must be installed on your operating system.
- [Node.js](https://nodejs.org) v18+ required.

---

### Installing BEACHBASH Client

Clone the repo and install dependencies:

**Linux and macOS:**

```bash
git clone https://github.com/rolandaayo/beachbash.git
cd beachbash/client
npm install
```

**Windows:**

```bash
git clone https://github.com/rolandaayo/beachbash.git
cd beachbash/client
npm install
```

---

### Environment Variables

Create a `.env.local` file in `/client`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
NEXT_PUBLIC_ADMIN_SECRET=beachbash_admin_2026
```

---

### Running the App

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

App runs on **http://localhost:3000**

---

### Tech Stack

| Layer     | Tech                    |
| --------- | ----------------------- |
| Framework | Next.js 16 (App Router) |
| Styling   | Tailwind CSS v4         |
| Auth      | JWT via js-cookie       |
| Payments  | Paystack Inline JS      |
| Real-time | Socket.io Client        |
| Language  | TypeScript              |

---

## 💬 Contact

If you have an offer, opportunity, or introduction that might make my life more interesting, email me at ibiwoyeroland@gmail.com.

For the reasons stated above, I'll only respond to proposals that are matched for my schedule and interests.

---

### License

This project is **free to use** and does not contain any license.
