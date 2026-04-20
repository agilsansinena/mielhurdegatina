export { renderers } from '../../renderers.mjs';

const PAYPAL_CLIENT_ID = "BAAKB2pk9BJwN-x_kxkxNG1htBklaZsnpVotKnrb0JSKYxgWgpnEHgyIxgVDCgQkIPpIFQu0PNItHEP87U";
const PAYPAL_CLIENT_SECRET = "EBUxE2uHuBMHelct9CNxIQisFwmcULkFINz3_ivK7Yuq23L8PZym2e8BP7qeKhInpxjjJCTVafijqlKD";
const PAYPAL_API = "https://api-m.sandbox.paypal.com";
async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
  ).toString("base64");
  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });
  const data = await response.json();
  return data.access_token;
}
const POST = async ({ request }) => {
  try {
    const { orderID, orderData } = await request.json();
    const accessToken = await getPayPalAccessToken();
    const response = await fetch(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );
    const captureData = await response.json();
    if (captureData.status === "COMPLETED") {
      const saveResponse = await fetch(
        new URL("/api/create-order", request.url).toString(),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...orderData,
            paymentMethod: "paypal",
            paypalOrderId: orderID
          })
        }
      );
      const savedOrder = await saveResponse.json();
      return new Response(
        JSON.stringify({
          success: true,
          orderId: savedOrder.orderId,
          captureData
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    return new Response(JSON.stringify(captureData), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("PayPal capture error:", error);
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
