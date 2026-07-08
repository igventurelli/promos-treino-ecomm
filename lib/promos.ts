import { unstable_noStore as noStore } from "next/cache";

import { categories, type Category } from "./categories";
import { getPool } from "./db";

export type Promo = {
  id: string;
  category: Category | null;
  productName: string;
  brandName: string | null;
  oldPrice: number | null;
  newPrice: number | null;
  discountAmount: number | null;
  discountPercentage: number | null;
  coupon: string | null;
  productUrl: string;
  purchaseInstructions: string | null;
  normalizedTitle: string;
  reasoningSummary: string | null;
  imageUrl: string | null;
  relevanceScore: number;
  createdAt: string;
  isFresh: boolean;
};

type PromoRow = {
  id: string;
  category: Category | null;
  product_name: string;
  brand_name: string | null;
  old_price: string | null;
  new_price: string | null;
  discount_amount: string | null;
  discount_percentage: string | null;
  coupon: string | null;
  product_url: string;
  purchase_instructions: string | null;
  normalized_title: string;
  reasoning_summary: string | null;
  image_url: string | null;
  relevance_score: string;
  created_at: string;
  is_fresh: boolean;
};

export type PromoFilters = {
  brand?: string;
  category?: string;
  q?: string;
};

export type FilterOptions = {
  brands: string[];
};

const promoSelect = `
  id::text,
  category,
  product_name,
  brand_name,
  old_price,
  new_price,
  discount_amount,
  discount_percentage,
  coupon,
  product_url,
  purchase_instructions,
  normalized_title,
  reasoning_summary,
  image_url,
  relevance_score,
  created_at::text,
  created_at >= now() - interval '24 hours' as is_fresh
`;

const mapPromo = (row: PromoRow): Promo => ({
  id: row.id,
  category: row.category,
  productName: row.product_name,
  brandName: row.brand_name,
  oldPrice: row.old_price ? Number(row.old_price) : null,
  newPrice: row.new_price ? Number(row.new_price) : null,
  discountAmount: row.discount_amount ? Number(row.discount_amount) : null,
  discountPercentage: row.discount_percentage ? Number(row.discount_percentage) : null,
  coupon: row.coupon,
  productUrl: row.product_url,
  purchaseInstructions: row.purchase_instructions,
  normalizedTitle: row.normalized_title,
  reasoningSummary: row.reasoning_summary,
  imageUrl: row.image_url,
  relevanceScore: Number(row.relevance_score),
  createdAt: row.created_at,
  isFresh: row.is_fresh,
});

export async function getPromos(filters: PromoFilters = {}) {
  noStore();

  const values: string[] = [];
  const where = [
    "should_send = true",
    "is_relevant = true",
    "created_at >= now() - interval '24 hours'",
  ];

  if (filters.category && categories.some((category) => category.value === filters.category)) {
    values.push(filters.category);
    where.push(`category = $${values.length}`);
  }

  if (filters.brand) {
    values.push(filters.brand);
    where.push(`brand_name = $${values.length}`);
  }

  if (filters.q?.trim()) {
    values.push(`%${filters.q.trim()}%`);
    where.push(`(
      product_name ilike $${values.length}
      or coalesce(brand_name, '') ilike $${values.length}
      or normalized_title ilike $${values.length}
      or coalesce(raw_message, '') ilike $${values.length}
    )`);
  }

  const { rows } = await getPool().query<PromoRow>(
    `
      select ${promoSelect}
      from promos_treino.promos
      where ${where.join(" and ")}
      order by relevance_score desc, discount_percentage desc nulls last, created_at desc
      limit 96
    `,
    values,
  );

  return rows.map(mapPromo);
}

export async function getPromoById(id: string) {
  noStore();

  if (!/^\d+$/.test(id)) return null;

  const { rows } = await getPool().query<PromoRow>(
    `
      select ${promoSelect}
      from promos_treino.promos
      where id = $1 and should_send = true and is_relevant = true
      limit 1
    `,
    [id],
  );

  return rows[0] ? mapPromo(rows[0]) : null;
}

export async function getRelatedPromos(promo: Promo) {
  noStore();

  const { rows } = await getPool().query<PromoRow>(
    `
      select ${promoSelect}
      from promos_treino.promos
      where should_send = true
        and is_relevant = true
        and created_at >= now() - interval '24 hours'
        and id <> $1
        and ($2::text is null or category = $2)
      order by relevance_score desc, created_at desc
      limit 4
    `,
    [promo.id, promo.category],
  );

  return rows.map(mapPromo);
}

export async function getFilterOptions(): Promise<FilterOptions> {
  noStore();

  const brandsResult = await getPool().query<{ brand_name: string }>(
    `
      select distinct brand_name
      from promos_treino.promos
      where should_send = true
        and is_relevant = true
        and brand_name is not null
        and created_at >= now() - interval '24 hours'
      order by brand_name asc
      limit 80
    `,
  );

  return {
    brands: brandsResult.rows.map((row) => row.brand_name),
  };
}
