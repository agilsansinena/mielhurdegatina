export const prerender = false;

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
    throw new Error(`Failed to get access token: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

export const POST = async ({ request }: { request: Request }) => {
  try {
    const { orderID } = await request.json();

    if (!orderID) {
      return new Response(JSON.stringify({ error: "Missing orderID" }), {
        status: 400,
      });
    }

    console.log(`Capturing order: ${orderID}...`);
    const accessToken = await generateAccessToken();
    const url = `${BASE_URL}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("PayPal Capture Failed:", JSON.stringify(data));
      return new Response(JSON.stringify(data), { status: response.status });
    }

    console.log("Order captured successfully:", data.id);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.error("Failed to capture order:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to capture order",
        details: error.message,
      }),
      { status: 500 }
    );
  }
};
