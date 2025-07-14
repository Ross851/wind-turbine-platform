/* empty css                                     */
import { c as createComponent, f as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_iamXxi9r.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BWZED4E_.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { format } from 'date-fns';
export { renderers } from '../renderers.mjs';

const FullCircleIntegration = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const brandExpertise = [
    {
      brand: "Vestas",
      models: ["V90", "V110", "V117", "V136", "V150"],
      certifiedTechnicians: 12,
      yearsExperience: 18,
      totalServiced: 450
    },
    {
      brand: "GE",
      models: ["1.5MW", "2.5MW", "2.7-116", "2.8-127", "3.x Platform"],
      certifiedTechnicians: 10,
      yearsExperience: 15,
      totalServiced: 380
    },
    {
      brand: "Siemens Gamesa",
      models: ["SWT-2.3", "SWT-3.0", "SG 5.0", "SG 8.0"],
      certifiedTechnicians: 8,
      yearsExperience: 12,
      totalServiced: 290
    },
    {
      brand: "Nordex",
      models: ["N117", "N131", "N149", "Delta4000"],
      certifiedTechnicians: 6,
      yearsExperience: 10,
      totalServiced: 180
    },
    {
      brand: "Enercon",
      models: ["E-82", "E-101", "E-126", "E-138"],
      certifiedTechnicians: 5,
      yearsExperience: 8,
      totalServiced: 120
    }
  ];
  const serviceTickets = [
    {
      id: "TKT-2024-001",
      turbineId: "WT-VES-001",
      brand: "Vestas",
      model: "V136",
      serviceType: "24/7-emergency",
      priority: "critical",
      status: "in-progress",
      description: "Gearbox temperature alarm - immediate inspection required",
      createdAt: "2024-03-13T14:30:00Z",
      assignedTeam: "Team Alpha",
      estimatedCompletion: "2024-03-13T18:00:00Z",
      customerName: "Wind Farm Holdings LLC",
      siteLocation: "Colorado Wind Farm"
    },
    {
      id: "TKT-2024-002",
      turbineId: "WT-GE-045",
      brand: "GE",
      model: "2.5MW",
      serviceType: "scheduled",
      priority: "medium",
      status: "open",
      description: "Annual maintenance - 8000 hour service",
      createdAt: "2024-03-13T09:00:00Z",
      assignedTeam: "Team Bravo",
      estimatedCompletion: "2024-03-15T17:00:00Z",
      customerName: "Green Energy Partners",
      siteLocation: "Texas Panhandle Site"
    }
  ];
  const supportMetrics = {
    averageResponseTime: 45,
    // minutes
    activeTickets: 12,
    ticketsToday: 8,
    ticketsThisWeek: 34,
    uptime: 97.8,
    technicianUtilization: 82
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-6 shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Full Circle Wind Services" }),
        /* @__PURE__ */ jsx("p", { className: "text-green-100 mt-1", children: "Multi-Brand O&M Excellence • 24/7 Technical Support" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-green-100", children: "Nearly 20 Years Experience" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: "1,420+ Turbines Serviced" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-1", children: /* @__PURE__ */ jsx("div", { className: "flex space-x-1", children: ["dashboard", "tickets", "expertise", "monitoring"].map((view) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setActiveView(view),
        className: `flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${activeView === view ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`,
        children: view.charAt(0).toUpperCase() + view.slice(1)
      },
      view
    )) }) }),
    activeView === "dashboard" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Response Time" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-green-600", children: [
              supportMetrics.averageResponseTime,
              "m"
            ] })
          ] }),
          /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Active Tickets" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: supportMetrics.activeTickets })
          ] }),
          /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-orange-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Today's Tickets" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: supportMetrics.ticketsToday })
          ] }),
          /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-blue-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Weekly Total" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: supportMetrics.ticketsThisWeek })
          ] }),
          /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-purple-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Fleet Uptime" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-green-600", children: [
              supportMetrics.uptime,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Tech Utilization" }),
            /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold", children: [
              supportMetrics.technicianUtilization,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-indigo-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Quick Actions" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("button", { className: "p-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 mx-auto mb-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }),
            "Create Service Ticket"
          ] }),
          /* @__PURE__ */ jsxs("button", { className: "p-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 mx-auto mb-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" }) }),
            "Schedule Maintenance"
          ] }),
          /* @__PURE__ */ jsxs("button", { className: "p-4 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 mx-auto mb-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
            "24/7 Support Contact"
          ] }),
          /* @__PURE__ */ jsxs("button", { className: "p-4 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 mx-auto mb-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
            "Performance Report"
          ] })
        ] })
      ] })
    ] }),
    activeView === "tickets" && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow", children: [
      /* @__PURE__ */ jsx("div", { className: "p-6 border-b", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Active Service Tickets" }),
        /* @__PURE__ */ jsx("button", { className: "px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700", children: "+ New Ticket" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: serviceTickets.map((ticket) => /* @__PURE__ */ jsx("div", { className: `border rounded-lg p-4 ${getPriorityColor(ticket.priority)}`, children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: ticket.id }),
            /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded text-xs font-medium ${ticket.serviceType === "24/7-emergency" ? "bg-red-600 text-white" : ticket.serviceType === "scheduled" ? "bg-blue-600 text-white" : ticket.serviceType === "inspection" ? "bg-purple-600 text-white" : "bg-gray-600 text-white"}`, children: ticket.serviceType }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-600", children: [
              ticket.brand,
              " ",
              ticket.model
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-800 mb-2", children: ticket.description }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Customer:" }),
              /* @__PURE__ */ jsx("span", { className: "ml-1 font-medium", children: ticket.customerName })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Site:" }),
              /* @__PURE__ */ jsx("span", { className: "ml-1 font-medium", children: ticket.siteLocation })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Team:" }),
              /* @__PURE__ */ jsx("span", { className: "ml-1 font-medium", children: ticket.assignedTeam })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "ETA:" }),
              /* @__PURE__ */ jsx("span", { className: "ml-1 font-medium", children: format(new Date(ticket.estimatedCompletion), "MMM d, h:mm a") })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "ml-4 text-right", children: /* @__PURE__ */ jsx("span", { className: `inline-block px-3 py-1 rounded-full text-sm font-medium ${ticket.status === "in-progress" ? "bg-blue-100 text-blue-800" : ticket.status === "completed" ? "bg-green-100 text-green-800" : ticket.status === "pending-parts" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`, children: ticket.status }) })
      ] }) }, ticket.id)) }) })
    ] }),
    activeView === "expertise" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Multi-Brand Service Expertise" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: brandExpertise.map((brand) => /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-4 hover:shadow-lg transition", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold", children: brand.brand }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-600", children: [
              brand.yearsExperience,
              " years"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Certified Technicians" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: brand.certifiedTechnicians })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Turbines Serviced" }),
              /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                brand.totalServiced,
                "+"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Models Supported:" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: brand.models.map((model) => /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-gray-100 text-xs rounded", children: model }, model)) })
          ] })
        ] }, brand.brand)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3", children: "Why Choose Full Circle?" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-green-600 mb-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
            /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "24/7/365 Support" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Round-the-clock technical support with rapid response times" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-blue-600 mb-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) }),
            /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "Multi-Brand Certified" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Expert technicians certified across all major turbine brands" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-purple-600 mb-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }),
            /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "Proactive Monitoring" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Advanced monitoring to prevent issues before they occur" })
          ] })
        ] })
      ] })
    ] }),
    activeView === "monitoring" && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Real-Time Fleet Monitoring" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-8 text-center", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-16 h-16 text-gray-400 mx-auto mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Advanced monitoring dashboard coming soon" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-2", children: "Real-time performance metrics, predictive analytics, and proactive alerts" })
      ] })
    ] })
  ] });
};

const $$Fullcircle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Full Circle Wind Services" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-6"> ${renderComponent($$result2, "FullCircleIntegration", FullCircleIntegration, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/FullCircleIntegration", "client:component-export": "default" })} </div> ` })}`;
}, "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/fullcircle.astro", void 0);

const $$file = "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/fullcircle.astro";
const $$url = "/fullcircle";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Fullcircle,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
