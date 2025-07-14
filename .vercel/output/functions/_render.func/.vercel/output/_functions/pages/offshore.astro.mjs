/* empty css                                     */
import { c as createComponent, f as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_iamXxi9r.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BWZED4E_.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { g as getTurbines } from '../chunks/turbine-service__kBIkQyv.mjs';
import { g as getSeaConditions } from '../chunks/weather-service_D7GiCR_J.mjs';
export { renderers } from '../renderers.mjs';

const OffshoreMonitor = () => {
  const [turbines, setTurbines] = useState([]);
  const [filter, setFilter] = useState("all");
  const [seaConditions, setSeaConditions] = useState(/* @__PURE__ */ new Map());
  const [maintenanceWindows, setMaintenanceWindows] = useState(/* @__PURE__ */ new Map());
  const [showSeaView, setShowSeaView] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const turbineData = await getTurbines();
      setTurbines(turbineData);
      const offshoreOnly = turbineData.filter((t) => t.type === "offshore");
      const seaData = /* @__PURE__ */ new Map();
      for (const turbine of offshoreOnly) {
        const conditions = await getSeaConditions(turbine.location.lat, turbine.location.lng);
        seaData.set(turbine.id, conditions);
      }
      setSeaConditions(seaData);
      calculateMaintenanceWindows(seaData);
    };
    fetchData();
    const interval = setInterval(fetchData, 3e5);
    return () => clearInterval(interval);
  }, []);
  const calculateMaintenanceWindows = (seaData) => {
    const windows = /* @__PURE__ */ new Map();
    seaData.forEach((conditions, turbineId) => {
      const turbineWindows = [];
      for (let day = 0; day < 7; day++) {
        for (let hour = 0; hour < 24; hour += 6) {
          const date = /* @__PURE__ */ new Date();
          date.setDate(date.getDate() + day);
          date.setHours(hour, 0, 0, 0);
          const waveHeight = conditions.waveHeight + (Math.random() - 0.5) * 2;
          const windSpeed = 10 + Math.random() * 15;
          let conditionRating;
          if (waveHeight < 1.5 && windSpeed < 15) {
            conditionRating = "optimal";
          } else if (waveHeight < 2.5 && windSpeed < 20) {
            conditionRating = "acceptable";
          } else if (waveHeight < 3.5 && windSpeed < 25) {
            conditionRating = "risky";
          } else {
            conditionRating = "dangerous";
          }
          turbineWindows.push({
            start: new Date(date),
            end: new Date(date.getTime() + 6 * 60 * 60 * 1e3),
            conditions: conditionRating,
            waveHeight: Number(waveHeight.toFixed(1)),
            windSpeed: Number(windSpeed.toFixed(1))
          });
        }
      }
      windows.set(turbineId, turbineWindows);
    });
    setMaintenanceWindows(windows);
  };
  const getFilteredTurbines = () => {
    return turbines.filter((turbine) => {
      switch (filter) {
        case "offshore":
          return turbine.type === "offshore";
        case "maintenance-needed":
          return turbine.status === "maintenance" || turbine.maintenance.alerts.length > 0;
        case "offline":
          return turbine.status === "offline";
        default:
          return true;
      }
    });
  };
  const getConditionColor = (condition) => {
    switch (condition) {
      case "optimal":
        return "bg-green-500";
      case "acceptable":
        return "bg-yellow-500";
      case "risky":
        return "bg-orange-500";
      case "dangerous":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  const getSeaConditionStatus = (conditions) => {
    if (conditions.waveHeight > 3) return { status: "dangerous", message: "No vessel operations" };
    if (conditions.waveHeight > 2) return { status: "risky", message: "Limited operations only" };
    if (conditions.waveHeight > 1.5) return { status: "acceptable", message: "Proceed with caution" };
    return { status: "optimal", message: "Safe for all operations" };
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Offshore Operations Monitor" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Real-time sea conditions and maintenance windows" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowSeaView(!showSeaView),
            className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",
            children: showSeaView ? "Show Turbine View" : "Show Sea Conditions"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: ["all", "offshore", "maintenance-needed", "offline"].map((filterType) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setFilter(filterType),
          className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === filterType ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
          children: [
            filterType === "all" && "All Turbines",
            filterType === "offshore" && "🌊 Offshore Only",
            filterType === "maintenance-needed" && "🔧 Needs Maintenance",
            filterType === "offline" && "⚠️ Offline"
          ]
        },
        filterType
      )) })
    ] }),
    showSeaView && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: getFilteredTurbines().filter((t) => t.type === "offshore").map((turbine) => {
      const conditions = seaConditions.get(turbine.id);
      const windows = maintenanceWindows.get(turbine.id) || [];
      const status = conditions ? getSeaConditionStatus(conditions) : null;
      return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: turbine.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
              "Status: ",
              /* @__PURE__ */ jsx("span", { className: `font-medium ${turbine.status === "operational" ? "text-green-600" : turbine.status === "offline" ? "text-red-600" : "text-orange-600"}`, children: turbine.status })
            ] })
          ] }),
          status && /* @__PURE__ */ jsx("div", { className: `px-3 py-1 rounded-full text-sm font-medium ${status.status === "optimal" ? "bg-green-100 text-green-800" : status.status === "acceptable" ? "bg-yellow-100 text-yellow-800" : status.status === "risky" ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800"}`, children: status.message })
        ] }),
        conditions && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-3 rounded", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Wave Height" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-blue-600", children: [
                conditions.waveHeight.toFixed(1),
                " m"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-3 rounded", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Current Speed" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-blue-600", children: [
                conditions.currentSpeed.toFixed(2),
                " m/s"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-teal-50 p-3 rounded", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Swell Height" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-teal-600", children: [
                conditions.swellHeight.toFixed(1),
                " m"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-teal-50 p-3 rounded", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Water Temp" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold text-teal-600", children: [
                conditions.waterTemperature.toFixed(1),
                "°C"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "Next 48h Maintenance Windows" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-8 gap-1", children: windows.slice(0, 8).map((window, idx) => /* @__PURE__ */ jsx(
              "div",
              {
                className: `h-8 rounded ${getConditionColor(window.conditions)} opacity-80 relative group cursor-pointer`,
                title: `${window.start.toLocaleTimeString()} - Wave: ${window.waveHeight}m`,
                children: /* @__PURE__ */ jsxs("div", { className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10", children: [
                  window.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                  /* @__PURE__ */ jsx("br", {}),
                  "Wave: ",
                  window.waveHeight,
                  "m",
                  /* @__PURE__ */ jsx("br", {}),
                  "Wind: ",
                  window.windSpeed,
                  " m/s"
                ] })
              },
              idx
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-2 text-xs text-gray-600", children: [
              /* @__PURE__ */ jsx("span", { children: "Now" }),
              /* @__PURE__ */ jsx("span", { children: "+48 hours" })
            ] })
          ] })
        ] }),
        turbine.status === "offline" && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-3 bg-red-50 rounded-lg border border-red-200", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-red-800", children: "⚠️ Turbine Offline" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-red-700 mt-1", children: "Waiting for sea conditions to improve for maintenance crew dispatch" })
        ] })
      ] }, turbine.id);
    }) }),
    !showSeaView && /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-4", children: "Maintenance Priority Queue" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: getFilteredTurbines().filter((t) => t.status === "maintenance" || t.status === "offline" || t.maintenance.alerts.length > 0).sort((a, b) => {
        if (a.status === "offline" && b.status !== "offline") return -1;
        if (b.status === "offline" && a.status !== "offline") return 1;
        return b.maintenance.alerts.length - a.maintenance.alerts.length;
      }).map((turbine) => {
        seaConditions.get(turbine.id);
        const nextGoodWindow = maintenanceWindows.get(turbine.id)?.find(
          (w) => w.conditions === "optimal" || w.conditions === "acceptable"
        );
        return /* @__PURE__ */ jsx("div", { className: "border rounded-lg p-4 hover:bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: turbine.name }),
              turbine.status === "offline" && /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full", children: "OFFLINE" }),
              turbine.type === "offshore" && /* @__PURE__ */ jsx("span", { className: "text-blue-600", children: "🌊" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: turbine.maintenance.alerts.length > 0 ? turbine.maintenance.alerts[0].message : "Scheduled maintenance required" }),
            nextGoodWindow && /* @__PURE__ */ jsxs("p", { className: "text-sm text-green-600 mt-2", children: [
              "✓ Next safe window: ",
              nextGoodWindow.start.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Priority" }),
            /* @__PURE__ */ jsx("p", { className: `text-2xl font-bold ${turbine.status === "offline" ? "text-red-600" : "text-orange-600"}`, children: turbine.status === "offline" ? "HIGH" : "MED" })
          ] })
        ] }) }, turbine.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-2", children: "Sea Condition Legend" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-green-500 rounded" }),
          /* @__PURE__ */ jsx("span", { children: "Optimal (Wave < 1.5m)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-yellow-500 rounded" }),
          /* @__PURE__ */ jsx("span", { children: "Acceptable (Wave < 2.5m)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-orange-500 rounded" }),
          /* @__PURE__ */ jsx("span", { children: "Risky (Wave < 3.5m)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-red-500 rounded" }),
          /* @__PURE__ */ jsx("span", { children: "Dangerous (Wave > 3.5m)" })
        ] })
      ] })
    ] })
  ] });
};

const $$Offshore = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Offshore Operations" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-6"> ${renderComponent($$result2, "OffshoreMonitor", OffshoreMonitor, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/OffshoreMonitor", "client:component-export": "default" })} </div> ` })}`;
}, "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/offshore.astro", void 0);

const $$file = "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/offshore.astro";
const $$url = "/offshore";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Offshore,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
