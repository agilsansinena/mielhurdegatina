import type { APIRoute } from "astro";
import { products } from "../../data/products";
import { shipping } from "../../data/site";
import { requireStripe } from "../../lib/stripe";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/** Dominios desde los que se acepta crear un pago. */
const ALLOWED_HOSTS = new Set([
  "mielhurdegatina.com",
  "www.mielhurdegatina.com",
  "localhost",
  "127.0.0.1",
]);

function requestHostname(request: Request): string {
  const origin = request.headers.get("origin") ?? request.headers.get("referer") ?? "";
  if (!origin) return "";
  try {
    return new URL(origin).hostname;
  } catch {
    return "";
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { items, subtotal, shipping: clientShipping, total, customerData } =
      await request.json();

    // Comprobación de origen exacta (no "includes", que admitiría dominios falsos).
    const hostname = requestHostname(request);
    if (import.meta.env.PROD && hostname && !ALLOWED_HOSTS.has(hostname)) {
      return json({ error: "Origen no autorizado" }, 403);
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return json({ error: "No hay productos en el pedido" }, 400);
    }

    // El importe SIEMPRE se recalcula en el servidor con los precios del catálogo.
    let serverSubtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      if (!item?.id || typeof item.quantity !== "number" || item.quantity < 1 || item.quantity > 50) {
        return json({ error: "Datos de producto inválidos" }, 400);
      }

      const product = products.find((p) => p.id === item.id);
      if (!product) {
        return json({ error: `Producto no encontrado: ${item.id}` }, 400);
      }

      serverSubtotal += product.price * item.quantity;
      validatedItems.push({
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: item.quantity,
      });
    }

    const serverShipping = serverSubtotal >= shipping.threshold ? 0 : shipping.cost;
    const serverTotal = serverSubtotal + serverShipping;
    const amountInCents = Math.round(serverTotal * 100);

    if (amountInCents < 50) {
      return json({ error: "El importe mínimo es 0,50€" }, 400);
    }

    if (
      typeof total === "number" &&
      Math.abs(serverTotal - total) > 0.02
    ) {
      console.warn(
        `⚠️ Diferencia de importe: cliente=${total}€, servidor=${serverTotal}€ (se cobra el del servidor)`,
      );
    }

    const stripe = requireStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        items: JSON.stringify(validatedItems),
        subtotal: serverSubtotal.toFixed(2),
        shipping: serverShipping.toFixed(2),
        customerEmail: customerData?.email || "",
        customerPhone: customerData?.phone || "",
        customerName: `${customerData?.firstName || ""} ${customerData?.lastName || ""}`.trim(),
        shippingAddress: JSON.stringify({
          line1: customerData?.address || "",
          city: customerData?.city || "",
          postalCode: customerData?.postalCode || "",
          province: customerData?.province || "",
          country: customerData?.country || "ES",
        }),
      },
      receipt_email: customerData?.email || undefined,
      description: `Pedido ${products.length ? "Miel HurdeGatina" : ""} - ${validatedItems.length} producto(s)`,
    });

    console.log(
      `✅ PaymentIntent creado: ${paymentIntent.id} | Total: ${serverTotal.toFixed(2)}€`,
    );

    return json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: serverTotal,
    });
  } catch (error: any) {
    console.error("❌ Error creando PaymentIntent:", error);
    return json(
      { error: error?.message || "Error al crear la sesión de pago" },
      500,
    );
  }
};
