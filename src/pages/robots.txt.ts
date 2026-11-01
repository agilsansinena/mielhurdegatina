import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL("https://www.mielhurdegatina.com")).origin;

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /checkout
Disallow: /pedido-confirmado
Disallow: /api/

Sitemap: ${origin}/sitemap-index.xml`.trim();

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
