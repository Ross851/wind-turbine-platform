import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    tailwind(),
    react()
  ],
  output: 'hybrid',
  vite: {
    ssr: {
      noExternal: ['leaflet']
    },
    optimizeDeps: {
      exclude: ['leaflet']
    }
  }
});