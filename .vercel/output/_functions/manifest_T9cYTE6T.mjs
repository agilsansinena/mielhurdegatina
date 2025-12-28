import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_C6WF4vph.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_LFmhrr_p.mjs';
import 'es-module-lexer';

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
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
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

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/","cacheDir":"file:///C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/.astro/","outDir":"file:///C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/dist/","srcDir":"file:///C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/","publicDir":"file:///C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/public/","buildClientDir":"file:///C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/dist/client/","buildServerDir":"file:///C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/capture-paypal-order","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/capture-paypal-order\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"capture-paypal-order","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/capture-paypal-order.ts","pathname":"/api/capture-paypal-order","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/create-paypal-order","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/create-paypal-order\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"create-paypal-order","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/create-paypal-order.ts","pathname":"/api/create-paypal-order","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/exito.BHxbgHD8.css"}],"routeData":{"route":"/exito","isIndex":false,"type":"page","pattern":"^\\/exito\\/?$","segments":[[{"content":"exito","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/exito.astro","pathname":"/exito","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/exito.BHxbgHD8.css"}],"routeData":{"route":"/terminos-y-condiciones","isIndex":false,"type":"page","pattern":"^\\/terminos-y-condiciones\\/?$","segments":[[{"content":"terminos-y-condiciones","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terminos-y-condiciones.astro","pathname":"/terminos-y-condiciones","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/pages/exito.astro",{"propagation":"none","containsHead":true}],["C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/pages/terminos-y-condiciones.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/capture-paypal-order@_@ts":"pages/api/capture-paypal-order.astro.mjs","\u0000@astro-page:src/pages/api/create-paypal-order@_@ts":"pages/api/create-paypal-order.astro.mjs","\u0000@astro-page:src/pages/exito@_@astro":"pages/exito.astro.mjs","\u0000@astro-page:src/pages/terminos-y-condiciones@_@astro":"pages/terminos-y-condiciones.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_T9cYTE6T.mjs","C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_B0c047qk.mjs","C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.DGQeKMt8.js","C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/components/ProductCard.astro?astro&type=script&index=0&lang.ts":"_astro/ProductCard.astro_astro_type_script_index_0_lang.4ZsTefH-.js","C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/components/Cart.astro?astro&type=script&index=0&lang.ts":"_astro/Cart.astro_astro_type_script_index_0_lang.O6hbeIIX.js","C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/components/CookieBanner.astro?astro&type=script&index=0&lang.ts":"_astro/CookieBanner.astro_astro_type_script_index_0_lang.C8vEqGVc.js","C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.QW52Ox2j.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/components/CookieBanner.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"cookie-banner\"),t=document.getElementById(\"accept-cookies\");localStorage.getItem(\"cookies-accepted\")||setTimeout(()=>{e?.classList.remove(\"translate-y-full\")},1500);t?.addEventListener(\"click\",()=>{localStorage.setItem(\"cookies-accepted\",\"true\"),e?.classList.add(\"translate-y-full\")});"]],"assets":["/_astro/logo-rgb-A85MJZK7J2SBMK2k.BBPrXBAa.avif","/_astro/miel2kg.BHcaRvB8.avif","/_astro/miel1kg.DkRZSuql.avif","/_astro/miel500g.BhOXwzzY.avif","/_astro/hero-bg.qEPUjH0K.png","/_astro/Torrecilla_de_los_Angeles.BlExPwkF.jpg","/_astro/exito.BHxbgHD8.css","/favicon.avif","/favicon.svg","/_astro/Cart.astro_astro_type_script_index_0_lang.O6hbeIIX.js","/_astro/cartStore.BAH_Vpr5.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.QW52Ox2j.js","/_astro/Header.astro_astro_type_script_index_0_lang.DGQeKMt8.js","/_astro/ProductCard.astro_astro_type_script_index_0_lang.4ZsTefH-.js","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"1doGMn2SB7oR5fYKO5YRlX7ZEWTCQl9aGjpSdvk9mI4="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
