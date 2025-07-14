export { renderers } from '../../renderers.mjs';

const prerender = false;
async function GET() {
  return new Response(
    JSON.stringify({
      status: "healthy",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      platform: "Wind Turbine Management Platform",
      version: "1.0.0"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
