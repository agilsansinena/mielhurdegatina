// Catálogo: única fuente de verdad para precios, textos, imágenes y datos de SEO.
// El servidor recalcula el importe con estos precios (nunca con los del navegador).
import type { ImageMetadata } from "astro";
import miel2kg from "../assets/miel2kg.avif";
import miel1kg from "../assets/miel1kg.avif";
import miel500g from "../assets/miel500g.avif";

export interface Product {
  id: string;
  title: string;
  price: number;
  weight: string;
  sku: string;
  /** Texto corto para tarjetas y metadatos (máx. ~155 caracteres) */
  description: string;
  /** Texto largo para la página de producto */
  longDescription: string[];
  /** Características que se muestran en la ficha */
  features: string[];
  badge?: string;
  image: ImageMetadata;
}

export const products: Product[] = [
  {
    id: "miel-bosque-2kg",
    title: "Miel Bosque 2kg",
    price: 16,
    weight: "2 kg",
    sku: "MH-BOSQUE-2KG",
    badge: "Mejor precio",
    description:
      "Miel de bosque cruda en formato de 2 kg: oscura, intensa y con notas de brezo y castaño. El mejor precio por kilo para el día a día.",
    longDescription: [
      "La misma miel de bosque que cosechamos en la Sierra de Gata y Las Hurdes, en el formato más rentable. Un tarro grande pensado para quien toma miel cada día: en el desayuno, en infusiones o en la cocina.",
      "Es una miel oscura, de sabor intenso y con un final ligeramente amargo que la distingue de las mieles de flores. No la calentamos ni la mezclamos con otras procedencias: sale del panal y se filtra en frío por gravedad.",
      "Al ser miel cruda, es normal que cristalice con el tiempo. Es la mejor señal de que no ha pasado por procesos industriales.",
    ],
    features: [
      "Miel cruda, sin pasteurizar ni calentar",
      "Origen único: Extremadura",
      "Filtrada en frío por gravedad",
      "Sin azúcares añadidos ni mezclas",
    ],
    image: miel2kg,
  },
  {
    id: "miel-bosque-1kg",
    title: "Miel Bosque 1kg",
    price: 9,
    weight: "1 kg",
    sku: "MH-BOSQUE-1KG",
    badge: "Best Seller",
    description:
      "Miel de bosque cruda de 1 kg: oscura, aromática y con un final amargo. El formato más vendido para toda la familia.",
    longDescription: [
      "Nuestra miel de bosque en el formato más vendido. Un kilo de miel cruda cosechada en colmenas de la Sierra de Gata y Las Hurdes, entre brezos, castaños, robles y jaras.",
      "Tiene el color oscuro y el aroma profundo que da la floración de monte, con un final ligeramente amargo que la hace inconfundible. Ideal tanto para tomar a cucharadas como para endulzar yogur, tostadas o guisos.",
      "No se pasteuriza ni se mezcla, de modo que conserva su textura y su aroma originales. Si cristaliza, basta con un baño maría suave por debajo de 40 ºC.",
    ],
    features: [
      "Miel cruda, sin pasteurizar ni calentar",
      "Origen único: Extremadura",
      "Filtrada en frío por gravedad",
      "Tarro de cristal reutilizable",
    ],
    image: miel1kg,
  },
  {
    id: "miel-bosque-500g",
    title: "Miel Bosque 500g",
    price: 6,
    weight: "500 g",
    sku: "MH-BOSQUE-500G",
    description:
      "Miel de bosque cruda de 500 g: el formato pequeño para probarla, para regalar o para tener siempre a mano en la cocina.",
    longDescription: [
      "El formato de entrada a nuestra miel de bosque. Medio kilo de miel cruda con el mismo sabor oscuro e intenso que la de los tarros grandes, ideal para probarla por primera vez o para regalar.",
      "Se cosecha en las mismas colmenas de la Sierra de Gata y Las Hurdes, se filtra en frío y se envasa en origen. Sin calentar, sin mezclar y sin azúcares añadidos.",
      "Un tarro pequeño que cabe en cualquier despensa y que aguanta perfectamente el día a día.",
    ],
    features: [
      "Miel cruda, sin pasteurizar ni calentar",
      "Origen único: Extremadura",
      "Formato pequeño para probar o regalar",
      "Sin azúcares añadidos ni mezclas",
    ],
    image: miel500g,
  },
];

export const getProduct = (id: string) => products.find((product) => product.id === id);

export const productUrl = (id: string) => `/productos/${id}`;
