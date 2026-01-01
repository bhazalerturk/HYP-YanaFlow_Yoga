# HYP 2025 - Website

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

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