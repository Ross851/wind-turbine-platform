/* empty css                                     */
import { c as createComponent, f as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_iamXxi9r.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BWZED4E_.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { a as getWeatherData, g as getSeaConditions } from '../chunks/weather-service_D7GiCR_J.mjs';
import { g as getTurbines } from '../chunks/turbine-service__kBIkQyv.mjs';
export { renderers } from '../renderers.mjs';

const WeatherDashboard = () => {
  const [turbines, setTurbines] = useState([]);
  const [selectedTurbine, setSelectedTurbine] = useState("");
  const [weather, setWeather] = useState(null);
  const [seaConditions, setSeaConditions] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getTurbines().then((data) => {
      setTurbines(data);
      if (data.length > 0) {
        setSelectedTurbine(data[0].id);
      }
    });
  }, []);
  useEffect(() => {
    if (selectedTurbine) {
      const turbine = turbines.find((t) => t.id === selectedTurbine);
      if (turbine) {
        setLoading(true);
        Promise.all([
          getWeatherData(turbine.location.lat, turbine.location.lng),
          turbine.type === "offshore" ? getSeaConditions(turbine.location.lat, turbine.location.lng) : Promise.resolve(null)
        ]).then(([weatherData, seaData]) => {
          setWeather(weatherData);
          setSeaConditions(seaData);
          setLoading(false);
        });
      }
    }
  }, [selectedTurbine, turbines]);
  const getWindDirectionIcon = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };
  const getOperationalStatus = () => {
    if (!weather) return { status: "unknown", message: "No data" };
    if (weather.windSpeed < 3) {
      return { status: "stopped", message: "Wind too low for operation" };
    } else if (weather.windSpeed > 25) {
      return { status: "stopped", message: "Wind too high - safety cutoff" };
    } else if (weather.windSpeed >= 12 && weather.windSpeed <= 15) {
      return { status: "optimal", message: "Optimal wind conditions" };
    } else {
      return { status: "operational", message: "Normal operation" };
    }
  };
  const operationalStatus = getOperationalStatus();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Select Turbine Location" }),
      /* @__PURE__ */ jsx(
        "select",
        {
          value: selectedTurbine,
          onChange: (e) => setSelectedTurbine(e.target.value),
          className: "px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500",
          children: turbines.map((turbine) => /* @__PURE__ */ jsxs("option", { value: turbine.id, children: [
            turbine.name,
            " (",
            turbine.type,
            ")"
          ] }, turbine.id))
        }
      )
    ] }) }),
    loading ? /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsxs("div", { className: "animate-pulse space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-1/2" }),
      /* @__PURE__ */ jsx("div", { className: "h-20 bg-gray-200 rounded" })
    ] }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "Current Weather Conditions" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center p-4 bg-blue-50 rounded-lg", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Wind Speed" }),
              /* @__PURE__ */ jsxs("p", { className: "text-3xl font-bold text-blue-600", children: [
                weather?.windSpeed.toFixed(1),
                " m/s"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: getWindDirectionIcon(weather?.windDirection || 0) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center p-4 bg-green-50 rounded-lg", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Temperature" }),
              /* @__PURE__ */ jsxs("p", { className: "text-3xl font-bold text-green-600", children: [
                weather?.temperature.toFixed(1),
                "°C"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center p-4 bg-purple-50 rounded-lg", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Pressure" }),
              /* @__PURE__ */ jsxs("p", { className: "text-3xl font-bold text-purple-600", children: [
                weather?.pressure,
                " hPa"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center p-4 bg-orange-50 rounded-lg", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Humidity" }),
              /* @__PURE__ */ jsxs("p", { className: "text-3xl font-bold text-orange-600", children: [
                weather?.humidity,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `p-4 rounded-lg ${operationalStatus.status === "optimal" ? "bg-green-50 border-green-200" : operationalStatus.status === "stopped" ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"} border`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Operational Status" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm mt-1", children: operationalStatus.message })
            ] }),
            /* @__PURE__ */ jsx("div", { className: `text-3xl ${operationalStatus.status === "optimal" ? "text-green-600" : operationalStatus.status === "stopped" ? "text-red-600" : "text-blue-600"}`, children: operationalStatus.status === "optimal" ? "✓" : operationalStatus.status === "stopped" ? "✕" : "●" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "Additional Metrics" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Visibility" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl font-semibold", children: [
                ((weather?.visibility || 0) / 1e3).toFixed(1),
                " km"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Cloud Cover" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl font-semibold", children: [
                weather?.cloudCover,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Wind Gust" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl font-semibold", children: [
                weather?.windGust.toFixed(1),
                " m/s"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Precipitation" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl font-semibold", children: [
                weather?.precipitation.toFixed(1),
                " mm/h"
              ] })
            ] })
          ] })
        ] })
      ] }),
      seaConditions && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "Sea Conditions (Offshore)" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-4 bg-blue-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Wave Height" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-blue-600", children: [
              seaConditions.waveHeight.toFixed(1),
              " m"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 bg-blue-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Wave Period" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-blue-600", children: [
              seaConditions.wavePeriod.toFixed(1),
              " s"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 bg-teal-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Current Speed" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-teal-600", children: [
              seaConditions.currentSpeed.toFixed(2),
              " m/s"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 bg-teal-50 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Water Temp" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-teal-600", children: [
              seaConditions.waterTemperature.toFixed(1),
              "°C"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-yellow-800", children: "Vessel Operations" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-yellow-700 mt-1", children: seaConditions.waveHeight < 1.5 ? "Safe for crew transfer vessels" : seaConditions.waveHeight < 2.5 ? "Caution advised for small vessels" : "Dangerous conditions - postpone marine operations" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "24-Hour Forecast" }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b", children: [
            /* @__PURE__ */ jsx("th", { className: "text-left py-2", children: "Time" }),
            /* @__PURE__ */ jsx("th", { className: "text-left py-2", children: "Conditions" }),
            /* @__PURE__ */ jsx("th", { className: "text-left py-2", children: "Temp" }),
            /* @__PURE__ */ jsx("th", { className: "text-left py-2", children: "Wind" }),
            /* @__PURE__ */ jsx("th", { className: "text-left py-2", children: "Power Output" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: weather?.forecast.map((hour, idx) => {
            const expectedPower = hour.windSpeed >= 3 && hour.windSpeed <= 25 ? Math.min(100, hour.windSpeed / 12 * 100) : 0;
            return /* @__PURE__ */ jsxs("tr", { className: "border-b hover:bg-gray-50", children: [
              /* @__PURE__ */ jsx("td", { className: "py-2", children: new Date(hour.datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }),
              /* @__PURE__ */ jsx("td", { className: "py-2 capitalize", children: hour.conditions }),
              /* @__PURE__ */ jsxs("td", { className: "py-2", children: [
                hour.temperature.toFixed(1),
                "°C"
              ] }),
              /* @__PURE__ */ jsxs("td", { className: "py-2", children: [
                hour.windSpeed.toFixed(1),
                " m/s"
              ] }),
              /* @__PURE__ */ jsx("td", { className: "py-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("div", { className: "w-20 bg-gray-200 rounded-full h-2 mr-2", children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "bg-green-500 h-2 rounded-full",
                    style: { width: `${expectedPower}%` }
                  }
                ) }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
                  expectedPower.toFixed(0),
                  "%"
                ] })
              ] }) })
            ] }, idx);
          }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "Environmental Monitoring" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-4 border rounded-lg", children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-semibold flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full mr-2" }),
              "Bird Migration"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "No active migration detected" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Next check: 2 hours" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 border rounded-lg", children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-semibold flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full mr-2" }),
              "Noise Levels"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Within regulatory limits" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "45.2 dB at nearest residence" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 border rounded-lg", children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-semibold flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-yellow-500 rounded-full mr-2" }),
              "Ice Risk"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Low risk - monitoring active" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-2", children: [
              "Temperature: ",
              weather?.temperature.toFixed(1),
              "°C"
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
};

const $$Weather = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Weather & Environmental" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-6"> <div class="mb-6"> <h1 class="text-3xl font-bold text-gray-900">Weather & Environmental Monitoring</h1> <p class="text-gray-600 mt-2">Real-time weather conditions and environmental factors affecting turbine operations</p> </div> ${renderComponent($$result2, "WeatherDashboard", WeatherDashboard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/WeatherDashboard", "client:component-export": "default" })} </div> ` })}`;
}, "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/weather.astro", void 0);

const $$file = "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/weather.astro";
const $$url = "/weather";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Weather,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
