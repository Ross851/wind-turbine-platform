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
    isr: false,
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