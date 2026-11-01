import type { APIRoute } from "astro";
import { products } from "../data/products";
import { site, shipping } from "../data/site";

export const prerender = true;

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/**
 * Feed RSS 2.0 con el formato de Google Merchant Center.
 * Se puede dar de alta en Merchant Center como feed programado:
 * https://www.mielhurdegatina.com/feed.xml
 */
export const GET: APIRoute = ({ site: astroSite }) => {
  const origin = (astroSite ?? new URL(site.url)).origin;
  const currency = "EUR";

  const items = products
    .map((product) => {
      const url = `${origin}/productos/${product.id}`;
      const image = `${origin}/og/${product.id}.jpg`;

      return `    <item>
      <g:id>${escapeXml(product.sku)}</g:id>
      <g:title>${escapeXml(product.title)}</g:title>
      <g:description>${escapeXml(product.description)}</g:description>
      <g:link>${url}</g:link>
      <g:image_link>${image}</g:image_link>
      <g:additional_image_link>${origin}/og-image.jpg</g:additional_image_link>
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:price>${product.price.toFixed(2)} ${currency}</g:price>
      <g:brand>${escapeXml(site.name)}</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:shipping_weight>${product.weight}</g:shipping_weight>
      <g:shipping>
        <g:country>ES</g:country>
        <g:service>Envío estándar</g:service>
        <g:price>${shipping.cost.toFixed(2)} ${currency}</g:price>
      </g:shipping>
      <g:min_handling_time>1</g:min_handling_time>
      <g:max_handling_time>2</g:max_handling_time>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(site.name)} - Productos</title>
    <link>${origin}</link>
    <description>${escapeXml(site.description)}</description>
    <language>es-ES</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
