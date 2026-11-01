import { atom, computed } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { shipping } from "../data/site";

// Cart store: array of { id, name, price, quantity, image }
export const cartItems = persistentAtom("cart", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const isCartOpen = atom(false);

export function addCartItem(item) {
  const existingEntry = cartItems.get().find((i) => i.id === item.id);
  if (existingEntry) {
    cartItems.set(
      cartItems.get().map((i) => {
        if (i.id === item.id) {
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      }),
    );
  } else {
    cartItems.set([...cartItems.get(), { ...item, quantity: 1 }]);
  }
  isCartOpen.set(true);
}

export function removeCartItem(itemId) {
  cartItems.set(cartItems.get().filter((i) => i.id !== itemId));
}

export function updateCartItemQuantity(itemId, quantity) {
  if (quantity < 1) {
    removeCartItem(itemId);
    return;
  }
  cartItems.set(
    cartItems.get().map((i) => {
      if (i.id === itemId) {
        return { ...i, quantity };
      }
      return i;
    }),
  );
}

// Helper specific to formatting currency if needed, or just consume these raw values

// Re-exportados desde src/data/site.ts (única fuente de verdad)
export const SHIPPING_THRESHOLD = shipping.threshold; // Envío gratis a partir de 60€
export const SHIPPING_COST_VALUE = shipping.cost; // 5,50€ de gastos de envío

export const subtotal = computed(cartItems, (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

export const shippingCost = computed(subtotal, (currentSubtotal) => {
  if (currentSubtotal === 0) return 0;
  if (currentSubtotal >= SHIPPING_THRESHOLD) return 0; // Envío gratis a partir de 60€
  return SHIPPING_COST_VALUE;
});

export const total = computed(
  [subtotal, shippingCost],
  (currentSubtotal, currentShipping) => {
    return currentSubtotal + currentShipping;
  },
);
