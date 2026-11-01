import { Resend } from "resend";
import type Stripe from "stripe";
import { site } from "../data/site";
import { stripe } from "./stripe";

const resend = import.meta.env.RESEND_API_KEY ? new Resend(import.meta.env.RESEND_API_KEY) : null;

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderSummary {
  orderId: string;
  paymentIntentId: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  customerName: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    city: string;
    postalCode: string;
    province: string;
    country: string;
  };
  createdAt: string;
}

/** Escapa texto introducido por el cliente antes de inyectarlo en HTML. */
const esc = (value: unknown): string =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] as string,
  );

const money = (value: number): string => `${value.toFixed(2)}€`;

const countryName = (code: string): string =>
  code === "ES" ? "España" : code === "PT" ? "Portugal" : esc(code);

function parseJSON<T>(raw: string | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * Construye el pedido a partir del PaymentIntent (y no de lo que envíe el navegador).
 * El número de pedido es determinista: recargar la página no genera uno nuevo.
 */
export function buildOrder(paymentIntent: Stripe.PaymentIntent): OrderSummary {
  const metadata = paymentIntent.metadata ?? {};
  const items = parseJSON<OrderItem[]>(metadata.items, []);
  const address = parseJSON<OrderSummary["address"]>(metadata.shippingAddress, {
    line1: "",
    city: "",
    postalCode: "",
    province: "",
    country: "ES",
  });

  const subtotal = Number(metadata.subtotal ?? 0) || 0;
  const shippingCost = Number(metadata.shipping ?? 0) || 0;

  return {
    orderId:
      "ORD-" +
      paymentIntent.id
        .replace(/^pi_/, "")
        .replace(/[^A-Za-z0-9]/g, "")
        .slice(-10)
        .toUpperCase(),
    paymentIntentId: paymentIntent.id,
    items,
    subtotal,
    shippingCost,
    total: paymentIntent.amount / 100,
    customerName: metadata.customerName || "",
    email: metadata.customerEmail || paymentIntent.receipt_email || "",
    phone: metadata.customerPhone || "",
    address,
    createdAt: new Date(paymentIntent.created * 1000).toISOString(),
  };
}

function ownerEmail(order: OrderSummary): string {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #ca8a04; border-bottom: 3px solid #eab308; padding-bottom: 10px;">Nuevo pedido recibido</h1>

    <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
      <p style="margin: 0; color: #166534; font-weight: bold;">✅ Pago verificado con Stripe</p>
      <p style="margin: 5px 0 0 0; color: #166534; font-size: 12px;">${esc(order.paymentIntentId)}</p>
    </div>

    <div style="background: #f5f5f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <h2 style="margin: 0 0 10px 0;">📦 Pedido: ${esc(order.orderId)}</h2>
      <p style="margin: 5px 0; color: #666;"><strong>Fecha:</strong> ${esc(new Date(order.createdAt).toLocaleString("es-ES"))}</p>
    </div>

    <h3 style="color: #1c1917; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px;">👤 Datos del cliente</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0;"><strong>Nombre:</strong></td><td>${esc(order.customerName)}</td></tr>
      <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td>${esc(order.email)}</td></tr>
      <tr><td style="padding: 8px 0;"><strong>Teléfono:</strong></td><td>${esc(order.phone)}</td></tr>
    </table>

    <h3 style="color: #1c1917; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px; margin-top: 25px;">Dirección de envío</h3>
    <p style="background: #fef3c7; padding: 15px; border-left: 4px solid #eab308; border-radius: 4px; margin: 10px 0;">
      ${esc(order.address.line1)}<br>
      ${esc(order.address.postalCode)} ${esc(order.address.city)} ${order.address.province ? `(${esc(order.address.province)})` : ""}<br>
      ${countryName(order.address.country)}
    </p>

    <h3 style="color: #1c1917; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px; margin-top: 25px;">Productos</h3>
    <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
      ${order.items
        .map(
          (item) => `
        <tr style="border-bottom: 1px solid #e7e5e4;">
          <td style="padding: 12px 0;">${esc(item.quantity)}x ${esc(item.name)}</td>
          <td style="text-align: right; padding: 12px 0;"><strong>${money(item.price * item.quantity)}</strong></td>
        </tr>`,
        )
        .join("")}
      <tr><td style="padding: 8px 0;">Subtotal</td><td style="text-align: right; padding: 8px 0;">${money(order.subtotal)}</td></tr>
      <tr><td style="padding: 8px 0;">Envío</td><td style="text-align: right; padding: 8px 0;">${order.shippingCost === 0 ? "GRATIS" : money(order.shippingCost)}</td></tr>
      <tr style="border-top: 2px solid #1c1917;">
        <td style="padding: 12px 0;"><strong>TOTAL</strong></td>
        <td style="text-align: right; padding: 12px 0; font-size: 20px; color: #ca8a04;"><strong>${money(order.total)}</strong></td>
      </tr>
    </table>

    <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin-top: 30px; text-align: center;">
      <p style="margin: 0; color: #166534;">💳 <strong>Pagado con tarjeta vía Stripe</strong></p>
    </div>
  </div>`;
}

function customerEmail(order: OrderSummary): string {
  const firstName = esc(order.customerName.split(" ")[0] || "Cliente");
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: white; margin: 0;">¡Gracias por tu pedido!</h1>
    </div>
    <div style="padding: 30px; background: white; border: 1px solid #e7e5e4; border-top: none; border-radius: 0 0 8px 8px;">
      <p style="font-size: 16px; color: #1c1917;">Hola <strong>${firstName}</strong>,</p>
      <p style="color: #57534e;">Hemos recibido tu pedido correctamente y lo estamos preparando con todo el cariño. Te avisaremos cuando esté en camino. 🍯</p>

      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <p style="margin: 0; color: #78716c; font-size: 12px;">NÚMERO DE PEDIDO</p>
        <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #1c1917; font-family: monospace;">${esc(order.orderId)}</p>
      </div>

      <h3 style="color: #1c1917; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px;">Resumen de tu pedido</h3>
      <table style="width: 100%; margin: 15px 0;">
        ${order.items
          .map(
            (item) => `
          <tr>
            <td style="padding: 8px 0;">${esc(item.quantity)}x ${esc(item.name)}</td>
            <td style="text-align: right; padding: 8px 0;">${money(item.price * item.quantity)}</td>
          </tr>`,
          )
          .join("")}
        <tr style="border-top: 1px solid #e7e5e4;"><td style="padding: 8px 0;">Subtotal</td><td style="text-align: right;">${money(order.subtotal)}</td></tr>
        <tr><td style="padding: 8px 0;">Envío</td><td style="text-align: right;">${order.shippingCost === 0 ? "GRATIS" : money(order.shippingCost)}</td></tr>
        <tr style="border-top: 2px solid #1c1917;">
          <td style="padding: 12px 0;"><strong>Total</strong></td>
          <td style="text-align: right; font-size: 18px; color: #ca8a04;"><strong>${money(order.total)}</strong></td>
        </tr>
      </table>

      <h3 style="color: #1c1917; border-bottom: 2px solid #e7e5e4; padding-bottom: 8px; margin-top: 25px;">Dirección de envío</h3>
      <p style="margin: 10px 0; color: #57534e;">
        ${esc(order.address.line1)}<br>
        ${esc(order.address.postalCode)} ${esc(order.address.city)} ${order.address.province ? `(${esc(order.address.province)})` : ""}<br>
        ${countryName(order.address.country)}
      </p>

      <div style="background: #f5f5f4; padding: 20px; border-radius: 8px; margin-top: 30px; text-align: center;">
        <p style="margin: 0; color: #78716c; font-size: 14px;">
          ¿Necesitas ayuda? Escríbenos a
          <a href="mailto:${esc(site.contactEmail)}" style="color: #ca8a04;">${esc(site.contactEmail)}</a>
        </p>
      </div>
    </div>
  </div>`;
}

/**
 * Envía los emails del pedido una sola vez.
 * Stripe guarda el número de pedido en los metadatos del PaymentIntent:
 * si ya está, no se vuelve a notificar (evita duplicados al recargar o
 * cuando el webhook y la página de confirmación llegan a la vez).
 */
export async function notifyOrder(paymentIntent: Stripe.PaymentIntent): Promise<{
  order: OrderSummary;
  alreadyNotified: boolean;
}> {
  const order = buildOrder(paymentIntent);

  if (paymentIntent.metadata?.orderId) {
    return { order: { ...order, orderId: paymentIntent.metadata.orderId }, alreadyNotified: true };
  }

  if (resend) {
    try {
      await resend.emails.send({
        from: `${site.name} <${site.orderFromEmail}>`,
        // Puede ser uno o varios buzones (ver src/data/site.ts)
        to: [...site.orderNotificationEmail],
        subject: `🍯 Nuevo pedido ${order.orderId} - ${money(order.total)}`,
        html: ownerEmail(order),
      });
    } catch (error) {
      console.error("Error enviando email al dueño:", error);
    }

    if (order.email) {
      try {
        await resend.emails.send({
          from: `${site.name} <${site.orderFromEmail}>`,
          to: [order.email],
          subject: `✅ Pedido confirmado ${order.orderId}`,
          html: customerEmail(order),
        });
      } catch (error) {
        console.error("Error enviando email al cliente:", error);
      }
    }
  } else {
    console.warn("RESEND_API_KEY no configurada: no se han enviado los emails del pedido", order.orderId);
  }

  // Marca el pedido como notificado para que no se dupliquen los emails.
  if (stripe) {
    try {
      await stripe.paymentIntents.update(paymentIntent.id, {
        metadata: {
          ...paymentIntent.metadata,
          orderId: order.orderId,
          orderNotifiedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("No se pudo marcar el pedido como notificado:", error);
    }
  }

  return { order, alreadyNotified: false };
}
