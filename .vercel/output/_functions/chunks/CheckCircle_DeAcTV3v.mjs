import { c as createComponent, r as renderComponent, m as maybeRenderHead, a as renderTemplate, b as createAstro } from './astro/server_DViZnYRy.mjs';
import 'piccolore';
import { $ as $$ } from './Layout_8Pw3pMsk.mjs';

const $$Astro = createAstro("https://www.mielhurdegatina.com");
const $$CheckCircle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CheckCircle;
  return renderTemplate`${renderComponent($$result, "Layout", $$, { "iconName": "circle-check-big", ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M21.801 10A10 10 0 1 1 17 3.335"></path> <path d="m9 11 3 3L22 4"></path> ` })}`;
}, "C:/Users/Alvaro/Desktop/programacion/mielhurdegatina/node_modules/lucide-astro/dist/CheckCircle.astro", void 0);

export { $$CheckCircle as $ };
