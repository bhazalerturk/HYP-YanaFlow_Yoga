# HYP-YanaFlow_Yoga

YanaFlow is a responsive web platform for mindfulness and movement, developed as a group project for the Hypermedia Applications course at Politecnico di Milano.

The project covers the full workflow from concept and design to implementation and deployment.

---

## Team
- David von Seyfried
- Berivan Hazal Erturk
- Hadi Kheiri  
- Boyu Lin  

---

## Project Overview
YanaFlow connects yoga courses, teachers, and events through a consistent design system and structured, intuitive navigation.

The project was developed starting from conceptual modeling (C-IDM) and Figma-based UI/UX design, followed by implementation as a modular, production-ready web application.

---

## Features
- Courses, Events, and Teachers pages with dynamic cross-linking  
- Filters, previews, and carousels for content exploration  
- About, Contact, and FAQ sections  
- Fully responsive layout  

---

## Design
- Complete UI/UX design created in Figma
- Consistent design system (colors, typography, spacing, reusable components)
- Focus on clarity, calm visual language, and accessibility

---

## Tech Stack
- Nuxt 3 (Vue 3 + TypeScript)  
- Tailwind CSS  
- Supabase  
- Pinia  
- Server-Side Rendering (SSR)  
- Vercel  

---

## Live Demo
https://hyp-yoga.vercel.app

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Technologies Used

This project uses the following technologies and packages:

- **[Nuxt 3](https://nuxt.com/):** A modern Vue.js framework for building server-side rendered and static web applications.
- **[Vue 3](https://vuejs.org/):** The progressive JavaScript framework.
- **[Pinia](https://pinia.vuejs.org/):** A state management library for Vue.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for styling.
- **[Vite](https://vitejs.dev/):** A fast build tool and development server.
- **[@tailwindcss/vite](https://github.com/tailwindlabs/tailwindcss):** Tailwind CSS integration with Vite.


## Project Structure

The project is organized as follows:

```
├── .gitignore          # Files and directories to ignore in Git
├── app.vue             # Main application entry point
├── nuxt.config.ts      # Nuxt configuration file
├── package.json        # Project metadata and dependencies
├── README.md           # Project documentation
├── tsconfig.json       # TypeScript configuration
├── assets/             # Static assets for the project
│   └── css/            # Tailwind CSS setup and other styles
├── public/             # Publicly accessible static files
│   ├── favicon.ico     # Favicon for the application
│   └── robots.txt      # SEO and web crawler configuration
├── server/             # Server-side logic (if applicable)
├── components/         # Vue components used in the application
├── layouts/            # Application layouts
├── pages/              # Application pages (routes)
```