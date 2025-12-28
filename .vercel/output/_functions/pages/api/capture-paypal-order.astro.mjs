export { renderers } from '../../renderers.mjs';

const prerender = false;
const PAYPAL_CLIENT_ID = "BAAKB2pk9BJwN-x_kxkxNG1htBklaZsnpVotKnrb0JSKYxgWgpnEHgyIxgVDCgQkIPpIFQu0PNItHEP87U";
const PAYPAL_CLIENT_SECRET = "EBUxE2uHuBMHelct9CNxIQisFwmcULkFINz3_ivK7Yuq23L8PZym2e8BP7qeKhInpxjjJCTVafijqlKD";
const BASE_URL = "https://api-m.paypal.com" ;
async function generateAccessToken() {
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
    throw new Error(`Failed to get access token: ${response.status}`);
  }
  const data = await response.json();
  return data.access_token;
}
const POST = async ({ request }) => {
  try {
    const { orderID } = await request.json();
    if (!orderID) {
      return new Response(JSON.stringify({ error: "Missing orderID" }), {
        status: 400
      });
    }
    console.log(`Capturing order: ${orderID}...`);
    const accessToken = await generateAccessToken();
    const url = `${BASE_URL}/v2/checkout/orders/${orderID}/capture`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("PayPal Capture Failed:", JSON.stringify(data));
      return new Response(JSON.stringify(data), { status: response.status });
    }
    console.log("Order captured successfully:", data.id);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Failed to capture order:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to capture order",
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
