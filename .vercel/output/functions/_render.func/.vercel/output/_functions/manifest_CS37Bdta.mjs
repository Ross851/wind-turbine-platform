import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DJd2hfYl.mjs';
import 'es-module-lexer';
import { g as decodeKey } from './chunks/astro/server_iamXxi9r.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"function e(){const n=new Date().toLocaleTimeString(),t=document.getElementById(\"lastUpdate\");t&&(t.textContent=n)}e();setInterval(e,1e3);\n"}],"styles":[{"type":"external","src":"/_astro/analytics.BSyTPM8H.css"}],"routeData":{"route":"/analytics","isIndex":false,"type":"page","pattern":"^\\/analytics\\/?$","segments":[[{"content":"analytics","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/analytics.astro","pathname":"/analytics","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/health","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/health\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"health","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/health.ts","pathname":"/api/health","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"function e(){const n=new Date().toLocaleTimeString(),t=document.getElementById(\"lastUpdate\");t&&(t.textContent=n)}e();setInterval(e,1e3);\n"}],"styles":[{"type":"external","src":"/_astro/analytics.BSyTPM8H.css"}],"routeData":{"route":"/fullcircle","isIndex":false,"type":"page","pattern":"^\\/fullcircle\\/?$","segments":[[{"content":"fullcircle","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/fullcircle.astro","pathname":"/fullcircle","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"function e(){const n=new Date().toLocaleTimeString(),t=document.getElementById(\"lastUpdate\");t&&(t.textContent=n)}e();setInterval(e,1e3);\n"}],"styles":[{"type":"external","src":"/_astro/analytics.BSyTPM8H.css"},{"type":"inline","content":".leaflet-cluster-anim .leaflet-marker-icon,.leaflet-cluster-anim .leaflet-marker-shadow{transition:transform .3s ease-out,opacity .3s ease-in}.leaflet-cluster-spider-leg{transition:stroke-dashoffset .3s ease-out,stroke-opacity .3s ease-in}.marker-cluster-small{background-color:#b5e28c99}.marker-cluster-small div{background-color:#6ecc3999}.marker-cluster-medium{background-color:#f1d35799}.marker-cluster-medium div{background-color:#f0c20c99}.marker-cluster-large{background-color:#fd9c7399}.marker-cluster-large div{background-color:#f1801799}.leaflet-oldie .marker-cluster-small{background-color:#b5e28c}.leaflet-oldie .marker-cluster-small div{background-color:#6ecc39}.leaflet-oldie .marker-cluster-medium{background-color:#f1d357}.leaflet-oldie .marker-cluster-medium div{background-color:#f0c20c}.leaflet-oldie .marker-cluster-large{background-color:#fd9c73}.leaflet-oldie .marker-cluster-large div{background-color:#f18017}.marker-cluster{background-clip:padding-box;border-radius:20px}.marker-cluster div{width:30px;height:30px;margin-left:5px;margin-top:5px;text-align:center;border-radius:15px;font:12px Helvetica Neue,Arial,Helvetica,sans-serif}.marker-cluster span{line-height:30px}.container-fluid[data-astro-cid-5e33ian5]{width:100%;margin:0;padding:0}.h-screen[data-astro-cid-5e33ian5]{height:100vh}.pt-16[data-astro-cid-5e33ian5]{padding-top:4rem}\n"},{"type":"external","src":"/_astro/index.Dgihpmma.css"}],"routeData":{"route":"/global","isIndex":false,"type":"page","pattern":"^\\/global\\/?$","segments":[[{"content":"global","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/global.astro","pathname":"/global","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"function e(){const n=new Date().toLocaleTimeString(),t=document.getElementById(\"lastUpdate\");t&&(t.textContent=n)}e();setInterval(e,1e3);\n"}],"styles":[{"type":"external","src":"/_astro/analytics.BSyTPM8H.css"}],"routeData":{"route":"/maintenance","isIndex":false,"type":"page","pattern":"^\\/maintenance\\/?$","segments":[[{"content":"maintenance","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/maintenance.astro","pathname":"/maintenance","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"function e(){const n=new Date().toLocaleTimeString(),t=document.getElementById(\"lastUpdate\");t&&(t.textContent=n)}e();setInterval(e,1e3);\n"}],"styles":[{"type":"external","src":"/_astro/analytics.BSyTPM8H.css"}],"routeData":{"route":"/offshore","isIndex":false,"type":"page","pattern":"^\\/offshore\\/?$","segments":[[{"content":"offshore","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/offshore.astro","pathname":"/offshore","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"function e(){const n=new Date().toLocaleTimeString(),t=document.getElementById(\"lastUpdate\");t&&(t.textContent=n)}e();setInterval(e,1e3);\n"}],"styles":[{"type":"external","src":"/_astro/analytics.BSyTPM8H.css"}],"routeData":{"route":"/statistics","isIndex":false,"type":"page","pattern":"^\\/statistics\\/?$","segments":[[{"content":"statistics","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/statistics.astro","pathname":"/statistics","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"function e(){const n=new Date().toLocaleTimeString(),t=document.getElementById(\"lastUpdate\");t&&(t.textContent=n)}e();setInterval(e,1e3);\n"}],"styles":[{"type":"external","src":"/_astro/analytics.BSyTPM8H.css"}],"routeData":{"route":"/technicians","isIndex":false,"type":"page","pattern":"^\\/technicians\\/?$","segments":[[{"content":"technicians","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/technicians.astro","pathname":"/technicians","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"function e(){const n=new Date().toLocaleTimeString(),t=document.getElementById(\"lastUpdate\");t&&(t.textContent=n)}e();setInterval(e,1e3);\n"}],"styles":[{"type":"external","src":"/_astro/analytics.BSyTPM8H.css"}],"routeData":{"route":"/turbines","isIndex":false,"type":"page","pattern":"^\\/turbines\\/?$","segments":[[{"content":"turbines","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/turbines.astro","pathname":"/turbines","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"function e(){const n=new Date().toLocaleTimeString(),t=document.getElementById(\"lastUpdate\");t&&(t.textContent=n)}e();setInterval(e,1e3);\n"}],"styles":[{"type":"external","src":"/_astro/analytics.BSyTPM8H.css"}],"routeData":{"route":"/weather","isIndex":false,"type":"page","pattern":"^\\/weather\\/?$","segments":[[{"content":"weather","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/weather.astro","pathname":"/weather","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"function e(){const n=new Date().toLocaleTimeString(),t=document.getElementById(\"lastUpdate\");t&&(t.textContent=n)}e();setInterval(e,1e3);\n"}],"styles":[{"type":"external","src":"/_astro/analytics.BSyTPM8H.css"},{"type":"external","src":"/_astro/index.Dgihpmma.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/analytics.astro",{"propagation":"none","containsHead":true}],["/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/fullcircle.astro",{"propagation":"none","containsHead":true}],["/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/global.astro",{"propagation":"none","containsHead":true}],["/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/maintenance.astro",{"propagation":"none","containsHead":true}],["/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/offshore.astro",{"propagation":"none","containsHead":true}],["/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/statistics.astro",{"propagation":"none","containsHead":true}],["/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/technicians.astro",{"propagation":"none","containsHead":true}],["/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/turbines.astro",{"propagation":"none","containsHead":true}],["/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/pages/weather.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/api/health@_@ts":"pages/api/health.astro.mjs","\u0000@astro-page:src/pages/analytics@_@astro":"pages/analytics.astro.mjs","\u0000@astro-page:src/pages/fullcircle@_@astro":"pages/fullcircle.astro.mjs","\u0000@astro-page:src/pages/maintenance@_@astro":"pages/maintenance.astro.mjs","\u0000@astro-page:src/pages/offshore@_@astro":"pages/offshore.astro.mjs","\u0000@astro-page:src/pages/statistics@_@astro":"pages/statistics.astro.mjs","\u0000@astro-page:src/pages/technicians@_@astro":"pages/technicians.astro.mjs","\u0000@astro-page:src/pages/turbines@_@astro":"pages/turbines.astro.mjs","\u0000@astro-page:src/pages/weather@_@astro":"pages/weather.astro.mjs","\u0000@astro-page:src/pages/global@_@astro":"pages/global.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_CS37Bdta.mjs","/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/PredictiveAnalytics":"_astro/PredictiveAnalytics.BfRl8w8X.js","/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/FullCircleIntegration":"_astro/FullCircleIntegration.CjcMZ2lk.js","/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/OffshoreMonitor":"_astro/OffshoreMonitor.C7rhZpKV.js","/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/GlobalTurbineMap":"_astro/GlobalTurbineMap.S1cEuVjf.js","/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/MaintenanceScheduler":"_astro/MaintenanceScheduler.AKYoYnHj.js","/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/TechnicianCompetencyTracker":"_astro/TechnicianCompetencyTracker.BMMV8SdO.js","/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/GlobalStats":"_astro/GlobalStats.B7TIlXAA.js","/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/WeatherDashboard":"_astro/WeatherDashboard.zb6fxxSS.js","/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/TurbineList":"_astro/TurbineList.DZGwXvKo.js","/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/CoastalWindMap":"_astro/CoastalWindMap.C7Lxxekp.js","/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/PerformanceChart":"_astro/PerformanceChart.CEg_mDEi.js","/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/WeatherWidget":"_astro/WeatherWidget.CunjAaGx.js","/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/AlertsPanel":"_astro/AlertsPanel.Dvs7OZ5Z.js","/mnt/c/Users/Ross/M365-Lighthouse/wind-turbine-platform/wind-turbine-astro/src/components/TurbineStatus":"_astro/TurbineStatus.C4zkddkw.js","@astrojs/react/client.js":"_astro/client.CaOyRcmD.js","/astro/hoisted.js?q=0":"_astro/hoisted.gTTBtcLF.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/analytics.BSyTPM8H.css","/_astro/index.Dgihpmma.css","/favicon.svg","/_astro/AlertsPanel.Dvs7OZ5Z.js","/_astro/BarChart.BwfFe4oH.js","/_astro/CoastalWindMap.C7Lxxekp.js","/_astro/FullCircleIntegration.CjcMZ2lk.js","/_astro/GlobalStats.B7TIlXAA.js","/_astro/GlobalTurbineMap.S1cEuVjf.js","/_astro/LineChart.7kx4qUhX.js","/_astro/MaintenanceScheduler.AKYoYnHj.js","/_astro/OffshoreMonitor.C7rhZpKV.js","/_astro/PerformanceChart.CEg_mDEi.js","/_astro/PredictiveAnalytics.BfRl8w8X.js","/_astro/TechnicianCompetencyTracker.BMMV8SdO.js","/_astro/TurbineDetailModal.BVYzYKzL.js","/_astro/TurbineList.DZGwXvKo.js","/_astro/TurbineStatus.C4zkddkw.js","/_astro/WeatherDashboard.zb6fxxSS.js","/_astro/WeatherWidget.CunjAaGx.js","/_astro/client.CaOyRcmD.js","/_astro/format.DnvyW2U9.js","/_astro/global.3yaWYNWa.css","/_astro/index.DJO9vBfz.js","/_astro/jsx-runtime.BftctW7E.js","/_astro/turbine-service.CN_jfETl.js","/_astro/weather-service.BbyU-1F5.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"WGrFKu8eirgvSAqSOValtTfhr5ilrOrhtVN1mDuJHa8=","experimentalEnvGetSecretEnabled":false});

export { manifest };
