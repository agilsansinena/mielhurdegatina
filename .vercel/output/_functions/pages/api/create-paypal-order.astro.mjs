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
    const { items, total, customerData } = await request.json();
    const accessToken = await getPayPalAccessToken();
    const orderData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "EUR",
                value: (total - 7.99).toFixed(2)
              },
              shipping: {
                currency_code: "EUR",
                value: "7.99"
              }
            }
          },
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity.toString(),
            unit_amount: {
              currency_code: "EUR",
              value: item.price.toFixed(2)
            }
          })),
          shipping: {
            name: {
              full_name: `${customerData.firstName} ${customerData.lastName}`
            },
            address: {
              address_line_1: customerData.address,
              admin_area_2: customerData.city,
              postal_code: customerData.postalCode,
              country_code: customerData.country
            }
          }
        }
      ],
      application_context: {
        brand_name: "Miel HurdeGatina",
        return_url: `${new URL(request.url).origin}/pedido-confirmado`,
        cancel_url: `${new URL(request.url).origin}/checkout`
      }
    };
    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });
    const order = await response.json();
    console.log("PayPal order response:", order);
    if (!response.ok || order.error) {
      console.error("PayPal order error:", order);
      return new Response(
        JSON.stringify({
          error: order.message || "Error creating PayPal order"
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("PayPal order creation error:", error);
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
