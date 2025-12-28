import { persistentAtom } from "@nanostores/persistent";

// Cart store: array of { id, name, price, quantity, image }
export const cartItems = persistentAtom("cart", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const isCartOpen = persistentAtom("isCartOpen", false, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function addCartItem(item) {
  const existingEntry = cartItems.get().find((i) => i.id === item.id);
  if (existingEntry) {
    cartItems.set(
      cartItems.get().map((i) => {
        if (i.id === item.id) {
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      })
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
    })
  );
}
