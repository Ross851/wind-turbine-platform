import React, { useState, useEffect } from 'react';
import { getWeatherData, getSeaConditions } from '../lib/weather-service';
import type { WeatherData, SeaConditions } from '../types/turbine';

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [seaConditions, setSeaConditions] = useState<SeaConditions | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSeaConditions, setShowSeaConditions] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Default location (Copenhagen area)
        const lat = 55.6761;
        const lng = 12.5683;
        
        const weatherData = await getWeatherData(lat, lng);
        setWeather(weatherData);
        
        // Fetch sea conditions for offshore turbines
        const seaData = await getSeaConditions(lat, lng);
        setSeaConditions(seaData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Weather Conditions</h2>
        <button
          onClick={() => setShowSeaConditions(!showSeaConditions)}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          {showSeaConditions ? 'Show Weather' : 'Show Sea Conditions'}
        </button>
      </div>

      {!showSeaConditions && weather && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-3xl font-bold">{Math.round(weather.temperature)}°C</p>
              <p className="text-gray-600">{weather.forecast[0]?.conditions || 'Clear'}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Wind</p>
              <p className="text-xl font-semibold">{weather.windSpeed.toFixed(1)} m/s</p>
              <p className="text-sm text-gray-500">{weather.windDirection}°</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="font-semibold">{weather.humidity}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pressure</p>
              <p className="font-semibold">{weather.pressure} hPa</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Visibility</p>
              <p className="font-semibold">{(weather.visibility / 1000).toFixed(1)} km</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Cloud Cover</p>
              <p className="font-semibold">{weather.cloudCover}%</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-semibold mb-2">Wind Forecast</p>
            <div className="space-y-1">
              {weather.forecast.slice(0, 3).map((f, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{new Date(f.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="font-medium">{f.windSpeed.toFixed(1)} m/s</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showSeaConditions && seaConditions && (
        <div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Wave Height</span>
              <span className="font-semibold">{seaConditions.waveHeight.toFixed(1)} m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Wave Period</span>
              <span className="font-semibold">{seaConditions.wavePeriod.toFixed(1)} s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Speed</span>
              <span className="font-semibold">{seaConditions.currentSpeed.toFixed(2)} m/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Water Temp</span>
              <span className="font-semibold">{seaConditions.waterTemperature.toFixed(1)}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Swell Height</span>
              <span className="font-semibold">{seaConditions.swellHeight.toFixed(1)} m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Visibility</span>
              <span className="font-semibold">{(seaConditions.visibility / 1000).toFixed(1)} km</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-semibold text-blue-900">Offshore Operations</p>
            <p className="text-sm text-blue-700 mt-1">
              {seaConditions.waveHeight < 2 ? 'Safe for vessel operations' : 'Caution: High waves'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;