// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

import icon from "astro-icon";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), icon(), preact()],
  // base: '/',

  i18n: {
      routing: {
          prefixDefaultLocale: false,
          redirectToDefaultLocale: true,
          fallbackType: "redirect",
      },
      locales: ["en", "es", "ar"],
      defaultLocale: "en",
    },

  vite: {
      plugins: [
          tailwindcss(),
      ],
    },
});