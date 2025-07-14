# 🌬️ Wind Turbine Management Platform

**Full Circle Wind Services - Multi-Brand O&M Excellence**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ross851/wind-turbine-platform)

A comprehensive global wind turbine monitoring and management platform built with Astro, React, and TypeScript. Features real-time monitoring of 300,000+ turbines worldwide, predictive maintenance, offshore operations tracking, technician competency management, and advanced analytics.

![Wind Turbine Platform](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Features

### 🌍 Global Turbine Database
- **300,000+ turbines** mapped worldwide
- OpenStreetMap integration for global coverage
- Clustered map view for performance
- Manufacturer and model information
- Real-time statistics by country and region

### 📊 Real-Time Monitoring
- Live turbine status and performance metrics
- Interactive map visualization with Leaflet
- Clickable turbines with full maintenance details
- Real-time power generation tracking
- Alert and notification system

### 🌤️ Weather Integration
- OpenWeatherMap API for weather data
- Stormglass API for sea conditions (offshore turbines)
- Weather-based operational recommendations
- Environmental impact monitoring

### 🔧 Maintenance Management
- Predictive maintenance scheduling
- Calendar and list views
- Work order tracking
- Parts inventory management
- Complete maintenance history per turbine
- Oil change tracking and technician logs
- Interactive maintenance reports

### 📈 Predictive Analytics
- AI-powered failure predictions
- Performance optimization insights
- Financial impact modeling
- Weather pattern analysis

### 🌊 Offshore & Onshore Support
- Specialized features for both turbine types
- Real-time sea condition monitoring
- Wave height and current tracking
- Maintenance window predictions based on sea state
- Vessel operation safety alerts
- Visual indicators for offline turbines
- Priority queue for weather-dependent maintenance

### 👷 Technician Competency Management
- Individual technician performance tracking
- Certification monitoring with expiry alerts
- Skills gap identification
- Work quality assessment and rework rates
- Mean time to completion tracking
- Mentor/trainee status system
- Secondary issue pattern analysis
- Role-based assignment validation

## 🛠️ Tech Stack

- **Frontend**: Astro 4.x with React integration
- **Styling**: Tailwind CSS
- **Languages**: TypeScript
- **Charts**: Recharts
- **Maps**: Leaflet
- **APIs**: OpenWeatherMap, Stormglass
- **State**: React Hooks

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- API keys for:
  - OpenWeatherMap API
  - Stormglass API (for sea conditions)
  - Google Maps API (optional)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wind-turbine-platform.git
   cd wind-turbine-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your API keys to `.env`:
   ```
   OPENWEATHER_API_KEY=your_openweather_api_key
   STORMGLASS_API_KEY=your_stormglass_api_key
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:4321
   ```

## 📁 Project Structure

```
wind-turbine-platform/
├── src/
│   ├── components/         # React components
│   │   ├── TurbineMap.tsx
│   │   ├── WeatherWidget.tsx
│   │   ├── PerformanceChart.tsx
│   │   └── ...
│   ├── layouts/           # Astro layouts
│   ├── pages/             # Astro pages
│   │   ├── index.astro    # Dashboard
│   │   ├── turbines.astro # Turbine management
│   │   ├── maintenance.astro
│   │   └── analytics.astro
│   ├── lib/               # Services and utilities
│   └── types/             # TypeScript types
├── public/                # Static assets
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs    # Tailwind configuration
└── package.json
```

## 🌐 API Endpoints

The platform integrates with several external APIs:

### Weather Data
- **OpenWeatherMap**: Current weather and forecasts
- **Stormglass**: Marine weather and sea conditions

### Internal Services
- `turbine-service.ts`: Turbine data management
- `weather-service.ts`: Weather API integration

## 🎨 Customization

### Adding New Turbines
Edit `src/lib/turbine-service.ts` to add new turbines to the mock data or integrate with your backend API.

### Styling
The platform uses Tailwind CSS with custom color schemes defined in `tailwind.config.mjs`.

### Components
All React components are in `src/components/` and can be customized for your needs.

## 📊 Features in Detail

### Dashboard
- Real-time turbine status overview
- Interactive map with turbine locations
- 24-hour power generation charts
- Weather conditions widget
- Active alerts panel

### Turbine Management
- Comprehensive fleet overview
- Advanced filtering and search
- Performance metrics
- Maintenance scheduling

### Predictive Analytics
- Component failure predictions
- Performance optimization recommendations
- Weather impact analysis
- Financial projections

### Weather Dashboard
- Location-specific weather data
- Sea conditions for offshore sites
- Operational recommendations
- Environmental monitoring

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npx vercel
```

### Deploy to Netlify
```bash
npx netlify deploy
```

## 🔧 Configuration

### Environment Variables
- `OPENWEATHER_API_KEY`: OpenWeatherMap API key
- `STORMGLASS_API_KEY`: Stormglass API key for sea conditions
- `GOOGLE_MAPS_API_KEY`: Google Maps API key (optional)

### Astro Configuration
Edit `astro.config.mjs` to modify build settings, integrations, and more.

## 📱 Mobile Responsiveness

The platform is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Astro team for the amazing framework
- OpenWeatherMap for weather data
- Stormglass for marine conditions
- The renewable energy community

## 📞 Support

For support, email support@windturbineplatform.com or create an issue in this repository.

---

Built with ❤️ for sustainable energy management