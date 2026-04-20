import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BfH3kDbZ.mjs';
import { manifest } from './manifest_BoNXHzvJ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/capture-paypal-order.astro.mjs');
const _page2 = () => import('./pages/api/confirm-order.astro.mjs');
const _page3 = () => import('./pages/api/create-order.astro.mjs');
const _page4 = () => import('./pages/api/create-payment-intent.astro.mjs');
const _page5 = () => import('./pages/api/create-paypal-order.astro.mjs');
const _page6 = () => import('./pages/checkout.astro.mjs');
const _page7 = () => import('./pages/exito.astro.mjs');
const _page8 = () => import('./pages/pedido-confirmado.astro.mjs');
const _page9 = () => import('./pages/robots.txt.astro.mjs');
const _page10 = () => import('./pages/terminos-y-condiciones.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/capture-paypal-order.ts", _page1],
    ["src/pages/api/confirm-order.ts", _page2],
    ["src/pages/api/create-order.ts", _page3],
    ["src/pages/api/create-payment-intent.ts", _page4],
    ["src/pages/api/create-paypal-order.ts", _page5],
    ["src/pages/checkout.astro", _page6],
    ["src/pages/exito.astro", _page7],
    ["src/pages/pedido-confirmado.astro", _page8],
    ["src/pages/robots.txt.ts", _page9],
    ["src/pages/terminos-y-condiciones.astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "faf365f6-76c7-439d-8573-cb461311b7c2",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
