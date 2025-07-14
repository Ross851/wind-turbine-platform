import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_NfmPo9vy.mjs';
import { manifest } from './manifest_CS37Bdta.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/analytics.astro.mjs');
const _page2 = () => import('./pages/api/health.astro.mjs');
const _page3 = () => import('./pages/fullcircle.astro.mjs');
const _page4 = () => import('./pages/global.astro.mjs');
const _page5 = () => import('./pages/maintenance.astro.mjs');
const _page6 = () => import('./pages/offshore.astro.mjs');
const _page7 = () => import('./pages/statistics.astro.mjs');
const _page8 = () => import('./pages/technicians.astro.mjs');
const _page9 = () => import('./pages/turbines.astro.mjs');
const _page10 = () => import('./pages/weather.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/analytics.astro", _page1],
    ["src/pages/api/health.ts", _page2],
    ["src/pages/fullcircle.astro", _page3],
    ["src/pages/global.astro", _page4],
    ["src/pages/maintenance.astro", _page5],
    ["src/pages/offshore.astro", _page6],
    ["src/pages/statistics.astro", _page7],
    ["src/pages/technicians.astro", _page8],
    ["src/pages/turbines.astro", _page9],
    ["src/pages/weather.astro", _page10],
    ["src/pages/index.astro", _page11]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "bb020774-2ce9-4cc4-9479-1b7b325988c0",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
