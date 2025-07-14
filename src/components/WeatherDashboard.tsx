import React, { useState, useEffect } from 'react';
import { getWeatherData, getSeaConditions } from '../lib/weather-service';
import { getTurbines } from '../lib/turbine-service';
import type { WeatherData, SeaConditions, Turbine } from '../types/turbine';

const WeatherDashboard: React.FC = () => {
  const [turbines, setTurbines] = useState<Turbine[]>([]);
  const [selectedTurbine, setSelectedTurbine] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [seaConditions, setSeaConditions] = useState<SeaConditions | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTurbines().then(data => {
      setTurbines(data);
      if (data.length > 0) {
        setSelectedTurbine(data[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedTurbine) {
      const turbine = turbines.find(t => t.id === selectedTurbine);
      if (turbine) {
        setLoading(true);
        Promise.all([
          getWeatherData(turbine.location.lat, turbine.location.lng),
          turbine.type === 'offshore' ? getSeaConditions(turbine.location.lat, turbine.location.lng) : Promise.resolve(null)
        ]).then(([weatherData, seaData]) => {
          setWeather(weatherData);
          setSeaConditions(seaData);
          setLoading(false);
        });
      }
    }
  }, [selectedTurbine, turbines]);

  const getWindDirectionIcon = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  const getOperationalStatus = () => {
    if (!weather) return { status: 'unknown', message: 'No data' };
    
    if (weather.windSpeed < 3) {
      return { status: 'stopped', message: 'Wind too low for operation' };
    } else if (weather.windSpeed > 25) {
      return { status: 'stopped', message: 'Wind too high - safety cutoff' };
    } else if (weather.windSpeed >= 12 && weather.windSpeed <= 15) {
      return { status: 'optimal', message: 'Optimal wind conditions' };
    } else {
      return { status: 'operational', message: 'Normal operation' };
    }
  };

  const operationalStatus = getOperationalStatus();

  return (
    <div className="space-y-6">
      {/* Turbine Selector */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Select Turbine Location</h2>
          <select
            value={selectedTurbine}
            onChange={(e) => setSelectedTurbine(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {turbines.map(turbine => (
              <option key={turbine.id} value={turbine.id}>
                {turbine.name} ({turbine.type})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Current Conditions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4">Current Weather Conditions</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Wind Speed</p>
                  <p className="text-3xl font-bold text-blue-600">{weather?.windSpeed.toFixed(1)} m/s</p>
                  <p className="text-sm text-gray-500">{getWindDirectionIcon(weather?.windDirection || 0)}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="text-3xl font-bold text-green-600">{weather?.temperature.toFixed(1)}°C</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Pressure</p>
                  <p className="text-3xl font-bold text-purple-600">{weather?.pressure} hPa</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="text-3xl font-bold text-orange-600">{weather?.humidity}%</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${
                operationalStatus.status === 'optimal' ? 'bg-green-50 border-green-200' :
                operationalStatus.status === 'stopped' ? 'bg-red-50 border-red-200' :
                'bg-blue-50 border-blue-200'
              } border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Operational Status</p>
                    <p className="text-sm mt-1">{operationalStatus.message}</p>
                  </div>
                  <div className={`text-3xl ${
                    operationalStatus.status === 'optimal' ? 'text-green-600' :
                    operationalStatus.status === 'stopped' ? 'text-red-600' :
                    'text-blue-600'
                  }`}>
                    {operationalStatus.status === 'optimal' ? '✓' :
                     operationalStatus.status === 'stopped' ? '✕' : '●'}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4">Additional Metrics</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Visibility</p>
                  <p className="text-xl font-semibold">{((weather?.visibility || 0) / 1000).toFixed(1)} km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cloud Cover</p>
                  <p className="text-xl font-semibold">{weather?.cloudCover}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Wind Gust</p>
                  <p className="text-xl font-semibold">{weather?.windGust.toFixed(1)} m/s</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Precipitation</p>
                  <p className="text-xl font-semibold">{weather?.precipitation.toFixed(1)} mm/h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sea Conditions (for offshore) */}
          {seaConditions && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4">Sea Conditions (Offshore)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Wave Height</p>
                  <p className="text-2xl font-bold text-blue-600">{seaConditions.waveHeight.toFixed(1)} m</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Wave Period</p>
                  <p className="text-2xl font-bold text-blue-600">{seaConditions.wavePeriod.toFixed(1)} s</p>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg">
                  <p className="text-sm text-gray-600">Current Speed</p>
                  <p className="text-2xl font-bold text-teal-600">{seaConditions.currentSpeed.toFixed(2)} m/s</p>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg">
                  <p className="text-sm text-gray-600">Water Temp</p>
                  <p className="text-2xl font-bold text-teal-600">{seaConditions.waterTemperature.toFixed(1)}°C</p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="font-semibold text-yellow-800">Vessel Operations</p>
                <p className="text-sm text-yellow-700 mt-1">
                  {seaConditions.waveHeight < 1.5 ? 'Safe for crew transfer vessels' :
                   seaConditions.waveHeight < 2.5 ? 'Caution advised for small vessels' :
                   'Dangerous conditions - postpone marine operations'}
                </p>
              </div>
            </div>
          )}

          {/* Weather Forecast */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">24-Hour Forecast</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Time</th>
                    <th className="text-left py-2">Conditions</th>
                    <th className="text-left py-2">Temp</th>
                    <th className="text-left py-2">Wind</th>
                    <th className="text-left py-2">Power Output</th>
                  </tr>
                </thead>
                <tbody>
                  {weather?.forecast.map((hour, idx) => {
                    const expectedPower = hour.windSpeed >= 3 && hour.windSpeed <= 25 
                      ? Math.min(100, (hour.windSpeed / 12) * 100) 
                      : 0;
                    
                    return (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-2">{new Date(hour.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                        <td className="py-2 capitalize">{hour.conditions}</td>
                        <td className="py-2">{hour.temperature.toFixed(1)}°C</td>
                        <td className="py-2">{hour.windSpeed.toFixed(1)} m/s</td>
                        <td className="py-2">
                          <div className="flex items-center">
                            <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${expectedPower}%` }}
                              />
                            </div>
                            <span className="text-sm">{expectedPower.toFixed(0)}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Environmental Alerts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Environmental Monitoring</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Bird Migration
                </h4>
                <p className="text-sm text-gray-600 mt-1">No active migration detected</p>
                <p className="text-xs text-gray-500 mt-2">Next check: 2 hours</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Noise Levels
                </h4>
                <p className="text-sm text-gray-600 mt-1">Within regulatory limits</p>
                <p className="text-xs text-gray-500 mt-2">45.2 dB at nearest residence</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  Ice Risk
                </h4>
                <p className="text-sm text-gray-600 mt-1">Low risk - monitoring active</p>
                <p className="text-xs text-gray-500 mt-2">Temperature: {weather?.temperature.toFixed(1)}°C</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;