/* empty css                                     */
import { c as createComponent, f as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_iamXxi9r.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BWZED4E_.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useState, useEffect } from 'react';
import { L, T as TurbineDetailModal } from '../chunks/TurbineDetailModal_DFPhc8Hi.mjs';
/* empty css                                 */
/* empty css                                  */
import 'leaflet.markercluster';
export { renderers } from '../renderers.mjs';

class GlobalTurbineService {
  static instance;
  turbineCache = /* @__PURE__ */ new Map();
  static getInstance() {
    if (!GlobalTurbineService.instance) {
      GlobalTurbineService.instance = new GlobalTurbineService();
    }
    return GlobalTurbineService.instance;
  }
  // Fetch turbines from OpenStreetMap Overpass API
  async fetchTurbinesInBounds(north, south, east, west) {
    const overpassQuery = `
      [out:json][timeout:25];
      (
        node["generator:source"="wind"](${south},${west},${north},${east});
        way["generator:source"="wind"](${south},${west},${north},${east});
      );
      out body;
    `;
    try {
      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: overpassQuery,
        headers: {
          "Content-Type": "text/plain"
        }
      });
      const data = await response.json();
      return this.convertOSMToTurbines(data.elements);
    } catch (error) {
      console.error("Error fetching OSM turbines:", error);
      return this.getMockGlobalTurbines(north, south, east, west);
    }
  }
  // Convert OSM data to our Turbine format
  convertOSMToTurbines(osmElements) {
    return osmElements.map((element) => {
      const power = element.tags["generator:output:electricity"] ? parseFloat(element.tags["generator:output:electricity"].replace(/[^0-9.]/g, "")) / 1e3 : 2;
      const height = element.tags.height ? parseFloat(element.tags.height.replace(/[^0-9.]/g, "")) : 100;
      const rotorDiameter = element.tags.rotor_diameter ? parseFloat(element.tags.rotor_diameter.replace(/[^0-9.]/g, "")) : 90;
      return {
        id: `OSM-${element.id}`,
        name: element.tags.operator ? `${element.tags.operator} Turbine ${element.id}` : `Turbine ${element.id}`,
        type: "onshore",
        // OSM doesn't distinguish, would need coastal analysis
        status: "operational",
        // Default status
        location: {
          lat: element.lat,
          lng: element.lon,
          altitude: 0
        },
        specifications: {
          model: element.tags.model || "Unknown Model",
          manufacturer: element.tags.manufacturer || "Unknown",
          capacity: power,
          rotorDiameter,
          hubHeight: height,
          installationDate: element.tags.start_date || "2020-01-01"
        },
        performance: {
          currentPower: power * 0.8,
          // Assume 80% capacity factor
          totalEnergy: power * 24 * 365 * 3,
          // 3 years of operation
          capacityFactor: 80,
          availability: 95,
          windSpeed: 12,
          rotorSpeed: 15,
          temperature: 15
        },
        maintenance: {
          lastInspection: "2024-01-01",
          nextScheduled: "2024-06-01",
          hoursRunning: 26280,
          // 3 years
          alerts: []
        }
      };
    });
  }
  // Mock data for demonstration when OSM is unavailable
  getMockGlobalTurbines(north, south, east, west) {
    const turbines = [];
    const latStep = (north - south) / 10;
    const lngStep = (east - west) / 10;
    for (let lat = south; lat < north; lat += latStep) {
      for (let lng = west; lng < east; lng += lngStep) {
        const offsetLat = lat + (Math.random() - 0.5) * latStep * 0.8;
        const offsetLng = lng + (Math.random() - 0.5) * lngStep * 0.8;
        const manufacturers = ["Vestas", "Siemens Gamesa", "GE", "Enercon", "Nordex"];
        const models = ["V150-4.2", "SG 5.0-145", "GE 2.7-116", "E-126 EP3", "N149/4.0-4.5"];
        const capacities = [2, 2.5, 3, 3.6, 4.2, 5];
        const manufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)];
        const model = models[Math.floor(Math.random() * models.length)];
        const capacity = capacities[Math.floor(Math.random() * capacities.length)];
        turbines.push({
          id: `MOCK-${lat.toFixed(4)}-${lng.toFixed(4)}`,
          name: `${manufacturer} Wind Farm ${turbines.length + 1}`,
          type: Math.abs(offsetLat) < 60 && Math.random() > 0.7 ? "offshore" : "onshore",
          status: Math.random() > 0.9 ? "maintenance" : "operational",
          location: {
            lat: offsetLat,
            lng: offsetLng,
            altitude: Math.random() * 500
          },
          specifications: {
            model,
            manufacturer,
            capacity,
            rotorDiameter: 90 + Math.random() * 60,
            hubHeight: 80 + Math.random() * 40,
            installationDate: `20${18 + Math.floor(Math.random() * 6)}-01-01`
          },
          performance: {
            currentPower: capacity * (0.6 + Math.random() * 0.3),
            totalEnergy: capacity * 24 * 365 * Math.random() * 5,
            capacityFactor: 70 + Math.random() * 25,
            availability: 90 + Math.random() * 9,
            windSpeed: 5 + Math.random() * 15,
            rotorSpeed: 10 + Math.random() * 10,
            temperature: 10 + Math.random() * 15
          },
          maintenance: {
            lastInspection: "2024-01-01",
            nextScheduled: "2024-06-01",
            hoursRunning: Math.floor(Math.random() * 4e4),
            alerts: []
          }
        });
      }
    }
    return turbines;
  }
  // Get turbine statistics for a region
  async getRegionStatistics(bounds) {
    const turbines = await this.fetchTurbinesInBounds(
      bounds.north,
      bounds.south,
      bounds.east,
      bounds.west
    );
    const stats = {
      totalTurbines: turbines.length,
      totalCapacity: turbines.reduce((sum, t) => sum + t.specifications.capacity, 0),
      averageCapacity: turbines.length > 0 ? turbines.reduce((sum, t) => sum + t.specifications.capacity, 0) / turbines.length : 0,
      manufacturers: {},
      operationalStatus: {
        operational: 0,
        maintenance: 0,
        offline: 0,
        warning: 0
      },
      types: {
        onshore: 0,
        offshore: 0
      }
    };
    turbines.forEach((turbine) => {
      const manufacturer = turbine.specifications.manufacturer;
      stats.manufacturers[manufacturer] = (stats.manufacturers[manufacturer] || 0) + 1;
      stats.operationalStatus[turbine.status]++;
      stats.types[turbine.type]++;
    });
    return stats;
  }
}
const globalTurbineService = GlobalTurbineService.getInstance();

const GlobalTurbineMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef(null);
  const [turbineCount, setTurbineCount] = useState(0);
  const [totalCapacity, setTotalCapacity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedTurbine, setSelectedTurbine] = useState(null);
  const [viewMode, setViewMode] = useState("satellite");
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [regionStats, setRegionStats] = useState(null);
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const map = L.map(mapRef.current, {
      center: [54.5, 15],
      // Center on Northern Europe
      zoom: 5,
      maxZoom: 18,
      minZoom: 3
    });
    mapInstanceRef.current = map;
    const tileLayers = {
      satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri"
      }),
      terrain: L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        attribution: "Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap"
      }),
      street: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
      })
    };
    tileLayers.satellite.addTo(map);
    const markers = L.markerClusterGroup({
      chunkedLoading: true,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      maxClusterRadius: 50,
      iconCreateFunction: (cluster) => {
        const childCount = cluster.getChildCount();
        let c = " marker-cluster-";
        if (childCount < 10) {
          c += "small";
        } else if (childCount < 100) {
          c += "medium";
        } else {
          c += "large";
        }
        return new L.DivIcon({
          html: `<div><span>${childCount}</span></div>`,
          className: "marker-cluster" + c,
          iconSize: new L.Point(40, 40)
        });
      }
    });
    markersRef.current = markers;
    map.addLayer(markers);
    const loadTurbinesInView = async () => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();
      if (zoom < 7) {
        setRegionStats({
          message: "Zoom in to load turbine data",
          zoom
        });
        return;
      }
      setLoading(true);
      try {
        const turbines = await globalTurbineService.fetchTurbinesInBounds(
          bounds.getNorth(),
          bounds.getSouth(),
          bounds.getEast(),
          bounds.getWest()
        );
        markers.clearLayers();
        turbines.forEach((turbine) => {
          const iconColor = turbine.type === "offshore" ? "#0066cc" : "#00aa44";
          const icon = L.divIcon({
            html: `
              <div class="global-turbine-marker" style="color: ${iconColor}">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" opacity="0.3"/>
                  <path d="M12 2l3 6h-6z"/>
                  <path d="M12 2l-3 6 6 0z" transform="rotate(120 12 12)"/>
                  <path d="M12 2l-3 6 6 0z" transform="rotate(240 12 12)"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
            `,
            className: "turbine-icon-global",
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });
          const marker = L.marker([turbine.location.lat, turbine.location.lng], { icon }).on("click", () => setSelectedTurbine(turbine));
          marker.bindPopup(`
            <div class="turbine-popup">
              <h4 class="font-bold">${turbine.name}</h4>
              <div class="text-sm space-y-1">
                <p><strong>Type:</strong> ${turbine.type}</p>
                <p><strong>Manufacturer:</strong> ${turbine.specifications.manufacturer}</p>
                <p><strong>Model:</strong> ${turbine.specifications.model}</p>
                <p><strong>Capacity:</strong> ${turbine.specifications.capacity} MW</p>
                <p><strong>Hub Height:</strong> ${turbine.specifications.hubHeight}m</p>
                <p><strong>Rotor Diameter:</strong> ${turbine.specifications.rotorDiameter}m</p>
                ${turbine.specifications.manufacturer !== "Unknown" ? `
                  <p><strong>Status:</strong> <span class="status-${turbine.status}">${turbine.status}</span></p>
                ` : ""}
              </div>
              <button onclick="window.dispatchEvent(new CustomEvent('viewTurbineDetails', { detail: '${turbine.id}' }))" 
                      class="mt-3 w-full px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                View Details
              </button>
            </div>
          `);
          markers.addLayer(marker);
        });
        setTurbineCount(turbines.length);
        setTotalCapacity(turbines.reduce((sum, t) => sum + t.specifications.capacity, 0));
        const stats = await globalTurbineService.getRegionStatistics({
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest()
        });
        setRegionStats(stats);
      } catch (error) {
        console.error("Error loading turbines:", error);
      } finally {
        setLoading(false);
      }
    };
    map.on("moveend", loadTurbinesInView);
    map.on("zoomend", loadTurbinesInView);
    loadTurbinesInView();
    const handleViewModeChange = (e) => {
      const mode = e.detail;
      Object.values(tileLayers).forEach((layer) => map.removeLayer(layer));
      tileLayers[mode].addTo(map);
    };
    window.addEventListener("changeMapView", handleViewModeChange);
    const handleViewDetails = (e) => {
      const turbineId = e.detail;
      console.log("View details for turbine:", turbineId);
    };
    window.addEventListener("viewTurbineDetails", handleViewDetails);
    return () => {
      window.removeEventListener("changeMapView", handleViewModeChange);
      window.removeEventListener("viewTurbineDetails", handleViewDetails);
      map.off("moveend", loadTurbinesInView);
      map.off("zoomend", loadTurbinesInView);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "relative h-full", children: [
    /* @__PURE__ */ jsx("div", { ref: mapRef, className: "w-full h-full" }),
    /* @__PURE__ */ jsxs("div", { className: "absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-[1000]", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-2", children: "Global Wind Turbines" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Turbines in view: ",
          /* @__PURE__ */ jsx("span", { className: "font-bold", children: turbineCount.toLocaleString() })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Total capacity: ",
          /* @__PURE__ */ jsxs("span", { className: "font-bold", children: [
            totalCapacity.toFixed(1),
            " MW"
          ] })
        ] }),
        loading && /* @__PURE__ */ jsx("p", { className: "text-blue-600", children: "Loading turbines..." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold text-gray-600", children: "Map View" }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: ["satellite", "terrain", "street"].map((mode) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setViewMode(mode);
              window.dispatchEvent(new CustomEvent("changeMapView", { detail: mode }));
            },
            className: `px-3 py-1 text-xs rounded ${viewMode === mode ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
            children: mode.charAt(0).toUpperCase() + mode.slice(1)
          },
          mode
        )) })
      ] })
    ] }),
    regionStats && regionStats.manufacturers && /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-[1000] max-w-sm", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "Region Statistics" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Manufacturers:" }),
          /* @__PURE__ */ jsx("div", { className: "ml-2 text-xs space-y-1", children: Object.entries(regionStats.manufacturers).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([manufacturer, count]) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: manufacturer }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: count })
          ] }, manufacturer)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-2 border-t", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: "Onshore:" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: regionStats.types.onshore })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: "Offshore:" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium text-blue-600", children: regionStats.types.offshore })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-[1000]", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-sm mb-2", children: "Legend" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full bg-green-500" }),
          /* @__PURE__ */ jsx("span", { children: "Onshore Turbine" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full bg-blue-500" }),
          /* @__PURE__ */ jsx("span", { children: "Offshore Turbine" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs", children: "10" }),
          /* @__PURE__ */ jsx("span", { children: "Cluster" })
        ] })
      ] })
    ] }),
    regionStats && regionStats.message && /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-1/2 transform -translate-x-1/2 bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2 z-[1000]", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-yellow-800", children: regionStats.message }) }),
    selectedTurbine && /* @__PURE__ */ jsx(
      TurbineDetailModal,
      {
        turbine: selectedTurbine,
        isOpen: !!selectedTurbine,
        onClose: () => setSelectedTurbine(null)
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
        .marker-cluster-small {
          background-color: rgba(255, 165, 0, 0.6);
        }
        .marker-cluster-small div {
          background-color: rgba(255, 140, 0, 0.6);
        }
        .marker-cluster-medium {
          background-color: rgba(255, 120, 0, 0.6);
        }
        .marker-cluster-medium div {
          background-color: rgba(255, 90, 0, 0.6);
        }
        .marker-cluster-large {
          background-color: rgba(255, 60, 0, 0.6);
        }
        .marker-cluster-large div {
          background-color: rgba(255, 30, 0, 0.6);
        }
        .marker-cluster {
          background-clip: padding-box;
          border-radius: 20px;
        }
        .marker-cluster div {
          width: 30px;
          height: 30px;
          margin-left: 5px;
          margin-top: 5px;
          text-align: center;
          border-radius: 15px;
          font: 12px Arial, Helvetica, sans-serif;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .marker-cluster span {
          line-height: 30px;
        }
        .global-turbine-marker {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .turbine-popup {
          min-width: 200px;
        }
        .status-operational { color: #10b981; font-weight: bold; }
        .status-maintenance { color: #3b82f6; font-weight: bold; }
        .status-offline { color: #ef4444; font-weight: bold; }
        .status-warning { color: #f59e0b; font-weight: bold; }
      ` })
  ] });
};

const $$Global = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Global Wind Turbine Map", "data-astro-cid-5e33ian5": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container-fluid h-screen" data-astro-cid-5e33ian5> <div class="h-full pt-16" data-astro-cid-5e33ian5> ${renderComponent($$result2, "GlobalTurbineMap", GlobalTurbineMap, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/GlobalTurbineMap", "client:component-export": "default", "data-astro-cid-5e33ian5": true })} </div> </div> ` })} `;
}, "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/global.astro", void 0);

const $$file = "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/global.astro";
const $$url = "/global";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Global,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
