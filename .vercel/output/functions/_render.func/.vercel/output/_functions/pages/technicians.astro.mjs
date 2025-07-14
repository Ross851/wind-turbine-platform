/* empty css                                     */
import { c as createComponent, f as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_iamXxi9r.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BWZED4E_.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { format } from 'date-fns';
export { renderers } from '../renderers.mjs';

const TechnicianCompetencyTracker = () => {
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [view, setView] = useState("grid");
  const technicians = [
    {
      id: "TECH001",
      name: "John Smith",
      certifications: [
        { name: "Wind Turbine Safety", expiryDate: "2024-12-15", status: "valid" },
        { name: "Electrical Systems", expiryDate: "2024-06-01", status: "expiring" },
        { name: "Hydraulics Specialist", expiryDate: "2025-03-20", status: "valid" }
      ],
      specialties: ["Gearbox Maintenance", "Bearing Replacement", "Control Systems"],
      competencyScore: 92,
      totalJobs: 156,
      avgCompletionTime: 4.2,
      reworkRate: 2.1,
      lastTraining: "2024-01-15",
      mentorStatus: "mentor",
      workHistory: [
        {
          turbineId: "WT001",
          turbineName: "North Wind 001",
          date: "2024-03-01",
          workType: "Scheduled Maintenance",
          duration: 4.5,
          quality: "excellent",
          followUpRequired: false,
          secondaryIssues: []
        },
        {
          turbineId: "WT003",
          turbineName: "Mountain Peak 001",
          date: "2024-02-15",
          workType: "Bearing Replacement",
          duration: 8,
          quality: "good",
          followUpRequired: true,
          secondaryIssues: ["Minor oil leak detected"]
        }
      ]
    },
    {
      id: "TECH002",
      name: "Sarah Johnson",
      certifications: [
        { name: "Wind Turbine Safety", expiryDate: "2024-11-30", status: "valid" },
        { name: "Electrical Systems", expiryDate: "2024-03-15", status: "expired" },
        { name: "Blade Inspection", expiryDate: "2025-01-10", status: "valid" }
      ],
      specialties: ["Control Systems", "Electrical Troubleshooting", "SCADA"],
      competencyScore: 88,
      totalJobs: 98,
      avgCompletionTime: 5.1,
      reworkRate: 4.3,
      lastTraining: "2023-11-20",
      mentorStatus: "standard",
      workHistory: []
    },
    {
      id: "TECH003",
      name: "Mike Wilson",
      certifications: [
        { name: "Wind Turbine Safety", expiryDate: "2025-02-28", status: "valid" },
        { name: "Basic Maintenance", expiryDate: "2025-06-15", status: "valid" }
      ],
      specialties: ["Routine Maintenance"],
      competencyScore: 72,
      totalJobs: 34,
      avgCompletionTime: 6.8,
      reworkRate: 8.2,
      lastTraining: "2024-02-01",
      mentorStatus: "trainee",
      workHistory: []
    }
  ];
  const getCompetencyColor = (score) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-blue-600 bg-blue-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };
  const getCertificationColor = (status) => {
    switch (status) {
      case "valid":
        return "text-green-600 bg-green-50";
      case "expiring":
        return "text-orange-600 bg-orange-50";
      case "expired":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };
  const selectedTech = technicians.find((t) => t.id === selectedTechnician);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Technician Competency & Skills Tracking" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: "Monitor certifications, performance, and training needs" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setView("grid"),
            className: `px-4 py-2 rounded ${view === "grid" ? "bg-primary-600 text-white" : "bg-gray-100"}`,
            children: "Grid View"
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
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-red-50 border border-red-200 rounded-lg p-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-red-800", children: "Expired Certifications" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-red-600 mt-1", children: "1" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-red-700", children: "Sarah Johnson - Electrical Systems" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 border border-orange-200 rounded-lg p-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-orange-800", children: "Training Overdue" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-orange-600 mt-1", children: "2" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-orange-700", children: "Technicians need refresher training" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-blue-800", children: "Skills Gap Identified" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-blue-600 mt-1", children: "3" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-700", children: "Areas needing additional coverage" })
      ] })
    ] }),
    view === "grid" ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: technicians.map((tech) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow",
        onClick: () => setSelectedTechnician(tech.id),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", children: tech.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: tech.id })
            ] }),
            /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-sm font-medium ${tech.mentorStatus === "mentor" ? "bg-purple-100 text-purple-800" : tech.mentorStatus === "trainee" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`, children: tech.mentorStatus })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Competency Score" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-1 bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `h-2 rounded-full ${tech.competencyScore >= 90 ? "bg-green-500" : tech.competencyScore >= 80 ? "bg-blue-500" : tech.competencyScore >= 70 ? "bg-yellow-500" : "bg-red-500"}`,
                    style: { width: `${tech.competencyScore}%` }
                  }
                ) }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
                  tech.competencyScore,
                  "%"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Total Jobs" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium", children: tech.totalJobs })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Avg Time" }),
                /* @__PURE__ */ jsxs("p", { className: "font-medium", children: [
                  tech.avgCompletionTime,
                  "h"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Rework Rate" }),
                /* @__PURE__ */ jsxs("p", { className: `font-medium ${tech.reworkRate < 5 ? "text-green-600" : "text-red-600"}`, children: [
                  tech.reworkRate,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Last Training" }),
                /* @__PURE__ */ jsx("p", { className: "font-medium", children: format(new Date(tech.lastTraining), "MMM yyyy") })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Certifications" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: tech.certifications.map((cert, idx) => /* @__PURE__ */ jsxs(
                "span",
                {
                  className: `px-2 py-1 rounded text-xs ${getCertificationColor(cert.status)}`,
                  children: [
                    cert.status === "expired" && "❌ ",
                    cert.status === "expiring" && "⚠️ ",
                    cert.status === "valid" && "✅ ",
                    cert.name
                  ]
                },
                idx
              )) })
            ] })
          ] })
        ]
      },
      tech.id
    )) }) : /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Technician" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Competency" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Jobs/Rework" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Certifications" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y", children: technicians.map((tech) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: "hover:bg-gray-50 cursor-pointer",
          onClick: () => setSelectedTechnician(tech.id),
          children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: tech.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: tech.id })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("span", { className: `px-3 py-1 rounded-full text-sm font-medium ${getCompetencyColor(tech.competencyScore)}`, children: [
              tech.competencyScore,
              "%"
            ] }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-sm", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                tech.totalJobs,
                " jobs"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: tech.reworkRate < 5 ? "text-green-600" : "text-red-600", children: [
                tech.reworkRate,
                "% rework"
              ] })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
              tech.certifications.filter((c) => c.status === "expired").length > 0 && /* @__PURE__ */ jsxs("span", { className: "text-red-600", children: [
                "❌ ",
                tech.certifications.filter((c) => c.status === "expired").length
              ] }),
              tech.certifications.filter((c) => c.status === "expiring").length > 0 && /* @__PURE__ */ jsxs("span", { className: "text-orange-600", children: [
                "⚠️ ",
                tech.certifications.filter((c) => c.status === "expiring").length
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-green-600", children: [
                "✅ ",
                tech.certifications.filter((c) => c.status === "valid").length
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-xs font-medium ${tech.mentorStatus === "mentor" ? "bg-purple-100 text-purple-800" : tech.mentorStatus === "trainee" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`, children: tech.mentorStatus }) })
          ]
        },
        tech.id
      )) })
    ] }) }),
    selectedTech && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold", children: [
            selectedTech.name,
            " - Detailed Profile"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
            "ID: ",
            selectedTech.id,
            " | Status: ",
            selectedTech.mentorStatus
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedTechnician(null),
            className: "text-gray-500 hover:text-gray-700",
            children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3", children: "Certifications & Training" }),
          selectedTech.certifications.map((cert, idx) => /* @__PURE__ */ jsx("div", { className: `mb-2 p-3 rounded ${getCertificationColor(cert.status)}`, children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: cert.name }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
              "Expires: ",
              format(new Date(cert.expiryDate), "MMM d, yyyy")
            ] })
          ] }) }, idx)),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 bg-gray-50 rounded", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Next Required Training" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Advanced Diagnostics - Due by April 2024" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3", children: "Performance Metrics" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsx("span", { children: "Mean Time to Complete" }),
                /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                  selectedTech.avgCompletionTime,
                  " hours"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-600", children: "Industry avg: 5.5 hours" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsx("span", { children: "Secondary Issues Rate" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium text-orange-600", children: "12%" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-600", children: "Target: <10%" })
            ] }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { children: "Customer Satisfaction" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-green-600", children: "4.8/5.0" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("h4", { className: "font-semibold mt-6 mb-3", children: "Specialties & Skills" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: selectedTech.specialties.map((skill, idx) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm", children: skill }, idx)) })
        ] })
      ] }),
      selectedTech.workHistory.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-3", children: "Recent Work History" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: selectedTech.workHistory.map((work, idx) => /* @__PURE__ */ jsxs("div", { className: "border rounded p-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: work.turbineName }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: format(new Date(work.date), "MMM d, yyyy") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm mt-1", children: [
            /* @__PURE__ */ jsx("span", { children: work.workType }),
            /* @__PURE__ */ jsx("span", { className: `font-medium ${work.quality === "excellent" ? "text-green-600" : work.quality === "good" ? "text-blue-600" : work.quality === "satisfactory" ? "text-yellow-600" : "text-red-600"}`, children: work.quality })
          ] }),
          work.secondaryIssues.length > 0 && /* @__PURE__ */ jsxs("p", { className: "text-sm text-orange-600 mt-1", children: [
            "⚠️ Secondary issues: ",
            work.secondaryIssues.join(", ")
          ] })
        ] }, idx)) })
      ] }),
      selectedTech.mentorStatus === "mentor" && /* @__PURE__ */ jsxs("div", { className: "mt-6 p-4 bg-purple-50 rounded-lg", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold text-purple-800", children: "Mentorship Status" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-purple-700 mt-1", children: [
          "This technician is qualified to train others in: ",
          selectedTech.specialties.slice(0, 2).join(", ")
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-purple-700 mt-1", children: "Currently mentoring: Mike Wilson (TECH003)" })
      ] })
    ] })
  ] });
};

const $$Technicians = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Technician Management" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-6"> ${renderComponent($$result2, "TechnicianCompetencyTracker", TechnicianCompetencyTracker, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/TechnicianCompetencyTracker", "client:component-export": "default" })} </div> ` })}`;
}, "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/technicians.astro", void 0);

const $$file = "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/technicians.astro";
const $$url = "/technicians";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Technicians,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
