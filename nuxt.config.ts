import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  /**
   * Rendering Mode: SSR (Server-Side Rendering)
   *
   * SSR is the optimal rendering mode for this yoga center website because:
   * 1. SEO Benefits: Yoga centers need good search engine visibility to attract new students.
   *    SSR ensures search engines can fully index all content.
   * 2. Performance: Initial page load is faster with pre-rendered HTML, improving user experience.
   * 3. Social Media Sharing: SSR ensures proper preview cards when content is shared on social platforms.
   * 4. Accessibility: Core content is available immediately without requiring JavaScript execution.
   * 5. Dynamic Data: Our site pulls data from Supabase and SSR ensures this data is rendered
   *    server-side before sending to the client for faster perceived performance.
   */
  ssr: true,
  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@pinia/nuxt", "@nuxt/icon", "@nuxtjs/supabase"],

  supabase: {
    redirect: false,
  },
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://yana-flow.com" },
        { rel: "manifest", href: "/manifest.json" },
        {
          rel: "apple-touch-icon",
          href: "/logo/Yana_FLOW_transparent_icon.png",
        },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { name: "theme-color", content: "#6b46c1" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
    },
  },
});
