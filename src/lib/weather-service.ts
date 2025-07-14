import type { WeatherData, SeaConditions } from '../types/turbine';
import { getFreeWeatherData, getFreeSeaConditions } from './free-weather-service';

const OPENWEATHER_API_KEY = import.meta.env.OPENWEATHER_API_KEY;
const STORMGLASS_API_KEY = import.meta.env.STORMGLASS_API_KEY;

export async function getWeatherData(lat: number, lng: number): Promise<WeatherData> {
  // Use free service if no API key
  if (!OPENWEATHER_API_KEY) {
    return getFreeWeatherData(lat, lng);
  }
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    const current = await response.json();
    const forecast = await forecastResponse.json();

    return {
      timestamp: new Date().toISOString(),
      temperature: current.main.temp,
      humidity: current.main.humidity,
      pressure: current.main.pressure,
      windSpeed: current.wind.speed,
      windDirection: current.wind.deg,
      windGust: current.wind.gust || 0,
      visibility: current.visibility,
      cloudCover: current.clouds.all,
      precipitation: current.rain?.['1h'] || 0,
      forecast: forecast.list.slice(0, 8).map((item: any) => ({
        datetime: item.dt_txt,
        temperature: item.main.temp,
        windSpeed: item.wind.speed,
        windDirection: item.wind.deg,
        conditions: item.weather[0].description,
        icon: item.weather[0].icon
      }))
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function getSeaConditions(lat: number, lng: number): Promise<SeaConditions> {
  // Use free service if no API key
  if (!STORMGLASS_API_KEY) {
    return getFreeSeaConditions(lat, lng);
  }
  
  try {
    const params = 'waveHeight,wavePeriod,waveDirection,currentSpeed,currentDirection,waterTemperature,swellHeight,visibility';
    const response = await fetch(
      `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`,
      {
        headers: {
          'Authorization': STORMGLASS_API_KEY
        }
      }
    );

    const data = await response.json();
    const current = data.hours[0];

    return {
      waveHeight: current.waveHeight?.noaa || 0,
      wavePeriod: current.wavePeriod?.noaa || 0,
      waveDirection: current.waveDirection?.noaa || 0,
      currentSpeed: current.currentSpeed?.sg || 0,
      currentDirection: current.currentDirection?.sg || 0,
      waterTemperature: current.waterTemperature?.noaa || 0,
      swellHeight: current.swellHeight?.noaa || 0,
      visibility: current.visibility?.sg || 0
    };
  } catch (error) {
    console.error('Error fetching sea conditions:', error);
    // Return default values if API fails
    return {
      waveHeight: 0,
      wavePeriod: 0,
      waveDirection: 0,
      currentSpeed: 0,
      currentDirection: 0,
      waterTemperature: 0,
      swellHeight: 0,
      visibility: 0
    };
  }
}