import type { APIRoute } from "astro";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-02-25.clover",
});

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY || "";
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { paymentIntentId } = await request.json();

    if (!paymentIntentId) {
      return new Response(
        JSON.stringify({ error: "No se proporcionó el ID del pago" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Retrieve the PaymentIntent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return new Response(
        JSON.stringify({
          error: `El pago no se ha completado. Estado: ${paymentIntent.status}`,
          success: false,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Extract order data from metadata
    const metadata = paymentIntent.metadata;
    const items = JSON.parse(metadata.items || "[]");
    const subtotal = parseFloat(metadata.subtotal || "0");
    const shipping = parseFloat(metadata.shipping || "0");
    const total = paymentIntent.amount / 100;
    const customerEmail =
      metadata.customerEmail || paymentIntent.receipt_email || "";
    const customerPhone = metadata.customerPhone || "";
    const customerName = metadata.customerName || "";
    const shippingAddress = JSON.parse(metadata.shippingAddress || "{}");

    // Generate order ID
    const orderId =
      "ORD-" +
      Date.now() +
      "-" +
      Math.random().toString(36).substr(2, 6).toUpperCase();

    const order = {
      id: orderId,
      paymentIntentId,
      customerName,
      email: customerEmail,
      phone: customerPhone,
      items,
      subtotal,
      shipping,
      total,
      address: shippingAddress.address,
      city: shippingAddress.city,
      postalCode: shippingAddress.postalCode,
      province: shippingAddress.province,
      country: shippingAddress.country,
      status: "paid",
      createdAt: new Date().toISOString(),
    };

    console.log("📦 Pedido confirmado con Stripe:", orderId);
    console.log("💳 PaymentIntent:", paymentIntentId);
    console.log("💰 Total:", total.toFixed(2) + "€");

    // Send email to OWNER
    if (resend) {
      try {
        await resend.emails.send({
          from: "Miel HurdeGatina <pedidos@mielhurdegatina.com>",
          to: ["mrodriguezmartin1996@gmail.com"],
          subject: `🍯 Nuevo Pedido #${orderId} - ${total.toFixed(2)}€`,
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #ca8a04; border-bottom: 3px solid #eab308; padding-bottom: 10px;">
              Nuevo Pedido Recibido
            </h1>
            
            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
              <p style="margin: 0; color: #166534; font-weight: bold;">✅ Pago verificado con Stripe</p>
              <p style="margin: 5px 0 0 0; color: #166534; font-size: 12px;">PaymentIntent: ${paymentIntentId}</p>
            </div>

            <div style="background: #f5f5f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin: 0 0 10px 0;">📦 Pedido: ${orderId}</h2>
              <p style="margin: 5px 0; color: #666;">
                <strong>Fecha:</strong> ${new Date().toLocaleString("es-ES")}
              </p>
            </div>

            <h3 style="color: #1c1917; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px;">
              👤 Datos del Cliente
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0;"><strong>Nombre:</strong></td>
                <td>${customerName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Email:</strong></td>
                <td>${customerEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Teléfono:</strong></td>
                <td>${customerPhone}</td>
              </tr>
            </table>

            <h3 style="color: #1c1917; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px; margin-top: 25px;">
               Dirección de Envío
            </h3>
            <p style="background: #fef3c7; padding: 15px; border-left: 4px solid #eab308; border-radius: 4px; margin: 10px 0;">
              ${shippingAddress.address || ""}<br>
              ${shippingAddress.postalCode || ""} ${shippingAddress.city || ""} ${shippingAddress.province ? `(${shippingAddress.province})` : ""}<br>
              ${shippingAddress.country === "ES" ? "España" : shippingAddress.country === "PT" ? "Portugal" : shippingAddress.country || ""}
            </p>

            <h3 style="color: #1c1917; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px; margin-top: 25px;">
              Productos
            </h3>
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
              ${items
                .map(
                  (item: any) => `
                <tr style="border-bottom: 1px solid #e7e5e4;">
                  <td style="padding: 12px 0;">${item.quantity}x ${item.name}</td>
                  <td style="text-align: right; padding: 12px 0;"><strong>${(item.price * item.quantity).toFixed(2)}€</strong></td>
                </tr>
              `,
                )
                .join("")}
              <tr>
                <td style="padding: 8px 0;">Subtotal</td>
                <td style="text-align: right; padding: 8px 0;">${subtotal.toFixed(2)}€</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;">Envío</td>
                <td style="text-align: right; padding: 8px 0;">${shipping === 0 ? "GRATIS" : shipping.toFixed(2) + "€"}</td>
              </tr>
              <tr style="border-top: 2px solid #1c1917;">
                <td style="padding: 12px 0;"><strong>TOTAL</strong></td>
                <td style="text-align: right; padding: 12px 0; font-size: 20px; color: #ca8a04;"><strong>${total.toFixed(2)}€</strong></td>
              </tr>
            </table>

            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin-top: 30px; text-align: center;">
              <p style="margin: 0; color: #166534;">
                💳 <strong>Pagado con tarjeta vía Stripe</strong>
              </p>
            </div>
          </div>
        `,
        });
      } catch (emailError) {
        console.error("Error enviando email al dueño:", emailError);
      }
    } else {
      console.log("⚠️ RESEND_API_KEY no configurada, email al dueño omitido");
    }

    // Send confirmation email to CUSTOMER
    if (customerEmail && resend) {
      try {
        const firstName = customerName.split(" ")[0] || "Cliente";
        await resend.emails.send({
          from: "Miel HurdeGatina <pedidos@mielhurdegatina.com>",
          to: [customerEmail],
          subject: `✅ Pedido Confirmado #${orderId}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1 style="color: white; margin: 0;">¡Gracias por tu pedido!</h1>
              </div>
              
              <div style="padding: 30px; background: white; border: 1px solid #e7e5e4; border-top: none; border-radius: 0 0 8px 8px;">
                <p style="font-size: 16px; color: #1c1917;">Hola <strong>${firstName}</strong>,</p>
                
                <p style="color: #57534e;">
                  Hemos recibido tu pedido correctamente y lo estamos preparando con todo el cariño. 
                  Te enviaremos un email cuando esté en camino. 🍯
                </p>

                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
                  <p style="margin: 0; color: #78716c; font-size: 12px;">NÚMERO DE PEDIDO</p>
                  <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #1c1917; font-family: monospace;">
                    ${orderId}
                  </p>
                </div>

                <h3 style="color: #1c1917; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px;">
                  Resumen de tu pedido
                </h3>
                
                <table style="width: 100%; margin: 15px 0;">
                  ${items
                    .map(
                      (item: any) => `
                    <tr>
                      <td style="padding: 8px 0;">${item.quantity}x ${item.name}</td>
                      <td style="text-align: right; padding: 8px 0;">${(item.price * item.quantity).toFixed(2)}€</td>
                    </tr>
                  `,
                    )
                    .join("")}
                  <tr style="border-top: 1px solid #e7e5e4;">
                    <td style="padding: 8px 0;">Subtotal</td>
                    <td style="text-align: right;">${subtotal.toFixed(2)}€</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">Envío</td>
                    <td style="text-align: right;">${shipping === 0 ? "GRATIS" : shipping.toFixed(2) + "€"}</td>
                  </tr>
                  <tr style="border-top: 2px solid #1c1917;">
                    <td style="padding: 12px 0;"><strong>Total</strong></td>
                    <td style="text-align: right; font-size: 18px; color: #ca8a04;"><strong>${total.toFixed(2)}€</strong></td>
                  </tr>
                </table>

                <h3 style="color: #1c1917; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px; margin-top: 25px;">
                  Dirección de envío
                </h3>
                <p style="margin: 10px 0; color: #57534e;">
                  ${shippingAddress.address || ""}<br>
                  ${shippingAddress.postalCode || ""} ${shippingAddress.city || ""} ${shippingAddress.province ? `(${shippingAddress.province})` : ""}<br>
                  ${shippingAddress.country === "ES" ? "España" : shippingAddress.country === "PT" ? "Portugal" : shippingAddress.country || ""}
                </p>

                <div style="background: #f5f5f4; padding: 20px; border-radius: 8px; margin-top: 30px; text-align: center;">
                  <p style="margin: 0; color: #78716c; font-size: 14px;">
                    ¿Necesitas ayuda? Contáctanos en <a href="mailto:info@mielhurdegatina.com" style="color: #ca8a04;">info@mielhurdegatina.com</a>
                  </p>
                </div>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Error enviando email al cliente:", emailError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId,
        total: total.toFixed(2),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error: any) {
    console.error("❌ Error confirmando pedido:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Error al confirmar el pedido",
        success: false,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
