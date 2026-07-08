import { categories, type Category } from "./categories";
import type { Promo } from "./promos";

export function formatCurrency(value: number | null) {
  if (value === null) return null;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatPercent(value: number | null) {
  if (value === null) return null;
  return `${Math.round(value)}% OFF`;
}

export function categoryLabel(category: Category | null) {
  return categories.find((item) => item.value === category)?.label || "Fitness";
}

export function timeAgo(date: string) {
  const createdAt = new Date(date).getTime();
  const diffMinutes = Math.max(0, Math.round((Date.now() - createdAt) / 60000));

  if (diffMinutes < 60) return `${diffMinutes || 1} min atras`;

  const hours = Math.floor(diffMinutes / 60);
  if (hours < 24) return `${hours}h atras`;

  return "expirada";
}

export function bestDiscountLabel(promo: Promo) {
  return formatPercent(promo.discountPercentage) || formatCurrency(promo.discountAmount) || "Oferta ativa";
}

export function savingsText(promo: Promo) {
  const amount = formatCurrency(promo.discountAmount);
  if (amount) return `Economize ${amount}`;

  if (promo.oldPrice !== null && promo.newPrice !== null) {
    return `Antes ${formatCurrency(promo.oldPrice)}`;
  }

  return "Selecionada pelo grupo";
}

export function relevanceScoreLabel(score: number) {
  if (score <= 2) return "❌ Irrelevante";
  if (score <= 4) return "⚠️ Fraco / duvidoso";
  if (score <= 6) return "👍 Relevante";
  if (score <= 8) return "🔥 Promo forte";
  return "🚀 Excelente";
}
