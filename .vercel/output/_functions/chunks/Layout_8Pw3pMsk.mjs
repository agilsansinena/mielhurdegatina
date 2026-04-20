import { c as createComponent, m as maybeRenderHead, s as spreadAttributes, f as addAttribute, o as renderSlot, a as renderTemplate, b as createAstro, r as renderComponent, d as renderScript, p as renderHead } from './astro/server_DViZnYRy.mjs';
import 'piccolore';
/* empty css                            */
import 'clsx';

const $$Astro$7 = createAstro("https://www.mielhurdegatina.com");
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

const $$Astro$6 = createAstro("https://www.mielhurdegatina.com");
const $$Lock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Lock;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "lock", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect> <path d="M7 11V7a5 5 0 0 1 10 0v4"></path> ` })}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/lucide-astro/dist/Lock.astro", void 0);

const $$Astro$5 = createAstro("https://www.mielhurdegatina.com");
const $$MessageCircle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$MessageCircle;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "message-circle", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path> ` })}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/lucide-astro/dist/MessageCircle.astro", void 0);

const $$Astro$4 = createAstro("https://www.mielhurdegatina.com");
const $$ShoppingCart = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ShoppingCart;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "shopping-cart", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<circle cx="8" cy="21" r="1"></circle> <circle cx="19" cy="21" r="1"></circle> <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path> ` })}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/lucide-astro/dist/ShoppingCart.astro", void 0);

const $$Astro$3 = createAstro("https://www.mielhurdegatina.com");
const $$X = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$X;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "x", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M18 6 6 18"></path> <path d="m6 6 12 12"></path> ` })}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/lucide-astro/dist/X.astro", void 0);

const $$Cart = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="cart-drawer" class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-stone-100 shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col font-sans" data-astro-cid-atha5qgx> <!-- Header --> <div class="p-6 border-b border-stone-100 flex items-center justify-between bg-white/50 backdrop-blur-md" data-astro-cid-atha5qgx> <h2 class="text-2xl text-brand-900 !font-body flex items-center gap-2" data-astro-cid-atha5qgx> ${renderComponent($$result, "ShoppingCart", $$ShoppingCart, { "class": "w-6 h-6 text-brand-500", "data-astro-cid-atha5qgx": true })}
Tu Cesta
</h2> <button id="close-cart-btn" class="p-2 text-stone-400 hover:text-stone-600 transition-colors rounded-full hover:bg-stone-100" data-astro-cid-atha5qgx> ${renderComponent($$result, "X", $$X, { "class": "w-6 h-6", "data-astro-cid-atha5qgx": true })} </button> </div> <!-- Items Container --> <div id="cart-items-container" class="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar" data-astro-cid-atha5qgx> <div class="text-center text-stone-500 py-10" data-astro-cid-atha5qgx> <p data-astro-cid-atha5qgx>La cesta está vacía</p> </div> </div> <!-- Footer --> <div class="p-6 border-t border-stone-100 bg-stone-50/50 backdrop-blur-md" data-astro-cid-atha5qgx> <div class="space-y-2 mb-6 text-stone-600" data-astro-cid-atha5qgx> <div class="flex justify-between items-center text-sm" data-astro-cid-atha5qgx> <span data-astro-cid-atha5qgx>Subtotal</span> <span id="cart-subtotal" data-astro-cid-atha5qgx>0.00€</span> </div> <div class="flex justify-between items-center text-sm" data-astro-cid-atha5qgx> <span data-astro-cid-atha5qgx>Envío</span> <span id="cart-shipping" class="text-brand-600 font-medium" data-astro-cid-atha5qgx>4.50€</span> </div> <div id="free-shipping-hint" class="hidden text-xs text-green-600 text-right" data-astro-cid-atha5qgx>
¡Envío gratis a partir de 60€!
</div> <div class="flex justify-between items-center pt-2 border-t border-stone-200" data-astro-cid-atha5qgx> <span class="font-bold text-stone-800" data-astro-cid-atha5qgx>Total</span> <span id="cart-total" class="text-xl font-bold text-brand-600" data-astro-cid-atha5qgx>0.00€</span> </div> </div> <a href="/checkout" id="checkout-btn" class="block w-full bg-brand-600 text-white text-center font-bold py-3 rounded-lg hover:bg-brand-700 transition-colors mb-4 shadow-lg shadow-brand-200" data-astro-cid-atha5qgx>
Tramitar Pedido
</a> <p class="text-center text-stone-400 text-xs mt-2 flex items-center justify-center gap-1" data-astro-cid-atha5qgx> ${renderComponent($$result, "Lock", $$Lock, { "class": "w-3 h-3", "data-astro-cid-atha5qgx": true })}
Pago seguro garantizado
</p> </div> </div> <!-- Backdrop --> <div id="cart-backdrop" class="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40 hidden opacity-0 transition-opacity duration-300" data-astro-cid-atha5qgx></div> ${renderScript($$result, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/components/Cart.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/components/Cart.astro", void 0);

const $$WhatsAppButton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="https://wa.me/34659393507" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group" aria-label="Contactar por WhatsApp"> <span class="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:hidden"></span> ${renderComponent($$result, "MessageCircle", $$MessageCircle, { "class": "w-8 h-8 relative z-10" })} </a>`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/components/WhatsAppButton.astro", void 0);

const $$CookieBanner = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="cookie-banner" class="fixed bottom-0 left-0 right-0 bg-stone-900 text-white p-4 md:p-6 z-50 transform translate-y-full transition-transform duration-500 shadow-2xl"> <div class="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4"> <div class="text-sm md:text-base text-stone-300 max-w-3xl"> <p>
Utilizamos cookies propias para mejorar tu experiencia de compra y recordar tu carrito. 
        Si continúas navegando, consideramos que aceptas su uso. 
        Puedes leer más en nuestra <a href="/politica-de-privacidad" class="text-brand-400 hover:text-brand-300 underline">Política de Privacidad</a>.
</p> </div> <div class="flex gap-4 min-w-max"> <button id="accept-cookies" class="bg-brand-400 hover:bg-brand-300 text-brand-950 px-6 py-2.5 rounded-full font-bold transition-colors text-sm md:text-base">
Aceptar y Cerrar
</button> </div> </div> </div> ${renderScript($$result, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/components/CookieBanner.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/components/CookieBanner.astro", void 0);

const $$Astro$2 = createAstro("https://www.mielhurdegatina.com");
const $$Index$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$1;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/@vercel/analytics/dist/astro/index.astro", void 0);

const $$Astro$1 = createAstro("https://www.mielhurdegatina.com");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-speed-insights", "vercel-speed-insights", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/@vercel/speed-insights/dist/astro/index.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://www.mielhurdegatina.com");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Miel HurdeGatina - Miel artesanal de Las Hurdes. Tradici\xF3n y sabor natural." } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="description"', '><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.avif"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><meta name="generator"', '><link rel="canonical"', '><meta name="robots" content="index, follow"><meta name="theme-color" content="#facc15"><title>', '</title><!-- Open Graph / Facebook --><meta property="og:locale" content="es_ES"><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Miel HurdeGatina"><meta property="og:site_name" content="Miel HurdeGatina"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><script type="application/ld+json">\n			{\n			  "@context": "https://schema.org",\n			  "@type": "LocalBusiness",\n			  "name": "Miel HurdeGatina",\n			  "description": "Miel pura de abeja cosechada artesanalmente en Las Hurdes y Sierra de Gata. 100% natural.",\n			  "address": {\n				"@type": "PostalAddress",\n				"streetAddress": "Torrecilla de los \xC1ngeles",\n				"addressLocality": "Torrecilla de los \xC1ngeles",\n				"addressRegion": "C\xE1ceres",\n				"postalCode": "10869",\n				"addressCountry": "ES"\n			  },\n			  "geo": {\n					"@type": "GeoCoordinates",\n					"latitude": 40.2478918,\n					"longitude": -6.4163881\n				  },\n			  "url": "https://mielhurdegatina.com",\n			  "telephone": "+34659393507",\n			  "priceRange": "\u20AC",\n			  "areaServed": ["Sierra de Gata", "Las Hurdes", "Extremadura"]\n			}\n		<\/script><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">', "", "", '</head> <body class="min-h-screen flex flex-col"> ', " ", " ", " ", " </body></html>"])), addAttribute(description, "content"), addAttribute(Astro2.generator, "content"), addAttribute(new URL(Astro2.url.pathname, Astro2.site), "href"), title, addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL("/logo-rgb-A85MJZK7J2SBMK2k.avif", Astro2.site), "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL("/logo-rgb-A85MJZK7J2SBMK2k.avif", Astro2.site), "content"), renderComponent($$result, "Analytics", $$Index$1, {}), renderComponent($$result, "SpeedInsights", $$Index, {}), renderHead(), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Cart", $$Cart, {}), renderComponent($$result, "WhatsAppButton", $$WhatsAppButton, {}), renderComponent($$result, "CookieBanner", $$CookieBanner, {}));
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/layouts/Layout.astro", void 0);

export { $$ as $, $$Layout as a, $$Lock as b, $$ShoppingCart as c, $$X as d };
