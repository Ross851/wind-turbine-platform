import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  integrations: [
    tailwind(),
    react()
  ],
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  vite: {
    ssr: {
      noExternal: ['leaflet']
    },
    optimizeDeps: {
      exclude: ['leaflet']
    }
  }
});