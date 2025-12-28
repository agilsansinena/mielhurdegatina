import { c as createComponent, a as createAstro, e as addAttribute, d as renderScript, b as renderTemplate, m as maybeRenderHead, s as spreadAttributes, n as renderSlot, r as renderComponent, o as renderHead } from './astro/server_C6WF4vph.mjs';
import 'piccolore';
/* empty css                         */
import 'clsx';

const $$Astro$8 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro$7 = createAstro();
const $$ = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$;
  const size = Astro2.props.size;
  const cls = Astro2.props.class;
  const name = Astro2.props.iconName;
  delete Astro2.props.size;
  delete Astro2.props.class;
  delete Astro2.props.iconName;
  const props = Object.assign({
    "xmlns": "http://www.w3.org/2000/svg",
    "stroke-width": 2,
    "width": size ?? 24,
    "height": size ?? 24,
    "stroke": "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "fill": "none",
    "viewBox": "0 0 24 24"
  }, Astro2.props);
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(["lucide", { [`lucide-${name}`]: name }, cls], "class:list")}> ${renderSlot($$result, $$slots["default"])} </svg>`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/lucide-astro/dist/.Layout.astro", void 0);

const $$Astro$6 = createAstro();
const $$Lock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Lock;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "lock", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect> <path d="M7 11V7a5 5 0 0 1 10 0v4"></path> ` })}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/lucide-astro/dist/Lock.astro", void 0);

const $$Astro$5 = createAstro();
const $$MessageCircle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$MessageCircle;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "message-circle", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path> ` })}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/lucide-astro/dist/MessageCircle.astro", void 0);

const $$Astro$4 = createAstro();
const $$ShoppingCart = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ShoppingCart;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "shopping-cart", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<circle cx="8" cy="21" r="1"></circle> <circle cx="19" cy="21" r="1"></circle> <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path> ` })}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/lucide-astro/dist/ShoppingCart.astro", void 0);

const $$Astro$3 = createAstro();
const $$X = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$X;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "x", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M18 6 6 18"></path> <path d="m6 6 12 12"></path> ` })}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/lucide-astro/dist/X.astro", void 0);

const $$Cart = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="cart-drawer" class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-stone-100 shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col font-sans" data-astro-cid-atha5qgx> <!-- Header --> <div class="p-6 border-b border-stone-100 flex items-center justify-between bg-white/50 backdrop-blur-md" data-astro-cid-atha5qgx> <h2 class="text-2xl font-bold text-amber-900 font-display flex items-center gap-2" data-astro-cid-atha5qgx> ${renderComponent($$result, "ShoppingCart", $$ShoppingCart, { "class": "w-6 h-6 text-amber-500", "data-astro-cid-atha5qgx": true })}
Tu Cesta
</h2> <button id="close-cart-btn" class="p-2 text-stone-400 hover:text-stone-600 transition-colors rounded-full hover:bg-stone-100" data-astro-cid-atha5qgx> ${renderComponent($$result, "X", $$X, { "class": "w-6 h-6", "data-astro-cid-atha5qgx": true })} </button> </div> <!-- Items Container --> <div id="cart-items-container" class="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar" data-astro-cid-atha5qgx> <div class="text-center text-stone-500 py-10" data-astro-cid-atha5qgx> <p data-astro-cid-atha5qgx>La cesta está vacía</p> </div> </div> <!-- Footer --> <div class="p-6 border-t border-stone-100 bg-stone-50/50 backdrop-blur-md" data-astro-cid-atha5qgx> <div class="flex justify-between items-center mb-6" data-astro-cid-atha5qgx> <span class="text-stone-600" data-astro-cid-atha5qgx>Total</span> <span id="cart-total" class="text-3xl font-bold text-amber-600" data-astro-cid-atha5qgx>0.00€</span> </div> <div id="paypal-button-container" class="mt-4 w-full z-0" data-astro-cid-atha5qgx></div> <p class="text-center text-stone-400 text-xs mt-4 flex items-center justify-center gap-1" data-astro-cid-atha5qgx> ${renderComponent($$result, "Lock", $$Lock, { "class": "w-3 h-3", "data-astro-cid-atha5qgx": true })}
Pago seguro con PayPal
</p> </div> </div> <!-- Backdrop --> <div id="cart-backdrop" class="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40 hidden opacity-0 transition-opacity duration-300" data-astro-cid-atha5qgx></div> ${renderScript($$result, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/components/Cart.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/components/Cart.astro", void 0);

const $$WhatsAppButton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="https://wa.me/34659393507" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group" aria-label="Contactar por WhatsApp"> <span class="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:hidden"></span> ${renderComponent($$result, "MessageCircle", $$MessageCircle, { "class": "w-8 h-8 relative z-10" })} </a>`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/components/WhatsAppButton.astro", void 0);

const $$CookieBanner = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="cookie-banner" class="fixed bottom-0 left-0 right-0 bg-stone-900 text-white p-4 md:p-6 z-50 transform translate-y-full transition-transform duration-500 shadow-2xl"> <div class="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4"> <div class="text-sm md:text-base text-stone-300 max-w-3xl"> <p>
Utilizamos cookies propias para mejorar tu experiencia de compra y recordar tu carrito. 
        Si continúas navegando, consideramos que aceptas su uso. 
        Puedes leer más en nuestra <a href="/politica-de-privacidad" class="text-amber-400 hover:text-amber-300 underline">Política de Privacidad</a>.
</p> </div> <div class="flex gap-4 min-w-max"> <button id="accept-cookies" class="bg-amber-500 hover:bg-amber-400 text-stone-900 px-6 py-2.5 rounded-full font-bold transition-colors text-sm md:text-base">
Aceptar y Cerrar
</button> </div> </div> </div> ${renderScript($$result, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/components/CookieBanner.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/components/CookieBanner.astro", void 0);

const $$Astro$2 = createAstro();
const $$Index$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$1;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/@vercel/analytics/dist/astro/index.astro", void 0);

const $$Astro$1 = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-speed-insights", "vercel-speed-insights", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/@vercel/speed-insights/dist/astro/index.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Miel HurdeGatina - Miel artesanal de Las Hurdes. Tradici\xF3n y sabor natural." } = Astro2.props;
  return renderTemplate`<html lang="es" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.avif"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image" content="/favicon.avif"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}><meta property="twitter:image" content="/favicon.avif"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">${renderComponent($$result, "ViewTransitions", $$ClientRouter, {})}${renderComponent($$result, "Analytics", $$Index$1, {})}${renderHead()}</head> <body class="min-h-screen flex flex-col"> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Cart", $$Cart, {})} ${renderComponent($$result, "WhatsAppButton", $$WhatsAppButton, {})} ${renderComponent($$result, "CookieBanner", $$CookieBanner, {})} ${renderComponent($$result, "SpeedInsights", $$Index, {})} </body></html>`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/layouts/Layout.astro", void 0);

export { $$ as $, $$Layout as a, $$ShoppingCart as b, $$X as c };
