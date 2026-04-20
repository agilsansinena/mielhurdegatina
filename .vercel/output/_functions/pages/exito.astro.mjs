import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DViZnYRy.mjs';
import 'piccolore';
import { a as $$Layout } from '../chunks/Layout_8Pw3pMsk.mjs';
import { $ as $$CheckCircle } from '../chunks/CheckCircle_DeAcTV3v.mjs';
import { $ as $$ArrowLeft } from '../chunks/ArrowLeft_CGlpDv2c.mjs';
export { renderers } from '../renderers.mjs';

const $$Exito = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pago Exitoso | Miel HurdeGatina" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen pt-32 pb-16 px-4 bg-stone-50 flex items-center justify-center"> <div class="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center border border-stone-100"> <div class="flex justify-center mb-6"> ${renderComponent($$result2, "CheckCircle", $$CheckCircle, { "class": "w-20 h-20 text-green-500 animate-bounce" })} </div> <h1 class="text-3xl font-display font-bold text-amber-900 mb-4">¡Gracias por tu pedido!</h1> <p class="text-stone-600 mb-8">
El pago se ha procesado correctamente. Hemos recibido tu pedido y nos pondremos en contacto contigo pronto.
</p> <a href="/" class="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors font-medium"> ${renderComponent($$result2, "ArrowLeft", $$ArrowLeft, { "class": "w-5 h-5" })}
Volver a la tienda
</a> </div> </div> ` })}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/pages/exito.astro", void 0);

const $$file = "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/pages/exito.astro";
const $$url = "/exito";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Exito,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
