# 🚀 Deploy Wind Turbine Platform to Vercel

Follow these steps to deploy your wind turbine platform to Vercel:

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have one
2. **API Keys**: You'll need these free API keys:
   - OpenWeatherMap API key: [Get it here](https://openweathermap.org/api)
   - Stormglass API key: [Get it here](https://stormglass.io/)
   - Google Maps API key (optional): [Get it here](https://console.cloud.google.com/)

## Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy the project**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy: `Y`
   - Which scope: Choose your account
   - Link to existing project: `N`
   - Project name: `wind-turbine-platform` (or your choice)
   - Directory: `./` (current directory)
   - Override settings: `N`

5. **Set Environment Variables**:
   ```bash
   vercel env add OPENWEATHER_API_KEY
   vercel env add STORMGLASS_API_KEY
   vercel env add GOOGLE_MAPS_API_KEY
   ```

6. **Deploy to production**:
   ```bash
   vercel --prod
   ```

## Option 2: Deploy via GitHub Integration

1. **Push your code to GitHub** (already done!)

2. **Go to Vercel Dashboard**:
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"

3. **Connect GitHub**:
   - Authorize Vercel to access your GitHub
   - Select `Ross851/wind-turbine-platform`

4. **Configure Project**:
   - Framework Preset: `Astro` (should auto-detect)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Add Environment Variables**:
   Click "Environment Variables" and add:
   - `OPENWEATHER_API_KEY`: Your OpenWeatherMap API key
   - `STORMGLASS_API_KEY`: Your Stormglass API key
   - `GOOGLE_MAPS_API_KEY`: Your Google Maps API key (optional)

6. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)

## Option 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ross851/wind-turbine-platform&env=OPENWEATHER_API_KEY,STORMGLASS_API_KEY,GOOGLE_MAPS_API_KEY&envDescription=API%20keys%20needed%20for%20weather%20and%20map%20services&envLink=https://github.com/Ross851/wind-turbine-platform/blob/main/.env.example)

## Post-Deployment

### 1. **Your App URL**
Your app will be available at:
- Preview: `https://wind-turbine-platform-[random].vercel.app`
- Production: `https://wind-turbine-platform.vercel.app`

### 2. **Custom Domain (Optional)**
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 3. **Update Environment Variables**
If you need to update API keys:
```bash
vercel env pull  # Download current env vars
vercel env add   # Add new ones
vercel --prod    # Redeploy
```

## Troubleshooting

### Build Errors
If you encounter build errors:

1. **Missing dependencies**:
   ```bash
   npm install
   git add package-lock.json
   git commit -m "Add package-lock.json"
   git push
   ```

2. **Environment variables not working**:
   - Ensure variables are added for all environments (Production, Preview, Development)
   - Redeploy after adding variables

3. **API rate limits**:
   - The free tier of APIs should be sufficient for demo
   - Consider implementing caching for production use

### Performance Optimization
For better performance on Vercel:

1. **Enable caching** in `vercel.json`:
   ```json
   {
     "headers": [
       {
         "source": "/assets/(.*)",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "public, max-age=31536000, immutable"
           }
         ]
       }
     ]
   }
   ```

2. **Use Vercel Analytics** (free tier available):
   - Enable in project settings
   - Add `@vercel/analytics` package

## Free API Key Limits

### OpenWeatherMap (Free Tier)
- 1,000 API calls/day
- 60 calls/minute
- Perfect for demo and small deployments

### Stormglass (Free Tier)
- 50 API calls/day
- 10 calls/hour
- Use sparingly for offshore turbines only

### Tips for API Usage
- Weather data is cached for 5 minutes in the app
- Sea conditions are only fetched for offshore turbines
- Consider implementing backend caching for production

## 🎉 Success!

Once deployed, your wind turbine platform will be live with:
- Global turbine map with 300k+ turbines
- Real-time weather integration
- Maintenance tracking
- Technician management
- Predictive analytics
- And much more!

Share your deployed URL and start monitoring wind turbines worldwide!