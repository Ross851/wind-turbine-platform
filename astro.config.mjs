import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [
    tailwind(),
    react()
  ],
  output: 'server',
  adapter: vercel({
    functionPerRoute: false,
    nodeVersion: '20.x'
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