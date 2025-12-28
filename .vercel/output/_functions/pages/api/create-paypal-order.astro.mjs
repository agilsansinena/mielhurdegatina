import { p as products } from '../../chunks/products_B27Ycex1.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const PAYPAL_CLIENT_ID = "BAAKB2pk9BJwN-x_kxkxNG1htBklaZsnpVotKnrb0JSKYxgWgpnEHgyIxgVDCgQkIPpIFQu0PNItHEP87U";
const PAYPAL_CLIENT_SECRET = "EBUxE2uHuBMHelct9CNxIQisFwmcULkFINz3_ivK7Yuq23L8PZym2e8BP7qeKhInpxjjJCTVafijqlKD";
const PAYPAL_MODE = "live";
const BASE_URL = "https://api-m.paypal.com" ;
async function generateAccessToken() {
  console.log("Attempting to generate access token...");
  const auth = Buffer.from(
    PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
  ).toString("base64");
  const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
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
const POST = async ({ request }) => {
  try {
    console.log("Processing PayPal order...");
    const { cartItems } = await request.json();
    if (!cartItems || cartItems.length === 0) {
      return new Response(JSON.stringify({ error: "Cart is empty" }), {
        status: 400
      });
    }
    let total = 0;
    const items = cartItems.map((item) => {
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
          value: product.price.toFixed(2)
        },
        quantity: item.quantity
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
                value: total.toFixed(2)
              }
            }
          },
          items
        }
      ]
    };
    console.log("Creating order at PayPal:", url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("PayPal Create Order Failed:", JSON.stringify(data));
      return new Response(JSON.stringify(data), { status: response.status });
    }
    console.log("Order created successfully:", data.id);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Failed to create order server-side:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create order",
        details: error.message
      }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
