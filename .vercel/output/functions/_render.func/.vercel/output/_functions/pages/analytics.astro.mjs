/* empty css                                     */
import { c as createComponent, f as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_iamXxi9r.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BWZED4E_.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, LineChart, Legend, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { c as calculateOptimalOperation } from '../chunks/turbine-service__kBIkQyv.mjs';
export { renderers } from '../renderers.mjs';

const PredictiveAnalytics = () => {
  const [selectedMetric, setSelectedMetric] = useState("failure");
  const failurePredictionData = [
    { component: "Gearbox", probability: 15, timeToFailure: 45, severity: "high" },
    { component: "Generator", probability: 8, timeToFailure: 120, severity: "medium" },
    { component: "Blades", probability: 22, timeToFailure: 30, severity: "high" },
    { component: "Hydraulics", probability: 12, timeToFailure: 60, severity: "low" },
    { component: "Control System", probability: 5, timeToFailure: 180, severity: "medium" },
    { component: "Bearings", probability: 18, timeToFailure: 40, severity: "high" }
  ];
  const performanceData = Array.from({ length: 24 }, (_, i) => {
    const windSpeed = 8 + Math.sin(i / 24 * Math.PI * 2) * 4 + Math.random() * 2;
    const optimal = calculateOptimalOperation(windSpeed, 180);
    return {
      hour: i,
      windSpeed,
      actualPower: optimal.recommendedPower * 0.9 + Math.random() * 10,
      optimalPower: optimal.recommendedPower,
      efficiency: 85 + Math.random() * 10
    };
  });
  const weatherImpactData = [
    { condition: "Wind Speed", impact: 85, optimal: 12, current: 10.5 },
    { condition: "Temperature", impact: 92, optimal: 15, current: 18 },
    { condition: "Humidity", impact: 78, optimal: 60, current: 75 },
    { condition: "Air Pressure", impact: 88, optimal: 1013, current: 1008 },
    { condition: "Turbulence", impact: 72, optimal: 0.1, current: 0.3 },
    { condition: "Wind Direction", impact: 95, optimal: 270, current: 265 }
  ];
  const modelConfidence = [
    { model: "Failure Prediction", accuracy: 92.5, dataPoints: 15e4 },
    { model: "Power Optimization", accuracy: 88.3, dataPoints: 2e5 },
    { model: "Weather Forecasting", accuracy: 85.7, dataPoints: 5e5 },
    { model: "Maintenance Timing", accuracy: 90.2, dataPoints: 75e3 }
  ];
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-orange-600 bg-orange-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setSelectedMetric("failure"),
          className: `px-6 py-3 rounded-lg font-medium transition-colors ${selectedMetric === "failure" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
          children: "Failure Predictions"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setSelectedMetric("performance"),
          className: `px-6 py-3 rounded-lg font-medium transition-colors ${selectedMetric === "performance" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
          children: "Performance Optimization"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setSelectedMetric("weather"),
          className: `px-6 py-3 rounded-lg font-medium transition-colors ${selectedMetric === "weather" ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
          children: "Weather Impact"
        }
      )
    ] }) }),
    selectedMetric === "failure" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Component Failure Risk" }),
          /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(BarChart, { data: failurePredictionData, children: [
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
            /* @__PURE__ */ jsx(XAxis, { dataKey: "component", angle: -45, textAnchor: "end", height: 80 }),
            /* @__PURE__ */ jsx(YAxis, { label: { value: "Failure Probability (%)", angle: -90, position: "insideLeft" } }),
            /* @__PURE__ */ jsx(Tooltip, {}),
            /* @__PURE__ */ jsx(Bar, { dataKey: "probability", fill: "#ff6b6b" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Critical Components" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: failurePredictionData.sort((a, b) => b.probability - a.probability).slice(0, 4).map((item) => /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "font-medium", children: item.component }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [
                  "Failure in ~",
                  item.timeToFailure,
                  " days"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-red-600", children: [
                  item.probability,
                  "%"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: `text-xs px-2 py-1 rounded ${getSeverityColor(item.severity)}`, children: [
                  item.severity,
                  " risk"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "bg-red-600 h-2 rounded-full",
                style: { width: `${item.probability}%` }
              }
            ) }) })
          ] }, item.component)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Recommended Actions" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "border-l-4 border-red-500 pl-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-medium text-red-600", children: "Immediate Action" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm mt-1", children: "Schedule blade inspection for WT001, WT003" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Risk reduction: 15%" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-l-4 border-orange-500 pl-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-medium text-orange-600", children: "This Week" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm mt-1", children: "Replace gearbox oil in offshore turbines" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Risk reduction: 8%" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-l-4 border-blue-500 pl-4", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-medium text-blue-600", children: "This Month" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm mt-1", children: "Preventive bearing maintenance cycle" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Risk reduction: 12%" })
          ] })
        ] })
      ] })
    ] }),
    selectedMetric === "performance" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Power Output Optimization (24h)" }),
        /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 400, children: /* @__PURE__ */ jsxs(LineChart, { data: performanceData, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "hour", label: { value: "Hour", position: "insideBottom", offset: -5 } }),
          /* @__PURE__ */ jsx(YAxis, { label: { value: "Power Output (%)", angle: -90, position: "insideLeft" } }),
          /* @__PURE__ */ jsx(Tooltip, {}),
          /* @__PURE__ */ jsx(Legend, {}),
          /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "actualPower", stroke: "#8884d8", name: "Actual Power", strokeWidth: 2 }),
          /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "optimalPower", stroke: "#82ca9d", name: "Optimal Power", strokeWidth: 2, strokeDasharray: "5 5" }),
          /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "windSpeed", stroke: "#ffc658", name: "Wind Speed (m/s)", yAxisId: "right" }),
          /* @__PURE__ */ jsx(YAxis, { yAxisId: "right", orientation: "right", label: { value: "Wind Speed (m/s)", angle: 90, position: "insideRight" } })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Optimization Potential" }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-primary-600", children: "+12.5%" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-2", children: "Additional power possible" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-4", children: "Equivalent to 5.2 MW across fleet" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Top Improvements" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Pitch angle optimization" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-green-600", children: "+4.2%" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Yaw alignment" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-green-600", children: "+3.8%" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Power curve tuning" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-green-600", children: "+2.9%" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Wake effect mitigation" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-green-600", children: "+1.6%" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Financial Impact" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Daily Revenue Increase" }),
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-success-600", children: "€12,450" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Annual Projection" }),
              /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-success-600", children: "€4.5M" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    selectedMetric === "weather" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Weather Impact Analysis" }),
          /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(RadarChart, { data: weatherImpactData, children: [
            /* @__PURE__ */ jsx(PolarGrid, {}),
            /* @__PURE__ */ jsx(PolarAngleAxis, { dataKey: "condition" }),
            /* @__PURE__ */ jsx(PolarRadiusAxis, { angle: 90, domain: [0, 100] }),
            /* @__PURE__ */ jsx(Radar, { name: "Impact Score", dataKey: "impact", stroke: "#8884d8", fill: "#8884d8", fillOpacity: 0.6 }),
            /* @__PURE__ */ jsx(Tooltip, {})
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Current Conditions Impact" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: weatherImpactData.map((item) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: item.condition }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
                item.impact,
                "% efficiency"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: `h-2 rounded-full ${item.impact > 80 ? "bg-green-500" : item.impact > 60 ? "bg-yellow-500" : "bg-red-500"}`,
                style: { width: `${item.impact}%` }
              }
            ) }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
              "Current: ",
              item.current,
              " | Optimal: ",
              item.optimal
            ] })
          ] }, item.condition)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "48-Hour Weather Optimization" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center p-4 border rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Next 6 Hours" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-600", children: "Optimal" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "Full capacity operation" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-4 border rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "6-12 Hours" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-yellow-600", children: "Caution" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "High wind expected" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-4 border rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "12-24 Hours" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-600", children: "Good" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "Steady conditions" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center p-4 border rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "24-48 Hours" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-blue-600", children: "Variable" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "Storm system possible" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "AI Model Performance" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: modelConfidence.map((model) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-gray-600", children: model.model }),
        /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold mt-1", children: [
          model.accuracy,
          "%"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-2", children: [
          (model.dataPoints / 1e3).toFixed(0),
          "k training samples"
        ] })
      ] }, model.model)) })
    ] })
  ] });
};

const $$Analytics = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Predictive Analytics" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-6"> <div class="mb-6"> <h1 class="text-3xl font-bold text-gray-900">Predictive Analytics</h1> <p class="text-gray-600 mt-2">AI-powered insights and failure predictions for your turbine fleet</p> </div> ${renderComponent($$result2, "PredictiveAnalytics", PredictiveAnalytics, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/PredictiveAnalytics", "client:component-export": "default" })} </div> ` })}`;
}, "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/analytics.astro", void 0);

const $$file = "/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/analytics.astro";
const $$url = "/analytics";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Analytics,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
