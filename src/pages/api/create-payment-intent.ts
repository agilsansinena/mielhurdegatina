import type { APIRoute } from "astro";
import Stripe from "stripe";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-02-25.clover",
});

const SHIPPING_THRESHOLD = 60;
const SHIPPING_COST = 4.50;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { items, subtotal, shipping, total, customerData } = await request.json();

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "No hay productos en el pedido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Recalculate total on server for security
    const serverSubtotal = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    );
    const serverShipping =
      serverSubtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const serverTotal = serverSubtotal + serverShipping;

    // Check for price mismatch (allow small floating point tolerance)
    if (Math.abs(serverTotal - total) > 0.02) {
      console.warn(
        `⚠️ Price mismatch: client=${total}, server=${serverTotal}`,
      );
    }

    // Use server-calculated total for security
    const amountInCents = Math.round(serverTotal * 100);

    if (amountInCents < 50) {
      return new Response(
        JSON.stringify({ error: "El importe mínimo es 0.50€" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "eur",
      payment_method_types: ["card", "cpmt_1TOM1dGgqZV3ZRSvQv9Ez0DY"],
      metadata: {
        items: JSON.stringify(
          items.map((item: any) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        ),
        subtotal: serverSubtotal.toFixed(2),
        shipping: serverShipping.toFixed(2),
        customerEmail: customerData?.email || "",
        customerPhone: customerData?.phone || "",
        customerName: `${customerData?.firstName || ""} ${customerData?.lastName || ""}`.trim(),
        shippingAddress: JSON.stringify({
          address: customerData?.address || "",
          city: customerData?.city || "",
          postalCode: customerData?.postalCode || "",
          province: customerData?.province || "",
          country: customerData?.country || "ES",
        }),
      },
      receipt_email: customerData?.email || undefined,
      description: `Pedido Miel HurdeGatina - ${items.length} producto(s)`,
    });

    console.log(
      `✅ PaymentIntent creado: ${paymentIntent.id} | Total: ${serverTotal.toFixed(2)}€`,
    );

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error: any) {
    console.error("❌ Error creando PaymentIntent:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Error al crear la sesión de pago",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
