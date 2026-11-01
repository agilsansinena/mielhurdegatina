// Única fuente de verdad para datos del negocio, envío y datos legales.
// Si cambia un precio de envío o el año de fundación, se cambia AQUÍ.

export const site = {
  name: "Miel HurdeGatina",
  url: "https://www.mielhurdegatina.com",
  foundedYear: 1980,
  description:
    "Miel pura de abeja cosechada artesanalmente en Las Hurdes y Sierra de Gata. 100% natural, sin mezclas ni pasteurizar.",

  // Contacto público
  contactEmail: "mielhurdegatina@gmail.com",
  phone: "+34659393507",
  phoneDisplay: "+34 659 393 507",
  whatsapp: "34659393507",

  // Email desde el que se envían los pedidos (dominio verificado en Resend)
  orderFromEmail: "pedidos@mielhurdegatina.com",
  // Buzones internos que reciben el aviso de cada pedido
  orderNotificationEmail: ["mrodriguezmartin1996@gmail.com", "agilsansinena@gmail.com"],

  address: {
    street: "Torrecilla de los Ángeles",
    locality: "Torrecilla de los Ángeles",
    region: "Cáceres",
    postalCode: "10869",
    country: "ES",
  },
  geo: { latitude: 40.2478918, longitude: -6.4163881 },

  // Datos legales: completar NIF/CIF cuando esté disponible y se mostrará solo.
  legal: {
    ownerName: "Miel HurdeGatina",
    nif: "",
  },

  social: {
    instagram: "https://instagram.com/mielhurdegatina",
  },
} as const;

// Envío: 5,50 € de gastos, gratis a partir de 60 €
export const shipping = {
  cost: 5.5,
  threshold: 60,
} as const;

export const yearsOfCraft = () => new Date().getFullYear() - site.foundedYear;
export const yearsOfCraftRounded = () => Math.floor(yearsOfCraft() / 5) * 5;
