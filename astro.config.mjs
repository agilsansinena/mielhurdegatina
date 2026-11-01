// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

// Páginas que no deben aparecer en el sitemap (privadas o heredadas)
const PRIVATE_PAGES = ["/checkout/", "/pedido-confirmado/", "/exito/"];

// https://astro.build/config
export default defineConfig({
  site: "https://www.mielhurdegatina.com",
  integrations: [
    sitemap({
      filter: (page) => !PRIVATE_PAGES.some((path) => new URL(page).pathname === path),
      serialize(item) {
        const path = new URL(item.url).pathname;
        item.lastmod = new Date().toISOString();

        if (path === "/") {
          item.priority = 1.0;
          item.changefreq = "weekly";
        } else if (path.startsWith("/productos")) {
          item.priority = 0.9;
          item.changefreq = "weekly";
        } else if (path.startsWith("/blog")) {
          item.priority = 0.7;
          item.changefreq = "monthly";
        } else {
          item.priority = 0.4;
          item.changefreq = "yearly";
        }

        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
  output: "server",
});
