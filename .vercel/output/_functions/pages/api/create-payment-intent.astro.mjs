import Stripe from 'stripe';
export { renderers } from '../../renderers.mjs';

const stripe = new Stripe("sk_test_TU_CLAVE_SECRETA_AQUI", {
  apiVersion: "2026-02-25.clover"
});
const SHIPPING_THRESHOLD = 60;
const SHIPPING_COST = 4.5;
const POST = async ({ request }) => {
  try {
    const { items, subtotal, shipping, total, customerData } = await request.json();
    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "No hay productos en el pedido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const serverSubtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const serverShipping = serverSubtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const serverTotal = serverSubtotal + serverShipping;
    if (Math.abs(serverTotal - total) > 0.02) {
      console.warn(
        `⚠️ Price mismatch: client=${total}, server=${serverTotal}`
      );
    }
    const amountInCents = Math.round(serverTotal * 100);
    if (amountInCents < 50) {
      return new Response(
        JSON.stringify({ error: "El importe mínimo es 0.50€" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true
      },
      metadata: {
        items: JSON.stringify(
          items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
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
          country: customerData?.country || "ES"
        })
      },
      receipt_email: customerData?.email || void 0,
      description: `Pedido Miel HurdeGatina - ${items.length} producto(s)`
    });
    console.log(
      `✅ PaymentIntent creado: ${paymentIntent.id} | Total: ${serverTotal.toFixed(2)}€`
    );
    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("❌ Error creando PaymentIntent:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Error al crear la sesión de pago"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
