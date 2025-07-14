/* empty css                                     */
import { c as createComponent, f as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_iamXxi9r.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BWZED4E_.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { g as getTurbines, a as getMaintenanceSchedule } from '../chunks/turbine-service__kBIkQyv.mjs';
import { startOfWeek, endOfWeek, eachDayOfInterval, addDays, format, isSameDay } from 'date-fns';
export { renderers } from '../renderers.mjs';

const MaintenanceScheduler = () => {
  const [turbines, setTurbines] = useState([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(/* @__PURE__ */ new Date());
  const [view, setView] = useState("calendar");
  useEffect(() => {
    const fetchData = async () => {
      const [turbinesData, maintenanceData] = await Promise.all([
        getTurbines(),
        getMaintenanceSchedule()
      ]);
      setTurbines(turbinesData);
      setMaintenanceRecords(maintenanceData);
    };
    fetchData();
  }, []);
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const getMaintenanceForDate = (date) => {
    return turbines.filter(
      (turbine) => isSameDay(new Date(turbine.maintenance.nextScheduled), date)
    );
  };
  const getMaintenanceType = (turbine) => {
    const hoursSinceLastMaintenance = turbine.maintenance.hoursRunning;
    if (hoursSinceLastMaintenance > 2e3) return "major";
    if (hoursSinceLastMaintenance > 1e3) return "minor";
    return "inspection";
  };
  const getMaintenanceColor = (type) => {
    switch (type) {
      case "major":
        return "bg-red-100 text-red-800 border-red-200";
      case "minor":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "inspection":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedDate(addDays(selectedDate, -7)),
            className: "p-2 hover:bg-gray-100 rounded",
            children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
          }
        ),
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold", children: [
          "Week of ",
          format(weekStart, "MMM d, yyyy")
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedDate(addDays(selectedDate, 7)),
            className: "p-2 hover:bg-gray-100 rounded",
            children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setView("calendar"),
            className: `px-4 py-2 rounded ${view === "calendar" ? "bg-primary-600 text-white" : "bg-gray-100"}`,
            children: "Calendar View"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setView("list"),
            className: `px-4 py-2 rounded ${view === "list" ? "bg-primary-600 text-white" : "bg-gray-100"}`,
            children: "List View"
          }
        )
      ] })
    ] }) }),
    view === "calendar" && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-px bg-gray-200", children: weekDays.map((day) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 px-4 py-2 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: format(day, "EEE") }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: format(day, "d") })
      ] }, day.toISOString())) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-px bg-gray-200", children: weekDays.map((day) => {
        const dayMaintenance = getMaintenanceForDate(day);
        return /* @__PURE__ */ jsx("div", { className: "bg-white p-4 min-h-[200px]", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          dayMaintenance.map((turbine) => {
            const type = getMaintenanceType(turbine);
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: `p-2 rounded border text-xs ${getMaintenanceColor(type)}`,
                children: [
                  /* @__PURE__ */ jsx("div", { className: "font-semibold", children: turbine.name }),
                  /* @__PURE__ */ jsxs("div", { className: "capitalize", children: [
                    type,
                    " maintenance"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-1", children: [
                    turbine.maintenance.hoursRunning,
                    " hrs"
                  ] })
                ]
              },
              turbine.id
            );
          }),
          dayMaintenance.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-sm text-center py-8", children: "No maintenance" })
        ] }) }, day.toISOString());
      }) })
    ] }),
    view === "list" && /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Upcoming Maintenance" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: turbines.sort((a, b) => new Date(a.maintenance.nextScheduled).getTime() - new Date(b.maintenance.nextScheduled).getTime()).map((turbine) => {
        const type = getMaintenanceType(turbine);
        const daysUntil = Math.ceil((new Date(turbine.maintenance.nextScheduled).getTime() - Date.now()) / (1e3 * 60 * 60 * 24));
        return /* @__PURE__ */ jsx("div", { className: "border rounded-lg p-4 hover:bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: turbine.name }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: turbine.specifications.model }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 space-y-1 text-sm", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                "Type: ",
                /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded text-xs ${getMaintenanceColor(type)}`, children: type })
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                "Last Inspection: ",
                format(new Date(turbine.maintenance.lastInspection), "MMM d, yyyy")
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                "Running Hours: ",
                turbine.maintenance.hoursRunning
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: format(new Date(turbine.maintenance.nextScheduled), "MMM d") }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: daysUntil === 0 ? "Today" : `In ${daysUntil} days` }),
            /* @__PURE__ */ jsx("button", { className: "mt-2 text-sm text-primary-600 hover:text-primary-700", children: "Schedule Team →" })
          ] })
        ] }) }, turbine.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "This Week" }),
        /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold", children: turbines.filter((t) => {
          const date = new Date(t.maintenance.nextScheduled);
          return date >= weekStart && date <= weekEnd;
        }).length })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Overdue" }),
        /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-red-600", children: turbines.filter((t) => new Date(t.maintenance.nextScheduled) < /* @__PURE__ */ new Date()).length })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Next 30 Days" }),
        /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold", children: turbines.filter((t) => {
          const date = new Date(t.maintenance.nextScheduled);
          return date > /* @__PURE__ */ new Date() && date <= addDays(/* @__PURE__ */ new Date(), 30);
        }).length })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Avg Hours/Turbine" }),
        /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold", children: Math.round(turbines.reduce((sum, t) => sum + t.maintenance.hoursRunning, 0) / turbines.length) })
      ] })
    ] })
  ] });
};

const $$Maintenance = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Maintenance Scheduler" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-6"> <div class="mb-6"> <h1 class="text-3xl font-bold text-gray-900">Maintenance Scheduler</h1> <p class="text-gray-600 mt-2">Plan and track maintenance activities across your turbine fleet</p> </div> ${renderComponent($$result2, "MaintenanceScheduler", MaintenanceScheduler, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/MaintenanceScheduler", "client:component-export": "default" })} </div> ` })}`;
}, "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/maintenance.astro", void 0);

const $$file = "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/maintenance.astro";
const $$url = "/maintenance";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Maintenance,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
