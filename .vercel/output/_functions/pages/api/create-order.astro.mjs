import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const resend = new Resend(undefined                              );
const POST = async ({ request }) => {
  try {
    const orderData = await request.json();
    const orderId = "ORD-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const order = {
      id: orderId,
      ...orderData,
      status: "pending",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    console.log("📦 Nuevo pedido:", order);
    try {
      await resend.emails.send({
        from: "Miel HurdeGatina <pedidos@tudominio.com>",
        // Cambiar por tu dominio
        to: ["tu-email@gmail.com"],
        // TU EMAIL AQUÍ
        subject: `🍯 Nuevo Pedido #${orderId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #ca8a04; border-bottom: 3px solid #eab308; padding-bottom: 10px;">
              Nuevo Pedido Recibido
            </h1>
            
            <div style="background: #f5f5f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin: 0 0 10px 0;">📦 Pedido: ${orderId}</h2>
              <p style="margin: 5px 0; color: #666;">
                <strong>Fecha:</strong> ${new Date(order.createdAt).toLocaleString("es-ES")}
              </p>
            </div>

            <h3 style="color: #1c1917; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px;">
              👤 Datos del Cliente
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0;"><strong>Nombre:</strong></td>
                <td>${order.firstName} ${order.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Email:</strong></td>
                <td>${order.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Teléfono:</strong></td>
                <td>${order.phone}</td>
              </tr>
            </table>

            <h3 style="color: #1c1917; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px; margin-top: 25px;">
               Dirección de Envío
            </h3>
            <p style="background: #fef3c7; padding: 15px; border-left: 4px solid #eab308; border-radius: 4px; margin: 10px 0;">
              ${order.address}<br>
              ${order.postalCode} ${order.city}<br>
              ${order.country === "ES" ? "España" : order.country}
            </p>

            <h3 style="color: #1c1917; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px; margin-top: 25px;">
              Productos
            </h3>
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
              ${order.items.map(
          (item) => `
                <tr style="border-bottom: 1px solid #e7e5e4;">
                  <td style="padding: 12px 0;">${item.quantity}x ${item.name}</td>
                  <td style="text-align: right; padding: 12px 0;"><strong>${(item.price * item.quantity).toFixed(2)}€</strong></td>
                </tr>
              `
        ).join("")}
              <tr>
                <td style="padding: 8px 0;">Subtotal</td>
                <td style="text-align: right; padding: 8px 0;">${order.subtotal.toFixed(2)}€</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;">Envío</td>
                <td style="text-align: right; padding: 8px 0;">${order.shipping.toFixed(2)}€</td>
              </tr>
              <tr style="border-top: 2px solid #1c1917;">
                <td style="padding: 12px 0;"><strong>TOTAL</strong></td>
                <td style="text-align: right; padding: 12px 0; font-size: 20px; color: #ca8a04;"><strong>${order.total.toFixed(2)}€</strong></td>
              </tr>
            </table>

            <div style="background: #d4d4d8; padding: 15px; border-radius: 8px; margin-top: 30px; text-align: center;">
              <p style="margin: 0; color: #52525b;">
                💳 <strong>Método de Pago:</strong> ${order.paymentMethod === "card" ? "Tarjeta •••• " + order.cardLast4 : "PayPal"}
              </p>
            </div>
          </div>
        `
      });
    } catch (emailError) {
      console.error("Error enviando email:", emailError);
    }
    try {
      await resend.emails.send({
        from: "Miel HurdeGatina <pedidos@tudominio.com>",
        to: [order.email],
        subject: `✅ Pedido Confirmado #${orderId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0;">¡Gracias por tu pedido!</h1>
            </div>
            
            <div style="padding: 30px; background: white; border: 1px solid #e7e5e4; border-top: none; border-radius: 0 0 8px 8px;">
              <p style="font-size: 16px; color: #1c1917;">Hola <strong>${order.firstName}</strong>,</p>
              
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
                ${order.items.map(
          (item) => `
                  <tr>
                    <td style="padding: 8px 0;">${item.quantity}x ${item.name}</td>
                    <td style="text-align: right; padding: 8px 0;">${(item.price * item.quantity).toFixed(2)}€</td>
                  </tr>
                `
        ).join("")}
                <tr style="border-top: 1px solid #e7e5e4;">
                  <td style="padding: 8px 0;">Subtotal</td>
                  <td style="text-align: right;">${order.subtotal.toFixed(2)}€</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">Envío</td>
                  <td style="text-align: right;">${order.shipping.toFixed(2)}€</td>
                </tr>
                <tr style="border-top: 2px solid #1c1917;">
                  <td style="padding: 12px 0;"><strong>Total</strong></td>
                  <td style="text-align: right; font-size: 18px; color: #ca8a04;"><strong>${order.total.toFixed(2)}€</strong></td>
                </tr>
              </table>

              <h3 style="color: #1c1917; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px; margin-top: 25px;">
                Dirección de envío
              </h3>
              <p style="margin: 10px 0; color: #57534e;">
                ${order.address}<br>
                ${order.postalCode} ${order.city}<br>
                ${order.country === "ES" ? "España" : order.country}
              </p>

              <div style="background: #f5f5f4; padding: 20px; border-radius: 8px; margin-top: 30px; text-align: center;">
                <p style="margin: 0; color: #78716c; font-size: 14px;">
                  ¿Necesitas ayuda? Contáctanos en <a href="mailto:info@mielhurdegatina.com" style="color: #ca8a04;">info@mielhurdegatina.com</a>
                </p>
              </div>
            </div>
          </div>
        `
      });
    } catch (emailError) {
      console.error("Error enviando email al cliente:", emailError);
    }
    return new Response(JSON.stringify({ success: true, orderId }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error creando pedido:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
