import Stripe from "stripe";

const secretKey = import.meta.env.STRIPE_SECRET_KEY || "";

/**
 * Cliente de Stripe compartido.
 * No se instancia si falta la clave: así un despliegue mal configurado
 * devuelve un error JSON claro en vez de romper el módulo entero.
 */
export const stripe: Stripe | null = secretKey
  ? new Stripe(secretKey, { apiVersion: "2026-02-25.clover" })
  : null;

export function requireStripe(): Stripe {
  if (!stripe) {
    throw new Error("STRIPE_SECRET_KEY no está configurada en el servidor");
  }
  return stripe;
}

export const hasStripeWebhookSecret = Boolean(import.meta.env.STRIPE_WEBHOOK_SECRET);
