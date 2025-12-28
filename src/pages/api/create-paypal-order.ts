export const prerender = false;

import { products } from "../../data/products";

const PAYPAL_CLIENT_ID =
  import.meta.env.PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET =
  import.meta.env.PAYPAL_CLIENT_SECRET || process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_MODE =
  import.meta.env.PAYPAL_MODE || process.env.PAYPAL_MODE || "sandbox";

const BASE_URL =
  PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function generateAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("MISSING_API_CREDENTIALS");
  }

  console.log("Attempting to generate access token...");
  const auth = Buffer.from(
    PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
  ).toString("base64");

  const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("PayPal Token Error:", response.status, errorText);
    throw new Error(
      `Failed to get access token: ${response.status} ${errorText}`
    );
  }

  const data = await response.json();
  console.log("Access token received successfully");
  return data.access_token;
}

export const POST = async ({ request }: { request: Request }) => {
  try {
    console.log("Processing PayPal order...");
    const { cartItems } = await request.json();

    if (!cartItems || cartItems.length === 0) {
      return new Response(JSON.stringify({ error: "Cart is empty" }), {
        status: 400,
      });
    }

    // Calculate total on server
    let total = 0;
    const items = cartItems.map((item: any) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        throw new Error(`Product not found: ${item.id}`);
      }
      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      return {
        name: product.title,
        unit_amount: {
          currency_code: "EUR",
          value: product.price.toFixed(2),
        },
        quantity: item.quantity,
      };
    });

    console.log(`Calculated total: ${total.toFixed(2)}, Fetching token...`);
    console.log(`Environment: ${PAYPAL_MODE} (${BASE_URL})`);
    const accessToken = await generateAccessToken();
    const url = `${BASE_URL}/v2/checkout/orders`;

    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "EUR",
                value: total.toFixed(2),
              },
            },
          },
          items: items,
        },
      ],
    };

    console.log("Creating order at PayPal:", url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("PayPal Create Order Failed:", JSON.stringify(data));
      return new Response(JSON.stringify(data), { status: response.status });
    }

    console.log("Order created successfully:", data.id);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.error("Failed to create order server-side:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create order",
        details: error.message,
      }),
      { status: 500 }
    );
  }
};
