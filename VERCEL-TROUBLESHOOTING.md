# 🔧 Vercel Deployment Troubleshooting

## Common Issues and Solutions

### 404 Error on Vercel

If you're seeing a 404 error after deployment, here are the solutions:

#### 1. **Install Dependencies Locally First**
```bash
# Install the Vercel adapter
npm install @astrojs/vercel

# Install all dependencies
npm install

# Build locally to test
npm run build
```

#### 2. **Clear Vercel Cache and Redeploy**
```bash
# If using Vercel CLI
vercel --force

# Or in Vercel Dashboard
# Go to Settings > Functions > Clear Cache
```

#### 3. **Check Build Logs**
In Vercel dashboard:
1. Go to your project
2. Click on "Functions" tab
3. Check the build logs for errors

### Common Build Errors

#### "Cannot find module '@astrojs/vercel/serverless'"
**Solution**: The Vercel adapter needs to be installed
```bash
npm install @astrojs/vercel
git add package.json package-lock.json
git commit -m "Add Vercel adapter"
git push
```

#### "Leaflet is not defined"
**Solution**: Already fixed in the config, but if persists:
1. Make sure `noExternal: ['leaflet']` is in vite config
2. Import Leaflet CSS with integrity attribute

#### Environment Variables Not Working
**Solution**: 
1. Go to Vercel Dashboard > Settings > Environment Variables
2. Add each variable for ALL environments:
   - Production ✓
   - Preview ✓
   - Development ✓
3. Redeploy after adding

### Quick Fix Steps

1. **Update Dependencies**:
```bash
npm update
npm install
```

2. **Test Build Locally**:
```bash
npm run build
npm run preview
```

3. **Force Redeploy**:
```bash
vercel --prod --force
```

### Alternative: Static Export

If server rendering issues persist, switch to static:

1. Update `astro.config.mjs`:
```javascript
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'static', // Change from 'server' to 'static'
  // Remove adapter line
});
```

2. Remove `@astrojs/vercel` from package.json

3. Update `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

### API Keys Setup

Make sure your API keys are properly set:

1. **In Vercel Dashboard**:
   - Go to Settings > Environment Variables
   - Add:
     - `OPENWEATHER_API_KEY`
     - `STORMGLASS_API_KEY`
     - `GOOGLE_MAPS_API_KEY` (optional)

2. **Test API Keys Locally**:
Create `.env` file:
```
OPENWEATHER_API_KEY=your_actual_key_here
STORMGLASS_API_KEY=your_actual_key_here
```

### Deployment Checklist

- [ ] All dependencies installed (`npm install`)
- [ ] Build works locally (`npm run build`)
- [ ] Environment variables set in Vercel
- [ ] Latest code pushed to GitHub
- [ ] Vercel adapter installed (if using SSR)
- [ ] No build errors in Vercel logs

### Still Having Issues?

1. **Check Vercel Status**: https://vercel.com/status
2. **Review Build Logs**: In Vercel dashboard
3. **Try Static Build**: Switch to static output
4. **Contact Support**: Use Vercel support chat

### Working Example

Your site should be accessible at:
- `https://[your-project-name].vercel.app`
- `https://[your-project-name]-[deployment-id].vercel.app`

The 404 error is usually due to:
1. Missing dependencies
2. Build configuration issues
3. Environment variables not set

Follow the steps above to resolve!