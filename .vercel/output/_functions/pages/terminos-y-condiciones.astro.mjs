import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_C6WF4vph.mjs';
import 'piccolore';
import { a as $$Layout } from '../chunks/Layout_DjBdWMWK.mjs';
export { renderers } from '../renderers.mjs';

const $$TerminosYCondiciones = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "T\xE9rminos y Condiciones | Miel HurdeGatina" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="pt-32 pb-16 px-4 bg-stone-50 min-h-screen"> <div class="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100"> <h1 class="text-4xl font-display font-bold text-amber-900 mb-8">Términos y Condiciones</h1> <div class="prose prose-stone max-w-none text-stone-600"> <p>Bienvenido a Miel HurdeGatina. Al utilizar este sitio web, aceptas cumplir los siguientes términos y condiciones.</p> <h3 class="text-xl font-bold text-stone-800 mt-6 mb-2">1. Productos</h3> <p>Nuestra miel es un producto natural. Puede cristalizarse con el tiempo, lo cual es signo de pureza. Las imágenes son referenciales.</p> <h3 class="text-xl font-bold text-stone-800 mt-6 mb-2">2. Precios y Pagos</h3> <p>Todos los precios están en Euros (€) e incluyen impuestos aplicables. Nos reservamos el derecho de cambiar los precios en cualquier momento. El pago se realiza de forma segura a través de PayPal.</p> <h3 class="text-xl font-bold text-stone-800 mt-6 mb-2">3. Envíos</h3> <p>Realizamos envíos a la dirección proporcionada. Los tiempos de entrega son estimados y no garantizados.</p> <h3 class="text-xl font-bold text-stone-800 mt-6 mb-2">4. Propiedad Intelectual</h3> <p>Todo el contenido de este sitio (imágenes, textos, logos) es propiedad de Miel HurdeGatina.</p> </div> </div> </div> ` })}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/pages/terminos-y-condiciones.astro", void 0);

const $$file = "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/pages/terminos-y-condiciones.astro";
const $$url = "/terminos-y-condiciones";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$TerminosYCondiciones,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
