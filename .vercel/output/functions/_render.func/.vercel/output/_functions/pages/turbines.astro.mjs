/* empty css                                     */
import { c as createComponent, f as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_iamXxi9r.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BWZED4E_.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { g as getTurbines } from '../chunks/turbine-service__kBIkQyv.mjs';
export { renderers } from '../renderers.mjs';

const TurbineList = () => {
  const [turbines, setTurbines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
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
  }, []);
  const filteredTurbines = turbines.filter((turbine) => {
    const matchesFilter = filter === "all" || turbine.status === filter;
    const matchesSearch = turbine.name.toLowerCase().includes(searchTerm.toLowerCase()) || turbine.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  const getStatusBadge = (status) => {
    const colors = {
      operational: "bg-success-100 text-success-800",
      warning: "bg-orange-100 text-orange-800",
      maintenance: "bg-blue-100 text-blue-800",
      offline: "bg-red-100 text-red-800"
    };
    return `px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`;
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsx("div", { className: "animate-pulse space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "h-24 bg-gray-200 rounded" }, i)) }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow", children: [
    /* @__PURE__ */ jsx("div", { className: "p-6 border-b", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Search turbines...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["all", "operational", "warning", "maintenance", "offline"].map((status) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setFilter(status),
          className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
          children: status.charAt(0).toUpperCase() + status.slice(1)
        },
        status
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Turbine" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Location" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Performance" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Next Maintenance" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: filteredTurbines.map((turbine) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: turbine.name }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: turbine.specifications.model })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: getStatusBadge(turbine.status), children: turbine.status }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900", children: turbine.type === "offshore" ? "🌊 Offshore" : "🏔️ Onshore" }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
            turbine.location.lat.toFixed(4),
            ", ",
            turbine.location.lng.toFixed(4)
          ] })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Power:" }),
            /* @__PURE__ */ jsxs("span", { className: "ml-2 font-medium", children: [
              turbine.performance.currentPower,
              " MW"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Wind:" }),
            /* @__PURE__ */ jsxs("span", { className: "ml-2 font-medium", children: [
              turbine.performance.windSpeed,
              " m/s"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-900", children: new Date(turbine.maintenance.nextScheduled).toLocaleDateString() }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
            Math.ceil((new Date(turbine.maintenance.nextScheduled).getTime() - Date.now()) / (1e3 * 60 * 60 * 24)),
            " days"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
          /* @__PURE__ */ jsx("button", { className: "text-primary-600 hover:text-primary-900 mr-3", children: "View" }),
          /* @__PURE__ */ jsx("button", { className: "text-gray-600 hover:text-gray-900", children: "Edit" })
        ] })
      ] }, turbine.id)) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "p-6 bg-gray-50 border-t", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Total Turbines" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: turbines.length })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Operational" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-success-600", children: turbines.filter((t) => t.status === "operational").length })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Total Capacity" }),
        /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold", children: [
          turbines.reduce((sum, t) => sum + t.specifications.capacity, 0).toFixed(1),
          " MW"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Current Output" }),
        /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-primary-600", children: [
          turbines.reduce((sum, t) => sum + t.performance.currentPower, 0).toFixed(1),
          " MW"
        ] })
      ] })
    ] }) })
  ] });
};

const $$Turbines = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Turbine Management" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-6"> <div class="mb-6"> <h1 class="text-3xl font-bold text-gray-900">Turbine Fleet Management</h1> <p class="text-gray-600 mt-2">Monitor and manage all wind turbines in your fleet</p> </div> ${renderComponent($$result2, "TurbineList", TurbineList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/TurbineList", "client:component-export": "default" })} </div> ` })}`;
}, "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/turbines.astro", void 0);

const $$file = "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/turbines.astro";
const $$url = "/turbines";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Turbines,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
