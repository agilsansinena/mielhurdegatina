import { atom } from "nanostores";

export type CheckoutStep = "shipping" | "payment" | "success";

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
}

// State
export const checkoutStep = atom<CheckoutStep>("shipping");

export const shippingAddress = atom<ShippingAddress>({
  fullName: "",
  address: "",
  city: "",
  postalCode: "",
  country: "España",
  email: "",
  phone: "",
});

// Validation
export const validateAddress = (data: Partial<ShippingAddress>) => {
  const errors: Record<string, string> = {};
  let isValid = true;

  if (!data.fullName || data.fullName.length < 3) {
    errors.fullName = "Nombre demasiado corto";
    isValid = false;
  }
  if (!data.address || data.address.length < 5) {
    errors.address = "Dirección requerida";
    isValid = false;
  }
  if (!data.city) {
    errors.city = "Ciudad requerida";
    isValid = false;
  }
  if (!data.postalCode || data.postalCode.length < 4) {
    errors.postalCode = "Código postal inválido";
    isValid = false;
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Email inválido";
    isValid = false;
  }
  if (!data.phone || data.phone.length < 9) {
    errors.phone = "Teléfono inválido";
    isValid = false;
  }

  return { isValid, errors };
};
