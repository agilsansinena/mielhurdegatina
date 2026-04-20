import { c as createComponent, r as renderComponent, m as maybeRenderHead, a as renderTemplate, b as createAstro, d as renderScript } from '../chunks/astro/server_DViZnYRy.mjs';
import 'piccolore';
import { $ as $$, a as $$Layout } from '../chunks/Layout_8Pw3pMsk.mjs';
import { $ as $$CheckCircle } from '../chunks/CheckCircle_DeAcTV3v.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("https://www.mielhurdegatina.com");
const $$Clock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Clock;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "clock", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M12 6v6l4 2"></path> <circle cx="12" cy="12" r="10"></circle> ` })}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/lucide-astro/dist/Clock.astro", void 0);

const $$Astro = createAstro("https://www.mielhurdegatina.com");
const $$XCircle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$XCircle;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "circle-x", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<circle cx="12" cy="12" r="10"></circle> <path d="m15 9-6 6"></path> <path d="m9 9 6 6"></path> ` })}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/lucide-astro/dist/XCircle.astro", void 0);

const $$PedidoConfirmado = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pedido Confirmado - Miel HurdeGatina" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-stone-50 flex items-center justify-center p-4"> <!-- Loading State --> <div id="loading-state" class="max-w-md w-full bg-white rounded-xl p-8 text-center shadow-lg border border-stone-200"> <div class="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse"> ${renderComponent($$result2, "Clock", $$Clock, { "class": "w-10 h-10 text-stone-400" })} </div> <h1 class="text-2xl font-bold text-stone-900 mb-4">Verificando pago...</h1> <p class="text-stone-600">Estamos confirmando tu pedido, un momento por favor.</p> </div> <!-- Success State (hidden by default) --> <div id="success-state" class="hidden max-w-md w-full bg-white rounded-xl p-8 text-center shadow-lg border border-stone-200"> <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"> ${renderComponent($$result2, "CheckCircle", $$CheckCircle, { "class": "w-10 h-10 text-green-600" })} </div> <h1 class="text-2xl font-bold text-stone-900 mb-4">¡Pedido Confirmado!</h1> <p class="text-stone-600 mb-8">
Hemos recibido tu pago correctamente. Recibirás un email de confirmación en breve.
</p> <div class="bg-stone-50 rounded-lg p-4 mb-6"> <p class="text-sm text-stone-500 mb-1">Número de pedido</p> <p class="text-lg font-mono font-bold text-stone-900" id="order-number">#---</p> </div> <div id="order-details" class="bg-brand-50 rounded-lg p-4 mb-6 text-left hidden"> <p class="text-sm font-medium text-brand-800 mb-2">Resumen:</p> <p id="order-total-display" class="text-sm text-brand-700"></p> </div> <a href="/" class="inline-block w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-lg transition-colors">
Volver a la tienda
</a> </div> <!-- Error State (hidden by default) --> <div id="error-state" class="hidden max-w-md w-full bg-white rounded-xl p-8 text-center shadow-lg border border-stone-200"> <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"> ${renderComponent($$result2, "XCircle", $$XCircle, { "class": "w-10 h-10 text-red-600" })} </div> <h1 class="text-2xl font-bold text-stone-900 mb-4">Error en el pago</h1> <p id="error-message" class="text-stone-600 mb-8">
Ha ocurrido un error al procesar tu pago. Por favor, inténtalo de nuevo.
</p> <a href="/checkout" class="inline-block w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-lg transition-colors">
Volver al checkout
</a> </div> </div> ` })} ${renderScript($$result, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/pages/pedido-confirmado.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/pages/pedido-confirmado.astro", void 0);

const $$file = "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/pages/pedido-confirmado.astro";
const $$url = "/pedido-confirmado";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$PedidoConfirmado,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
