/* empty css                                     */
import { c as createComponent, f as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_iamXxi9r.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BWZED4E_.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useState, useEffect } from 'react';
import { L, T as TurbineDetailModal } from '../chunks/TurbineDetailModal_DFPhc8Hi.mjs';
/* empty css                                 */
import { g as getTurbines, b as getAlerts } from '../chunks/turbine-service__kBIkQyv.mjs';
import { g as getSeaConditions, a as getWeatherData } from '../chunks/weather-service_D7GiCR_J.mjs';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
export { renderers } from '../renderers.mjs';

const CoastalWindMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [showCurrents, setShowCurrents] = useState(true);
  const [showWaveHeight, setShowWaveHeight] = useState(true);
  const [highlightOffline, setHighlightOffline] = useState(true);
  const [selectedTurbine, setSelectedTurbine] = useState(null);
  const [turbinesData, setTurbinesData] = useState([]);
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const map = L.map(mapRef.current).setView([55.5, 13.5], 8);
    mapInstanceRef.current = map;
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}", {
      attribution: "Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
    }).addTo(map);
    getTurbines().then(async (turbines) => {
      setTurbinesData(turbines);
      for (const turbine of turbines) {
        const iconHtml = `
          <div class="turbine-marker-enhanced ${turbine.status} ${turbine.type}">
            ${turbine.status === "offline" ? '<div class="pulse-ring"></div>' : ""}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <path d="M12 6l2.5 5h-5z"/>
              <path d="M12 6l-2.5 5 5 0z" transform="rotate(120 12 12)"/>
              <path d="M12 6l-2.5 5 5 0z" transform="rotate(240 12 12)"/>
            </svg>
            ${turbine.type === "offshore" ? '<div class="wave-indicator"></div>' : ""}
          </div>
        `;
        const icon = L.divIcon({
          html: iconHtml,
          className: "turbine-icon-enhanced",
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });
        let seaConditions = null;
        if (turbine.type === "offshore") {
          seaConditions = await getSeaConditions(turbine.location.lat, turbine.location.lng);
        }
        L.marker([turbine.location.lat, turbine.location.lng], { icon }).addTo(map).on("click", () => {
          setSelectedTurbine(turbine);
        }).bindPopup(`
            <div class="turbine-popup-enhanced">
              <h3 class="font-bold text-lg">${turbine.name}</h3>
              <div class="status-badge ${turbine.status}">
                ${turbine.status.toUpperCase()}
              </div>
              
              <div class="mt-3 space-y-2">
                <div class="flex justify-between">
                  <span>Type:</span>
                  <span class="font-medium">${turbine.type === "offshore" ? "🌊 Offshore" : "🏔️ Onshore"}</span>
                </div>
                <div class="flex justify-between">
                  <span>Power:</span>
                  <span class="font-medium">${turbine.performance.currentPower} MW</span>
                </div>
                <div class="flex justify-between">
                  <span>Wind:</span>
                  <span class="font-medium">${turbine.performance.windSpeed} m/s</span>
                </div>
              </div>
              
              ${seaConditions ? `
                <div class="mt-3 pt-3 border-t">
                  <h4 class="font-semibold mb-2">Sea Conditions</h4>
                  <div class="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span class="text-gray-600">Waves:</span>
                      <span class="font-medium ${seaConditions.waveHeight > 2 ? "text-red-600" : "text-green-600"}">
                        ${seaConditions.waveHeight.toFixed(1)}m
                      </span>
                    </div>
                    <div>
                      <span class="text-gray-600">Current:</span>
                      <span class="font-medium">${seaConditions.currentSpeed.toFixed(2)} m/s</span>
                    </div>
                  </div>
                  ${seaConditions.waveHeight > 2.5 ? `
                    <div class="mt-2 p-2 bg-yellow-50 rounded text-sm">
                      ⚠️ High waves - Vessel operations restricted
                    </div>
                  ` : ""}
                </div>
              ` : ""}
              
              ${turbine.status === "offline" ? `
                <div class="mt-3 p-2 bg-red-50 rounded">
                  <p class="text-sm font-semibold text-red-800">🔴 Turbine Offline</p>
                  ${turbine.type === "offshore" ? `
                    <p class="text-xs text-red-700 mt-1">
                      Waiting for safe sea conditions for repair crew
                    </p>
                  ` : `
                    <p class="text-xs text-red-700 mt-1">
                      Maintenance crew required immediately
                    </p>
                  `}
                </div>
              ` : ""}
              
              <button onclick="window.dispatchEvent(new CustomEvent('openTurbineDetail', { detail: '${turbine.id}' }))" 
                      class="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center">
                View Full Details
              </button>
            </div>
          `);
        if (turbine.status === "offline" && highlightOffline) {
          L.circle([turbine.location.lat, turbine.location.lng], {
            color: "red",
            fillColor: "#ff0000",
            fillOpacity: 0.1,
            radius: 5e3,
            className: "offline-warning-circle"
          }).addTo(map);
        }
        if (turbine.type === "offshore" && showCurrents && seaConditions) {
          const arrowIcon = L.divIcon({
            html: `
              <div class="current-arrow" style="transform: rotate(${seaConditions.currentDirection}deg)">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#0066cc" opacity="0.7">
                  <path d="M12 2l4 8h-3v12h-2V10H8z"/>
                </svg>
              </div>
            `,
            className: "current-arrow-icon",
            iconSize: [30, 30]
          });
          L.marker(
            [turbine.location.lat + 0.02, turbine.location.lng + 0.02],
            { icon: arrowIcon }
          ).addTo(map);
        }
      }
    });
    const handleOpenDetail = (event) => {
      const customEvent = event;
      const turbine = turbinesData.find((t) => t.id === customEvent.detail);
      if (turbine) {
        setSelectedTurbine(turbine);
      }
    };
    window.addEventListener("openTurbineDetail", handleOpenDetail);
    return () => {
      window.removeEventListener("openTurbineDetail", handleOpenDetail);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [showCurrents, highlightOffline, turbinesData]);
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { ref: mapRef, className: "w-full h-full rounded-lg" }),
    /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-[1000]", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "Map Layers" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: showCurrents,
              onChange: (e) => setShowCurrents(e.target.checked),
              className: "form-checkbox"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Ocean Currents" })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: showWaveHeight,
              onChange: (e) => setShowWaveHeight(e.target.checked),
              className: "form-checkbox"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Wave Heights" })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: highlightOffline,
              onChange: (e) => setHighlightOffline(e.target.checked),
              className: "form-checkbox"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Highlight Offline" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        .turbine-marker-enhanced {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .turbine-marker-enhanced.operational {
          color: #00c369;
        }
        
        .turbine-marker-enhanced.warning {
          color: #ff9800;
        }
        
        .turbine-marker-enhanced.maintenance {
          color: #2196f3;
        }
        
        .turbine-marker-enhanced.offline {
          color: #f44336;
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        .pulse-ring {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 3px solid #f44336;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .wave-indicator {
          position: absolute;
          bottom: -5px;
          width: 40px;
          height: 10px;
          background: linear-gradient(90deg, transparent, #2196f3, transparent);
          animation: wave 3s infinite;
        }
        
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .turbine-popup-enhanced {
          min-width: 250px;
        }
        
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
          margin-top: 8px;
        }
        
        .status-badge.operational {
          background: #e8f5e9;
          color: #2e7d32;
        }
        
        .status-badge.offline {
          background: #ffebee;
          color: #c62828;
        }
        
        .status-badge.maintenance {
          background: #e3f2fd;
          color: #1565c0;
        }
        
        .status-badge.warning {
          background: #fff3e0;
          color: #e65100;
        }
        
        .offline-warning-circle {
          animation: pulse-fade 3s infinite;
        }
        
        @keyframes pulse-fade {
          0% { opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { opacity: 0.3; }
        }
        
        .current-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      ` }),
    selectedTurbine && /* @__PURE__ */ jsx(
      TurbineDetailModal,
      {
        turbine: selectedTurbine,
        isOpen: !!selectedTurbine,
        onClose: () => setSelectedTurbine(null)
      }
    )
  ] });
};

const TurbineStatus = () => {
  const [turbines, setTurbines] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTurbines = async () => {
      try {
        const data = await getTurbines();
        setTurbines(data);
      } catch (error) {
        console.error("Error fetching turbines:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTurbines();
    const interval = setInterval(fetchTurbines, 1e4);
    return () => clearInterval(interval);
  }, []);
  const getStatusColor = (status) => {
    switch (status) {
      case "operational":
        return "text-success-600 bg-success-100";
      case "warning":
        return "text-orange-600 bg-orange-100";
      case "maintenance":
        return "text-blue-600 bg-blue-100";
      case "offline":
        return "text-red-600 bg-red-100";
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "operational":
        return /* @__PURE__ */ jsx("span", { className: "text-success-600", children: "●" });
      case "warning":
        return /* @__PURE__ */ jsx("span", { className: "text-orange-600", children: "▲" });
      case "maintenance":
        return /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "■" });
      case "offline":
        return /* @__PURE__ */ jsx("span", { className: "text-red-600", children: "✕" });
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsxs("div", { className: "animate-pulse", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-1/2 mb-4" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "h-16 bg-gray-200 rounded" }),
        /* @__PURE__ */ jsx("div", { className: "h-16 bg-gray-200 rounded" })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: "Turbine Status" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3 max-h-96 overflow-y-auto", children: turbines.map((turbine) => /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-3 hover:bg-gray-50 transition-colors", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-lg", children: getStatusIcon(turbine.status) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm", children: turbine.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: turbine.type === "offshore" ? "🌊 Offshore" : "🏔️ Onshore" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-1 rounded-full ${getStatusColor(turbine.status)}`, children: turbine.status })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Power:" }),
          /* @__PURE__ */ jsxs("span", { className: "ml-1 font-medium", children: [
            turbine.performance.currentPower,
            " MW"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Wind:" }),
          /* @__PURE__ */ jsxs("span", { className: "ml-1 font-medium", children: [
            turbine.performance.windSpeed,
            " m/s"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Efficiency:" }),
          /* @__PURE__ */ jsxs("span", { className: "ml-1 font-medium", children: [
            turbine.performance.capacityFactor,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Temp:" }),
          /* @__PURE__ */ jsxs("span", { className: "ml-1 font-medium", children: [
            turbine.performance.temperature,
            "°C"
          ] })
        ] })
      ] }),
      turbine.maintenance.alerts.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-2 pt-2 border-t", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-orange-600", children: [
        "⚠️ ",
        turbine.maintenance.alerts.length,
        " active alert",
        turbine.maintenance.alerts.length > 1 ? "s" : ""
      ] }) })
    ] }, turbine.id)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t grid grid-cols-2 gap-2 text-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Total Capacity" }),
        /* @__PURE__ */ jsxs("p", { className: "font-bold text-lg", children: [
          turbines.reduce((sum, t) => sum + t.specifications.capacity, 0).toFixed(1),
          " MW"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Active Power" }),
        /* @__PURE__ */ jsxs("p", { className: "font-bold text-lg text-success-600", children: [
          turbines.reduce((sum, t) => sum + t.performance.currentPower, 0).toFixed(1),
          " MW"
        ] })
      ] })
    ] })
  ] });
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [seaConditions, setSeaConditions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSeaConditions, setShowSeaConditions] = useState(false);
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const lat = 55.6761;
        const lng = 12.5683;
        const weatherData = await getWeatherData(lat, lng);
        setWeather(weatherData);
        const seaData = await getSeaConditions(lat, lng);
        setSeaConditions(seaData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 3e5);
    return () => clearInterval(interval);
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsxs("div", { className: "animate-pulse", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-1/2 mb-4" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded" }),
        /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-200 rounded w-5/6" })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Weather Conditions" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowSeaConditions(!showSeaConditions),
          className: "text-sm text-primary-600 hover:text-primary-700",
          children: showSeaConditions ? "Show Weather" : "Show Sea Conditions"
        }
      )
    ] }),
    !showSeaConditions && weather && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("p", { className: "text-3xl font-bold", children: [
            Math.round(weather.temperature),
            "°C"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: weather.forecast[0]?.conditions || "Clear" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Wind" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xl font-semibold", children: [
            weather.windSpeed.toFixed(1),
            " m/s"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
            weather.windDirection,
            "°"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mt-4 pt-4 border-t", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Humidity" }),
          /* @__PURE__ */ jsxs("p", { className: "font-semibold", children: [
            weather.humidity,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Pressure" }),
          /* @__PURE__ */ jsxs("p", { className: "font-semibold", children: [
            weather.pressure,
            " hPa"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Visibility" }),
          /* @__PURE__ */ jsxs("p", { className: "font-semibold", children: [
            (weather.visibility / 1e3).toFixed(1),
            " km"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Cloud Cover" }),
          /* @__PURE__ */ jsxs("p", { className: "font-semibold", children: [
            weather.cloudCover,
            "%"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold mb-2", children: "Wind Forecast" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1", children: weather.forecast.slice(0, 3).map((f, i) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { children: new Date(f.datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            f.windSpeed.toFixed(1),
            " m/s"
          ] })
        ] }, i)) })
      ] })
    ] }),
    showSeaConditions && seaConditions && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Wave Height" }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
            seaConditions.waveHeight.toFixed(1),
            " m"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Wave Period" }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
            seaConditions.wavePeriod.toFixed(1),
            " s"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Current Speed" }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
            seaConditions.currentSpeed.toFixed(2),
            " m/s"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Water Temp" }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
            seaConditions.waterTemperature.toFixed(1),
            "°C"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Swell Height" }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
            seaConditions.swellHeight.toFixed(1),
            " m"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Visibility" }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
            (seaConditions.visibility / 1e3).toFixed(1),
            " km"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 p-3 bg-blue-50 rounded-lg", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-blue-900", children: "Offshore Operations" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-700 mt-1", children: seaConditions.waveHeight < 2 ? "Safe for vessel operations" : "Caution: High waves" })
      ] })
    ] })
  ] });
};

const PerformanceChart = () => {
  const generateData = () => {
    const data2 = [];
    const now = /* @__PURE__ */ new Date();
    for (let i = 24; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1e3);
      const hour = time.getHours();
      const baseWind = 10 + Math.sin(hour / 24 * Math.PI * 2) * 3;
      const windSpeed = baseWind + Math.random() * 2 - 1;
      const powerOutput = Math.max(0, Math.min(50, windSpeed * 3.5 + Math.random() * 5));
      data2.push({
        time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        hour,
        windSpeed: Number(windSpeed.toFixed(1)),
        powerOutput: Number(powerOutput.toFixed(1)),
        efficiency: Number((powerOutput / 50 * 100).toFixed(1))
      });
    }
    return data2;
  };
  const data = generateData();
  return /* @__PURE__ */ jsxs("div", { className: "h-80", children: [
    /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data, margin: { top: 5, right: 30, left: 20, bottom: 5 }, children: [
      /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f0f0f0" }),
      /* @__PURE__ */ jsx(
        XAxis,
        {
          dataKey: "time",
          tick: { fontSize: 12 },
          interval: 4
        }
      ),
      /* @__PURE__ */ jsx(
        YAxis,
        {
          yAxisId: "power",
          orientation: "left",
          tick: { fontSize: 12 },
          label: { value: "Power (MW)", angle: -90, position: "insideLeft" }
        }
      ),
      /* @__PURE__ */ jsx(
        YAxis,
        {
          yAxisId: "wind",
          orientation: "right",
          tick: { fontSize: 12 },
          label: { value: "Wind Speed (m/s)", angle: 90, position: "insideRight" }
        }
      ),
      /* @__PURE__ */ jsx(
        Tooltip,
        {
          contentStyle: { backgroundColor: "rgba(255, 255, 255, 0.95)", border: "1px solid #ccc" },
          formatter: (value, name) => {
            const unit = name === "Power Output" ? " MW" : " m/s";
            return [value + unit, name];
          }
        }
      ),
      /* @__PURE__ */ jsx(Legend, {}),
      /* @__PURE__ */ jsx(
        Line,
        {
          yAxisId: "power",
          type: "monotone",
          dataKey: "powerOutput",
          stroke: "#00c369",
          strokeWidth: 2,
          name: "Power Output",
          dot: false
        }
      ),
      /* @__PURE__ */ jsx(
        Line,
        {
          yAxisId: "wind",
          type: "monotone",
          dataKey: "windSpeed",
          stroke: "#0085ff",
          strokeWidth: 2,
          name: "Wind Speed",
          dot: false
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-3 gap-4 text-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Avg Power Output" }),
        /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-success-600", children: [
          (data.reduce((acc, d) => acc + d.powerOutput, 0) / data.length).toFixed(1),
          " MW"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Peak Power" }),
        /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-primary-600", children: [
          Math.max(...data.map((d) => d.powerOutput)).toFixed(1),
          " MW"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Capacity Factor" }),
        /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-orange-600", children: [
          (data.reduce((acc, d) => acc + d.efficiency, 0) / data.length).toFixed(1),
          "%"
        ] })
      ] })
    ] })
  ] });
};

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getAlerts();
        setAlerts(data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 3e4);
    return () => clearInterval(interval);
  }, []);
  const getAlertIcon = (type) => {
    switch (type) {
      case "critical":
        return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-red-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) });
      case "warning":
        return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-orange-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) });
      case "info":
        return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-blue-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) });
    }
  };
  const getAlertBgColor = (type) => {
    switch (type) {
      case "critical":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-orange-50 border-orange-200";
      case "info":
        return "bg-blue-50 border-blue-200";
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsxs("div", { className: "animate-pulse", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-1/2 mb-4" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-200 rounded" }),
        /* @__PURE__ */ jsx("div", { className: "h-12 bg-gray-200 rounded" })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Active Alerts" }),
      /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500", children: [
        alerts.filter((a) => !a.resolved).length,
        " active"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3 max-h-96 overflow-y-auto", children: alerts.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8 text-gray-500", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 mx-auto mb-2 text-gray-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
      /* @__PURE__ */ jsx("p", { children: "No active alerts" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", children: "All systems operating normally" })
    ] }) : alerts.map((alert) => /* @__PURE__ */ jsx(
      "div",
      {
        className: `p-3 rounded-lg border ${getAlertBgColor(alert.type)} ${alert.resolved ? "opacity-50" : ""}`,
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-0.5", children: getAlertIcon(alert.type) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900", children: alert.turbineId }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: alert.message }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: new Date(alert.timestamp).toLocaleString() })
          ] }),
          !alert.resolved && /* @__PURE__ */ jsx("button", { className: "flex-shrink-0 text-sm text-primary-600 hover:text-primary-700", children: "View" })
        ] })
      },
      alert.id
    )) }),
    alerts.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 pt-4 border-t", children: /* @__PURE__ */ jsx("button", { className: "w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium", children: "View All Alerts →" }) })
  ] });
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Full Circle Wind Services - Dashboard" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-6"> <!-- Full Circle Welcome Banner --> <div class="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-6 mb-6 shadow-lg"> <div class="flex items-center justify-between"> <div> <h1 class="text-2xl font-bold mb-2">Welcome to Full Circle Wind Services Platform</h1> <p class="text-green-100">Nearly 20 Years of Multi-Brand O&M Excellence • 24/7/365 Technical Support</p> </div> <a href="/fullcircle" class="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition">
View Full Circle Dashboard →
</a> </div> </div> <!-- Header Stats --> <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"> <div class="bg-white rounded-lg shadow p-6"> <div class="flex items-center justify-between"> <div> <p class="text-sm text-gray-600">Total Turbines</p> <p class="text-3xl font-bold text-gray-900">12</p> </div> <svg class="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path> </svg> </div> </div> <div class="bg-white rounded-lg shadow p-6"> <div class="flex items-center justify-between"> <div> <p class="text-sm text-gray-600">Total Power</p> <p class="text-3xl font-bold text-success-600">42.5 MW</p> </div> <svg class="w-12 h-12 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path> </svg> </div> </div> <div class="bg-white rounded-lg shadow p-6"> <div class="flex items-center justify-between"> <div> <p class="text-sm text-gray-600">Avg Wind Speed</p> <p class="text-3xl font-bold text-blue-600">12.3 m/s</p> </div> <svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path> </svg> </div> </div> <div class="bg-white rounded-lg shadow p-6"> <div class="flex items-center justify-between"> <div> <p class="text-sm text-gray-600">Active Alerts</p> <p class="text-3xl font-bold text-orange-600">3</p> </div> <svg class="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path> </svg> </div> </div> </div> <!-- Main Content Grid --> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"> <!-- Map Section --> <div class="lg:col-span-2"> <div class="bg-white rounded-lg shadow p-6"> <h2 class="text-xl font-bold mb-4">Turbine Locations</h2> <div class="h-96"> ${renderComponent($$result2, "CoastalWindMap", CoastalWindMap, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/CoastalWindMap", "client:component-export": "default" })} </div> </div> <!-- Performance Chart --> <div class="bg-white rounded-lg shadow p-6 mt-6"> <h2 class="text-xl font-bold mb-4">Power Generation (24h)</h2> ${renderComponent($$result2, "PerformanceChart", PerformanceChart, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/PerformanceChart", "client:component-export": "default" })} </div> </div> <!-- Right Sidebar --> <div class="space-y-6"> <!-- Weather Widget --> ${renderComponent($$result2, "WeatherWidget", WeatherWidget, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/WeatherWidget", "client:component-export": "default" })} <!-- Alerts Panel --> ${renderComponent($$result2, "AlertsPanel", AlertsPanel, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/AlertsPanel", "client:component-export": "default" })} <!-- Turbine Status --> ${renderComponent($$result2, "TurbineStatus", TurbineStatus, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/TurbineStatus", "client:component-export": "default" })} </div> </div> </div> ` })}`;
}, "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/index.astro", void 0);

const $$file = "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
