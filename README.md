# Centar Branitelja Cetinskog Kraja

This is a bilingual web application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS** for the cultural and historical project **Centar Branitelja Cetinskog Kraja**.  
The website is optimized for presentation on **large interactive displays (65” Clevertouch screens)**, while remaining responsive for laptops and desktop devices.

---

## ✨ Features

- 🌐 **i18n with next-intl**: Croatian (**default**), English, German
- 🧭 **Locale-aware routing** under `/[locale]` with middleware redirection
- 🧱 **Chapter-based content** (headings, paragraphs, images, lists)
- 🧰 **shadcn/ui** components (Sidebar, ScrollArea, etc.)
- 🖼️ **Responsive background images** (different assets for laptop vs. large displays)
- 🚀 **Vercel** deployment with custom domain (Porkbun DNS)

---

## 🚀 Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [shadcn/ui](https://ui.shadcn.com/) for components  
- [next-intl](https://next-intl-docs.vercel.app/) for i18n  
- [Vercel](https://vercel.com/) for deployment  

---

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

##  Install dependencies

2. ```bash
   npm install
   ```

##  Run the development server

3. ```bash
   npm run dev
   ```

The app will be available at http://localhost:3000

---

## 🌍 Internationalization (i18n)

Implemented with next-intl.

Default locale: Croatian (hr).

Supported locales: hr, en, de.

Middleware automatically redirects users to their preferred or default locale.

---

## 🖼️ Background Images

Large interactive display (1535×1080 and up) → uses a high-resolution background.

Laptop & smaller screens (<1600px) → uses a lighter optimized background.

Handled with CSS @media queries in globals.css.

