import type { APIRoute } from "astro";
import { notifyOrder } from "../../lib/order-emails";
import { requireStripe } from "../../lib/stripe";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/**
 * Confirma un pedido a partir del PaymentIntent.
 * El estado real lo manda Stripe, nunca la URL de vuelta del navegador.
 * Es idempotente: recargar la página no reenvía emails ni crea otro pedido.
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = (await request.json().catch(() => ({}))) as {
      paymentIntentId?: string;
    };
    const paymentIntentId = payload.paymentIntentId;

    if (!paymentIntentId || !/^pi_[A-Za-z0-9]+$/.test(paymentIntentId)) {
      return json({ success: false, error: "No se proporcionó un pago válido" }, 400);
    }

    const stripe = requireStripe();
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      const { order, alreadyNotified } = await notifyOrder(paymentIntent);
      console.log(`📦 Pedido ${order.orderId} confirmado (${order.total.toFixed(2)}€)`);
      return json({
        success: true,
        orderId: order.orderId,
        total: order.total.toFixed(2),
        status: paymentIntent.status,
        alreadyNotified,
      });
    }

    if (paymentIntent.status === "processing") {
      return json(
        {
          success: false,
          pending: true,
          status: paymentIntent.status,
          error:
            "El pago se está procesando. Te avisaremos por email en cuanto se confirme.",
        },
        202,
      );
    }

    return json(
      {
        success: false,
        status: paymentIntent.status,
        error: `El pago no se ha completado (estado: ${paymentIntent.status}).`,
      },
      400,
    );
  } catch (error: any) {
    console.error("❌ Error confirmando pedido:", error);
    return json(
      { success: false, error: error?.message || "Error al confirmar el pedido" },
      500,
    );
  }
};
