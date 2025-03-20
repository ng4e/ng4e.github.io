import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://gambetech.com", // Replace with your actual domain
  integrations: [mdx(), sitemap()],
});
