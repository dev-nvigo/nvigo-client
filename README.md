# 🌍 Nvigo Frontend

## 🚀 Overview  
Nvigo is a platform simplifying international transitions by offering services like housing, SIM cards, banking, and jobs. This repository contains the **Next.js** frontend, optimized for SEO, performance, and accessibility.

## 🏗️ Tech Stack  
- **Framework**: [Next.js (App Router)](https://nextjs.org/docs) – Server-side rendering, SEO-optimized  
- **Language**: TypeScript – Type safety, better scalability  
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) – Utility-first CSS  
- **UI Library**: [ShadCN UI](https://ui.shadcn.com/) – Reusable components  
- **Animations**: [Framer Motion](https://www.framer.com/motion/) – Smooth animations  
- **Data Fetching**: [SWR](https://swr.vercel.app/) – Efficient caching & revalidation  
- **State Management**: Context API + URL state for filters & pagination  
- **Authentication**: Supabase Auth (Magic Links, OAuth)  

## 🏛️ Project Structure  
```
/src
 ├── /app              # Next.js App Router
 │   ├── /(main)       # Main pages
 │   │   ├── /home     # Home sections
 │   │   ├── /services # Services Page
 │   │   ├── /blogs    # Blogs Page
 │   ├── layout.tsx    # Root Layout
 │   ├── page.tsx      # Root Page
 │
 ├── /components       # Reusable UI components
 │   ├── ui/           # ShadCN UI-based components
 │   ├── navbar/       # Navbar components
 │   ├── footer/       # Footer components
 │
 ├── /lib              # Utility functions (SEO, API fetchers)
 ├── /styles           # Global styles (globals.css, themes)
 ├── /public           # Static assets (SVGs, Images, Fonts)
```

## 🌟 Features  
✅ **SEO Optimized** – Meta tags, dynamic OG images  
✅ **Server-Side & Static Rendering** – Next.js App Router  
✅ **Optimized Loading** – Lazy loading images, SWR caching  
✅ **Accessibility & Responsiveness** – Mobile-first design  
✅ **Interactive UI** – Smooth animations using Framer Motion  

## 📦 Installation & Setup  
### 1️⃣ Clone Repository  
```sh
git clone https://github.com/yourusername/nvigo-frontend.git
cd nvigo-frontend
```
### 2️⃣ Install Dependencies  
```sh
npm install
# or
yarn install
```
### 3️⃣ Set Up Environment Variables  
Create a **.env.local** file in the root directory and add:  
```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
NEXT_PUBLIC_API_BASE_URL=<your-backend-api-url>
```
### 4️⃣ Run Development Server  
```sh
npm run dev
# or
yarn dev
```
The app runs on [http://localhost:3000](http://localhost:3000) 🚀  

## 📜 Contribution Guidelines  
We welcome contributions! Please check out our [Contributing Guide](CONTRIBUTING.md) before submitting PRs.  

## 📄 License  
This project is licensed under the **MIT License**.  
