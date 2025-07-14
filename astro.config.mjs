// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  base: '/decap_test',

  i18n: {
      routing: {
          prefixDefaultLocale: false,
          redirectToDefaultLocale: true,
          fallbackType: "redirect",
      },
      locales: ["en", "ar"],
      defaultLocale: "en",
	},

  vite: {
      plugins: [
          tailwindcss(),
      ],
	},
});