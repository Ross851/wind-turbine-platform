/* empty css                                     */
import { c as createComponent, f as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_iamXxi9r.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BWZED4E_.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, LineChart, Legend, Line } from 'recharts';
export { renderers } from '../renderers.mjs';

const GlobalStats = () => {
  const [timeRange, setTimeRange] = useState("week");
  const globalData = {
    totalTurbines: 328547,
    totalCapacity: 845.2,
    // GW
    countriesActive: 84,
    averageCapacityFactor: 35.2,
    co2Avoided: 1.2,
    // billion tons/year
    homesEquivalent: 425e6
  };
  const countryData = [
    { country: "China", capacity: 288.3, turbines: 145e3 },
    { country: "USA", capacity: 132.7, turbines: 67e3 },
    { country: "Germany", capacity: 63.8, turbines: 32e3 },
    { country: "India", capacity: 39.2, turbines: 22e3 },
    { country: "Spain", capacity: 27.1, turbines: 21e3 },
    { country: "UK", capacity: 24.7, turbines: 11e3 },
    { country: "France", capacity: 18.8, turbines: 9e3 },
    { country: "Brazil", capacity: 17.7, turbines: 8500 },
    { country: "Others", capacity: 233.9, turbines: 13047 }
  ];
  const manufacturerData = [
    { name: "Vestas", value: 28.5, color: "#0066cc" },
    { name: "Siemens Gamesa", value: 22.3, color: "#00aa44" },
    { name: "GE", value: 18.7, color: "#ff6600" },
    { name: "Goldwind", value: 12.4, color: "#ffcc00" },
    { name: "Enercon", value: 8.6, color: "#990099" },
    { name: "Others", value: 9.5, color: "#666666" }
  ];
  const growthData = [
    { year: "2018", capacity: 591, offshore: 23 },
    { year: "2019", capacity: 651, offshore: 29 },
    { year: "2020", capacity: 743, offshore: 35 },
    { year: "2021", capacity: 837, offshore: 57 },
    { year: "2022", capacity: 906, offshore: 64 },
    { year: "2023", capacity: 1021, offshore: 75 },
    { year: "2024", capacity: 1147, offshore: 92 }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Total Turbines" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: globalData.totalTurbines.toLocaleString() }),
        /* @__PURE__ */ jsx("p", { className: "text-xs opacity-75 mt-1", children: "Worldwide" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Total Capacity" }),
        /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold", children: [
          globalData.totalCapacity,
          " GW"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs opacity-75 mt-1", children: "Installed power" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Countries" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: globalData.countriesActive }),
        /* @__PURE__ */ jsx("p", { className: "text-xs opacity-75 mt-1", children: "With wind power" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Capacity Factor" }),
        /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold", children: [
          globalData.averageCapacityFactor,
          "%"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs opacity-75 mt-1", children: "Global average" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-lg p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "CO₂ Avoided" }),
        /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold", children: [
          globalData.co2Avoided,
          "B"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs opacity-75 mt-1", children: "Tons per year" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Homes Powered" }),
        /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold", children: [
          (globalData.homesEquivalent / 1e6).toFixed(0),
          "M"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs opacity-75 mt-1", children: "Equivalent homes" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Wind Power Capacity by Country" }),
        /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(BarChart, { data: countryData, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "country", angle: -45, textAnchor: "end", height: 70 }),
          /* @__PURE__ */ jsx(YAxis, { label: { value: "Capacity (GW)", angle: -90, position: "insideLeft" } }),
          /* @__PURE__ */ jsx(Tooltip, {}),
          /* @__PURE__ */ jsx(Bar, { dataKey: "capacity", fill: "#0066cc" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Global Manufacturer Market Share" }),
        /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(PieChart, { children: [
          /* @__PURE__ */ jsx(
            Pie,
            {
              data: manufacturerData,
              cx: "50%",
              cy: "50%",
              labelLine: false,
              label: ({ name, value }) => `${name}: ${value}%`,
              outerRadius: 100,
              fill: "#8884d8",
              dataKey: "value",
              children: manufacturerData.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: entry.color }, `cell-${index}`))
            }
          ),
          /* @__PURE__ */ jsx(Tooltip, {})
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Global Wind Power Growth Trend" }),
      /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(LineChart, { data: growthData, children: [
        /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
        /* @__PURE__ */ jsx(XAxis, { dataKey: "year" }),
        /* @__PURE__ */ jsx(YAxis, { label: { value: "Capacity (GW)", angle: -90, position: "insideLeft" } }),
        /* @__PURE__ */ jsx(Tooltip, {}),
        /* @__PURE__ */ jsx(Legend, {}),
        /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "capacity", stroke: "#0066cc", name: "Total Capacity", strokeWidth: 2 }),
        /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "offshore", stroke: "#00aa44", name: "Offshore", strokeWidth: 2 })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3", children: "Onshore vs Offshore" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Onshore" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: "92%" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsx("div", { className: "bg-green-500 h-2 rounded-full", style: { width: "92%" } }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Offshore" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: "8%" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsx("div", { className: "bg-blue-500 h-2 rounded-full", style: { width: "8%" } }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3", children: "Average Turbine Size" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Onshore" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "3.2 MW" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Offshore" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "8.0 MW" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Hub Height (avg)" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "105m" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Rotor Diameter (avg)" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "126m" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3", children: "Power Generation" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Annual Generation" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "2,100 TWh" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Global Electricity" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "7.5%" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Growth Rate" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-green-600", children: "+12%/yr" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "2030 Target" }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "3,000 GW" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "Live Global Wind Power Status" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Current Output" }),
          /* @__PURE__ */ jsxs("p", { className: "text-3xl font-bold", children: [
            (globalData.totalCapacity * 0.352).toFixed(1),
            " GW"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs opacity-75", children: "Real-time generation" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Wind Speed (avg)" }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold", children: "8.7 m/s" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs opacity-75", children: "Global average" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "Turbines Online" }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold", children: "94.2%" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs opacity-75", children: "Operational status" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm opacity-90", children: "CO₂ Saved Today" }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold", children: "3.3M" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs opacity-75", children: "Tons avoided" })
        ] })
      ] })
    ] })
  ] });
};

const $$Statistics = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Global Wind Power Statistics" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-6"> <div class="mb-6"> <h1 class="text-3xl font-bold text-gray-900">Global Wind Power Statistics</h1> <p class="text-gray-600 mt-2">Real-time insights into worldwide wind energy production and trends</p> </div> ${renderComponent($$result2, "GlobalStats", GlobalStats, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/GlobalStats", "client:component-export": "default" })} </div> ` })}`;
}, "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/statistics.astro", void 0);

const $$file = "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/statistics.astro";
const $$url = "/statistics";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Statistics,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
