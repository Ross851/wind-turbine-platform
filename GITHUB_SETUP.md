# GitHub Repository Setup Instructions

Follow these steps to create a GitHub repository and push your Wind Turbine Platform:

## 1. Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `wind-turbine-platform`
3. Description: "Real-time wind turbine monitoring and management platform with predictive analytics"
4. Choose: Public or Private
5. DO NOT initialize with README, .gitignore, or license (we already have them)
6. Click "Create repository"

## 2. Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add your GitHub repository as origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/wind-turbine-platform.git

# Push to GitHub
git push -u origin main
```

If you're using SSH instead of HTTPS:
```bash
git remote add origin git@github.com:YOUR_USERNAME/wind-turbine-platform.git
git push -u origin main
```

## 3. Alternative: Using GitHub Desktop

1. Open GitHub Desktop
2. File → Add Local Repository
3. Choose this folder: wind-turbine-astro
4. Publish repository

## 4. After Pushing

Your repository will be available at:
`https://github.com/YOUR_USERNAME/wind-turbine-platform`

## 5. Optional: Enable GitHub Pages

1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: / (root)
5. Save

Then update your Astro config for GitHub Pages:
```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://YOUR_USERNAME.github.io',
  base: '/wind-turbine-platform',
  // ... rest of config
})
```

## 6. Optional: Add Topics

Add these topics to your repository for better discoverability:
- wind-energy
- renewable-energy
- astro
- react
- typescript
- predictive-maintenance
- iot
- monitoring
- dashboard
- real-time

## Repository is Ready! 🎉

Your Wind Turbine Platform is now ready to be pushed to GitHub!