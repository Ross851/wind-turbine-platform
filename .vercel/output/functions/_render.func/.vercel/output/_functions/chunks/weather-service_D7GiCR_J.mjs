async function getFreeWeatherData(lat, lng) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code&forecast_days=2&timezone=auto`
    );
    const data = await response.json();
    const getWeatherDescription = (code) => {
      const weatherCodes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Foggy",
        48: "Depositing rime fog",
        51: "Light drizzle",
        61: "Slight rain",
        71: "Slight snow",
        95: "Thunderstorm"
      };
      return weatherCodes[code] || "Unknown";
    };
    return {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      temperature: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      pressure: data.current.surface_pressure,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      windGust: data.current.wind_gusts_10m || 0,
      visibility: 1e4,
      // Default visibility
      cloudCover: 0,
      // Not provided by Open-Meteo
      precipitation: data.current.precipitation,
      forecast: data.hourly.time.slice(0, 8).map((time, idx) => ({
        datetime: time,
        temperature: data.hourly.temperature_2m[idx],
        windSpeed: data.hourly.wind_speed_10m[idx],
        windDirection: data.hourly.wind_direction_10m[idx],
        conditions: getWeatherDescription(data.hourly.weather_code[idx]),
        icon: data.hourly.weather_code[idx].toString()
      }))
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      temperature: 15,
      humidity: 70,
      pressure: 1013,
      windSpeed: 10,
      windDirection: 180,
      windGust: 12,
      visibility: 1e4,
      cloudCover: 50,
      precipitation: 0,
      forecast: []
    };
  }
}
async function getFreeSeaConditions(lat, lng) {
  try {
    if (lat > 24 && lat < 50 && lng > -125 && lng < -66) {
      const response = await fetch(
        `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=latest&station=8454000&product=wind&units=metric&time_zone=gmt&format=json`
      );
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        return {
          waveHeight: Math.random() * 2 + 0.5,
          // Mock wave height
          wavePeriod: Math.random() * 5 + 5,
          waveDirection: parseFloat(data.data[0].d),
          currentSpeed: parseFloat(data.data[0].s) * 0.1,
          currentDirection: parseFloat(data.data[0].d),
          waterTemperature: 15,
          swellHeight: Math.random() * 1.5 + 0.5,
          visibility: 10
        };
      }
    }
    return {
      waveHeight: Math.sin(Date.now() / 36e5) * 1.5 + 1.5,
      wavePeriod: 8 + Math.random() * 4,
      waveDirection: Date.now() / 1e3 % 360,
      currentSpeed: 0.5 + Math.random() * 1.5,
      currentDirection: Date.now() / 2e3 % 360,
      waterTemperature: 12 + Math.sin(Date.now() / 864e5) * 8,
      swellHeight: Math.abs(Math.sin(Date.now() / 72e5)) * 2,
      visibility: 5 + Math.random() * 10
    };
  } catch (error) {
    console.error("Error fetching sea conditions:", error);
    return {
      waveHeight: 1.5,
      wavePeriod: 8,
      waveDirection: 180,
      currentSpeed: 0.8,
      currentDirection: 90,
      waterTemperature: 15,
      swellHeight: 1,
      visibility: 10
    };
  }
}

async function getWeatherData(lat, lng) {
  {
    return getFreeWeatherData(lat, lng);
  }
}
async function getSeaConditions(lat, lng) {
  {
    return getFreeSeaConditions(lat, lng);
  }
}

export { getWeatherData as a, getSeaConditions as g };
