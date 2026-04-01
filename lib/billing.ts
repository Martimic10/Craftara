export const PRODUCT_KEYS = [
  "suite",
  "barcodeforge",
  "labelcraft",
  "formvault",
  "invoicesnap",
  "contractquick",
] as const;

export type ProductKey = (typeof PRODUCT_KEYS)[number];

export function getPriceIdForProduct(productKey: ProductKey) {
  const priceMap: Record<ProductKey, string | undefined> = {
    suite: process.env.STRIPE_PRICE_SUITE_99,
    barcodeforge: process.env.STRIPE_PRICE_BARCODEFORGE_15,
    labelcraft: process.env.STRIPE_PRICE_LABELCRAFT_15,
    formvault: process.env.STRIPE_PRICE_FORMVAULT_20,
    invoicesnap: process.env.STRIPE_PRICE_INVOICESNAP_25,
    contractquick: process.env.STRIPE_PRICE_CONTRACTQUICK_35,
  };

  return priceMap[productKey];
}

export function isProductKey(value: string): value is ProductKey {
  return (PRODUCT_KEYS as readonly string[]).includes(value);
}
