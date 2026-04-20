import {
  c as createComponent,
  r as renderComponent,
  m as maybeRenderHead,
  a as renderTemplate,
  b as createAstro,
  d as renderScript,
  e as defineScriptVars,
} from "../chunks/astro/server_DViZnYRy.mjs";
import "piccolore";
import {
  $ as $$,
  a as $$Layout,
  b as $$Lock,
} from "../chunks/Layout_8Pw3pMsk.mjs";
import { $ as $$ArrowLeft } from "../chunks/ArrowLeft_CGlpDv2c.mjs";
import {
  $ as $$MapPin,
  a as $$ShieldCheck,
} from "../chunks/ShieldCheck_D_Xxhn1n.mjs";
export { renderers } from "../renderers.mjs";

const $$Astro$2 = createAstro("https://www.mielhurdegatina.com");
const $$ChevronRight = createComponent(
  ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
    Astro2.self = $$ChevronRight;
    return renderTemplate`${renderComponent($$result, "Layout", $$, { iconName: "chevron-right", ...Astro2.props }, { default: ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="m9 18 6-6-6-6"></path> ` })}`;
  },
  "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/lucide-astro/dist/ChevronRight.astro",
  void 0,
);

const $$Astro$1 = createAstro("https://www.mielhurdegatina.com");
const $$CreditCard = createComponent(
  ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
    Astro2.self = $$CreditCard;
    return renderTemplate`${renderComponent($$result, "Layout", $$, { iconName: "credit-card", ...Astro2.props }, { default: ($$result2) => renderTemplate` ${maybeRenderHead()}<rect width="20" height="14" x="2" y="5" rx="2"></rect> <line x1="2" x2="22" y1="10" y2="10"></line> ` })}`;
  },
  "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/lucide-astro/dist/CreditCard.astro",
  void 0,
);

const $$Astro = createAstro("https://www.mielhurdegatina.com");
const $$Truck = createComponent(
  ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
    Astro2.self = $$Truck;
    return renderTemplate`${renderComponent($$result, "Layout", $$, { iconName: "truck", ...Astro2.props }, { default: ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path> <path d="M15 18H9"></path> <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path> <circle cx="17" cy="18" r="2"></circle> <circle cx="7" cy="18" r="2"></circle> ` })}`;
  },
  "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/lucide-astro/dist/Truck.astro",
  void 0,
);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) =>
  __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Checkout = createComponent(
  async ($$result, $$props, $$slots) => {
    const STRIPE_PUBLIC_KEY = "pk_test_TU_CLAVE_PUBLICA_AQUI";
    return renderTemplate(
      _a ||
        (_a = __template([
          "",
          " <!-- Stripe.js --> <script>\n  if (!document.getElementById('stripe-js')) {\n    const script = document.createElement('script');\n    script.id = 'stripe-js';\n    script.src = 'https://js.stripe.com/v3/';\n    script.async = true;\n    document.head.appendChild(script);\n  }\n</script> <script>(function(){",
          "\n  window.__STRIPE_PUBLIC_KEY__ = STRIPE_PUBLIC_KEY;\n})();</script> ",
          "",
        ])),
      renderComponent(
        $$result,
        "Layout",
        $$Layout,
        { title: "Finalizar Pedido - Miel HurdeGatina" },
        {
          default: async (
            $$result2,
          ) => renderTemplate` ${maybeRenderHead()}<div class="bg-stone-50 min-h-screen py-6"> <div class="max-w-7xl mx-auto px-4"> <!-- Breadcrumb --> <a href="/" class="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-brand-600 mb-6"> ${renderComponent($$result2, "ArrowLeft", $$ArrowLeft, { class: "w-4 h-4" })}
Continuar comprando
</a> <!-- Step Indicator --> <div class="flex items-center justify-center gap-2 mb-8"> <div id="step-1-indicator" class="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white text-sm font-medium transition-all duration-300"> ${renderComponent($$result2, "MapPin", $$MapPin, { class: "w-4 h-4" })} <span>1. Dirección</span> </div> ${renderComponent($$result2, "ChevronRight", $$ChevronRight, { class: "w-5 h-5 text-stone-300" })} <div id="step-2-indicator" class="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-200 text-stone-500 text-sm font-medium transition-all duration-300"> ${renderComponent($$result2, "CreditCard", $$CreditCard, { class: "w-4 h-4" })} <span>2. Pago</span> </div> </div> <!-- Main Grid --> <div class="grid lg:grid-cols-3 gap-6"> <!-- Left: Forms (2 columns) --> <div class="lg:col-span-2 space-y-4"> <!-- STEP 1: Shipping & Contact --> <div id="step-1" class="space-y-4"> <form id="shipping-form" class="space-y-4" novalidate> <!-- Contact --> <div class="bg-white rounded-lg p-5 border border-stone-200"> <h2 class="font-bold text-stone-900 mb-3 text-base flex items-center gap-2"> <span class="w-6 h-6 bg-brand-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
Datos de Contacto
</h2> <div class="grid sm:grid-cols-2 gap-3"> <div> <input type="email" name="email" placeholder="Email *" required class="checkout-input px-3 py-2.5 border border-stone-300 rounded text-sm w-full focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"> <p class="field-error text-xs text-red-500 mt-1 hidden"></p> </div> <div> <input type="tel" name="phone" placeholder="Teléfono *" required class="checkout-input px-3 py-2.5 border border-stone-300 rounded text-sm w-full focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"> <p class="field-error text-xs text-red-500 mt-1 hidden"></p> </div> </div> </div> <!-- Shipping Address --> <div class="bg-white rounded-lg p-5 border border-stone-200"> <h2 class="font-bold text-stone-900 mb-3 text-base flex items-center gap-2"> <span class="w-6 h-6 bg-brand-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
Dirección de Envío
</h2> <div class="space-y-3"> <div class="grid sm:grid-cols-2 gap-3"> <div> <input type="text" name="firstName" placeholder="Nombre *" required class="checkout-input px-3 py-2.5 border border-stone-300 rounded text-sm w-full focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"> <p class="field-error text-xs text-red-500 mt-1 hidden"></p> </div> <div> <input type="text" name="lastName" placeholder="Apellidos *" required class="checkout-input px-3 py-2.5 border border-stone-300 rounded text-sm w-full focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"> <p class="field-error text-xs text-red-500 mt-1 hidden"></p> </div> </div> <div> <input type="text" name="address" placeholder="Dirección completa *" required class="checkout-input px-3 py-2.5 border border-stone-300 rounded text-sm w-full focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"> <p class="field-error text-xs text-red-500 mt-1 hidden"></p> </div> <div class="grid grid-cols-3 gap-3"> <div> <input type="text" name="postalCode" placeholder="CP *" required class="checkout-input px-3 py-2.5 border border-stone-300 rounded text-sm w-full focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"> <p class="field-error text-xs text-red-500 mt-1 hidden"></p> </div> <div class="col-span-2"> <input type="text" name="city" placeholder="Ciudad *" required class="checkout-input px-3 py-2.5 border border-stone-300 rounded text-sm w-full focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"> <p class="field-error text-xs text-red-500 mt-1 hidden"></p> </div> </div> <div> <input type="text" name="province" placeholder="Provincia *" required class="checkout-input px-3 py-2.5 border border-stone-300 rounded text-sm w-full focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"> <p class="field-error text-xs text-red-500 mt-1 hidden"></p> </div> <select name="country" class="px-3 py-2.5 border border-stone-300 rounded text-sm w-full focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"> <option value="ES">España</option> <option value="PT">Portugal</option> </select> </div> </div> <!-- Billing checkbox --> <div class="bg-white rounded-lg p-5 border border-stone-200"> <label class="flex items-center gap-3 cursor-pointer"> <input type="checkbox" id="same-billing" name="sameBilling" checked class="w-4 h-4 rounded border-stone-300 text-brand-500 focus:ring-brand-500"> <span class="text-sm text-stone-700">La dirección de facturación es la misma que la de envío</span> </label> <!-- Billing Address (hidden by default) --> <div id="billing-fields" class="hidden mt-4 space-y-3 pt-4 border-t border-stone-200"> <h3 class="font-medium text-stone-900 text-sm mb-2">Dirección de Facturación</h3> <div class="grid sm:grid-cols-2 gap-3"> <input type="text" name="billingFirstName" placeholder="Nombre *" class="checkout-input px-3 py-2.5 border border-stone-300 rounded text-sm w-full focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"> <input type="text" name="billingLastName" placeholder="Apellidos *" class="checkout-input px-3 py-2.5 border border-stone-300 rounded text-sm w-full focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"> </div> <input type="text" name="billingAddress" placeholder="Dirección completa *" class="checkout-input px-3 py-2.5 border border-stone-300 rounded text-sm w-full focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"> <div class="grid grid-cols-3 gap-3"> <input type="text" name="billingPostalCode" placeholder="CP *" class="checkout-input px-3 py-2.5 border border-stone-300 rounded text-sm w-full focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"> <input type="text" name="billingCity" placeholder="Ciudad *" class="col-span-2 checkout-input px-3 py-2.5 border border-stone-300 rounded text-sm w-full focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"> </div> <select name="billingCountry" class="px-3 py-2.5 border border-stone-300 rounded text-sm w-full focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-colors"> <option value="ES">España</option> <option value="PT">Portugal</option> </select> </div> </div> <!-- Continue to Payment Button --> <button type="submit" id="continue-to-payment-btn" class="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 text-base">
Continuar al Pago
${renderComponent($$result2, "ChevronRight", $$ChevronRight, { class: "w-5 h-5" })} </button> </form> </div> <!-- STEP 2: Payment --> <div id="step-2" class="hidden space-y-4"> <!-- Address Summary --> <div class="bg-white rounded-lg p-5 border border-stone-200"> <div class="flex items-center justify-between mb-3"> <h2 class="font-bold text-stone-900 text-base flex items-center gap-2"> ${renderComponent($$result2, "MapPin", $$MapPin, { class: "w-4 h-4 text-green-600" })}
Dirección de Envío
</h2> <button id="edit-address-btn" type="button" class="text-sm text-brand-600 hover:text-brand-700 font-medium hover:underline">
Editar
</button> </div> <p id="address-summary" class="text-sm text-stone-600"></p> </div> <!-- Payment Section --> <div class="bg-white rounded-lg p-5 border border-stone-200"> <h2 class="font-bold text-stone-900 mb-4 text-base flex items-center gap-2"> <span class="w-6 h-6 bg-brand-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
Método de Pago
</h2> <div class="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100"> ${renderComponent($$result2, "CreditCard", $$CreditCard, { class: "w-5 h-5 text-stone-500" })} <span class="text-sm font-medium text-stone-700">Tarjeta de Crédito o Débito</span> <div class="ml-auto flex gap-1"> <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" class="h-5" alt="Visa"> <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" class="h-5" alt="Mastercard"> </div> </div> <!-- Stripe Elements Container --> <div id="stripe-payment-element" class="min-h-[100px] mb-4"> <div class="flex items-center justify-center py-8 text-stone-400"> <svg class="animate-spin w-5 h-5 mr-2" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
Cargando formulario de pago...
</div> </div> <!-- Error Message --> <div id="stripe-error" class="hidden bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700"></div> <!-- Pay Button --> <button type="button" id="pay-button" disabled class="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base"> <span id="pay-button-text">PAGAR</span> <span id="pay-button-spinner" class="hidden inline-flex items-center gap-2"> <svg class="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
Procesando pago...
</span> </button> </div> <!-- Back button --> <button type="button" id="back-to-shipping-btn" class="w-full text-stone-600 hover:text-stone-800 font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"> ${renderComponent($$result2, "ArrowLeft", $$ArrowLeft, { class: "w-4 h-4" })}
Volver a dirección
</button> </div> </div> <!-- Right: Summary --> <div class="lg:col-span-1"> <div class="bg-white rounded-lg p-5 border border-stone-200 sticky top-6"> <h2 class="font-bold text-stone-900 mb-4 text-lg">Resumen del Pedido</h2> <!-- Items --> <div id="cart-summary" class="space-y-3 mb-4 pb-4 border-b border-stone-200 max-h-48 overflow-y-auto"> <!-- JS --> </div> <!-- Subtotal --> <div class="flex justify-between text-sm mb-2"> <span class="text-stone-600">Subtotal</span> <span id="subtotal-amount" class="font-medium text-stone-900">0.00€</span> </div> <!-- Shipping --> <div class="flex justify-between text-sm mb-2"> <span class="text-stone-600 flex items-center gap-1"> ${renderComponent($$result2, "Truck", $$Truck, { class: "w-4 h-4" })}
Envío
</span> <span id="shipping-amount" class="font-medium text-stone-600">4.50€</span> </div> <!-- Free shipping hint --> <div id="checkout-free-shipping-hint" class="hidden text-xs text-green-600 text-right mb-2"></div> <div class="border-t border-stone-200 pt-3 mb-4"></div> <!-- Total --> <div class="flex justify-between items-baseline mb-6"> <span class="text-lg font-bold text-stone-900">Total</span> <span id="total-amount" class="text-2xl font-bold text-stone-900">0.00€</span> </div> <!-- Security --> <div class="flex items-center justify-center gap-2 text-xs text-stone-500 mb-3"> ${renderComponent($$result2, "ShieldCheck", $$ShieldCheck, { class: "w-4 h-4 text-green-600" })} <span>Pago 100% seguro con Stripe</span> </div> <!-- Payment logos --> <div class="flex justify-center gap-3 opacity-60 grayscale"> <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" class="h-5" alt="Visa"> <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" class="h-5" alt="Mastercard"> ${renderComponent($$result2, "Lock", $$Lock, { class: "w-5 h-5 text-stone-400" })} </div> </div> </div> </div> </div> </div> `,
        },
      ),
      defineScriptVars({ STRIPE_PUBLIC_KEY }),
      renderScript(
        $$result,
        "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/pages/checkout.astro?astro&type=script&index=0&lang.ts",
      ),
    );
  },
  "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/pages/checkout.astro",
  void 0,
);
const $$file =
  "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/src/pages/checkout.astro";
const $$url = "/checkout";

const _page = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: $$Checkout,
      file: $$file,
      url: $$url,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);

const page = () => _page;

export { page };
