export const categories = [
  { value: "supplement", label: "Suplementos" },
  { value: "shoes", label: "Tenis" },
  { value: "smartwatch", label: "Smartwatch" },
  { value: "clothing", label: "Roupas" },
] as const;

export type Category = (typeof categories)[number]["value"];
