import type { APIRoute } from "astro";
import { notifyOrder } from "../../lib/order-emails";
import { requireStripe } from "../../lib/stripe";

/**
 * Webhook de Stripe: la vía fiable para registrar el pedido.
 * Si el cliente cierra la pestaña después de pagar, Stripe llama aquí igualmente.
 * Requiere STRIPE_WEBHOOK_SECRET y el endpoint /api/stripe-webhook dado de alta
 * en el panel de Stripe (evento: payment_intent.succeeded).
 */
export const POST: APIRoute = async ({ request }) => {
  const signature = request.headers.get("stripe-signature");
  const secret = import.meta.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET no configurada: webhook rechazado");
    return new Response("Webhook no configurado", { status: 500 });
  }
  if (!signature) {
    return new Response("Falta la firma de Stripe", { status: 400 });
  }

  const body = await request.text();

  let event;
  try {
    event = await requireStripe().webhooks.constructEventAsync(body, signature, secret);
  } catch (error: any) {
    console.error("Firma de webhook no válida:", error?.message);
    return new Response("Firma no válida", { status: 400 });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const { order, alreadyNotified } = await notifyOrder(event.data.object);
        console.log(
          `📦 Webhook: pedido ${order.orderId} (${order.total.toFixed(2)}€) ${alreadyNotified ? "ya notificado" : "notificado"}`,
        );
        break;
      }
      case "payment_intent.payment_failed": {
        console.warn(`❌ Pago fallido: ${event.data.object.id}`);
        break;
      }
      default:
        break;
    }
  } catch (error: any) {
    // Devolver 500 hace que Stripe reintente el evento.
    console.error("Error procesando el webhook:", error);
    return new Response("Error procesando el evento", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
