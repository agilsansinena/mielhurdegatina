import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DerVQVpU.mjs';
import { manifest } from './manifest_G1NSrkZs.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/capture-paypal-order.astro.mjs');
const _page2 = () => import('./pages/api/create-paypal-order.astro.mjs');
const _page3 = () => import('./pages/exito.astro.mjs');
const _page4 = () => import('./pages/terminos-y-condiciones.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/capture-paypal-order.ts", _page1],
    ["src/pages/api/create-paypal-order.ts", _page2],
    ["src/pages/exito.astro", _page3],
    ["src/pages/terminos-y-condiciones.astro", _page4],
    ["src/pages/index.astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "ad75de18-2715-47b7-87bb-96bfe4295cfb",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
