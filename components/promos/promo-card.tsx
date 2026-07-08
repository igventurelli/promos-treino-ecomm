"use client";

import Link from "next/link";

import PromoMarketplaceLink from "@/components/promos/promo-marketplace-link";
import { trackEvent } from "@/lib/analytics";
import { bestDiscountLabel, categoryLabel, formatCurrency, relevanceScoreLabel, savingsText, timeAgo } from "@/lib/promo-format";
import type { Promo } from "@/lib/promos";

import PromoImage from "./promo-image";

type PromoCardProps = {
  promo: Promo;
};

export default function PromoCard({ promo }: PromoCardProps) {
  const newPrice = formatCurrency(promo.newPrice);
  const oldPrice = formatCurrency(promo.oldPrice);

  return (
    <article className="group col-span-full flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xs transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md sm:col-span-6 xl:col-span-4 dark:border-gray-700/60 dark:bg-gray-800">
      <Link
        href={`/p/${promo.id}`}
        className="relative block aspect-[4/3] bg-white dark:bg-gray-900"
        onClick={() => {
          trackEvent("promo_detail_click", {
            brand: promo.brandName,
            category: promo.category,
            location: "card_image",
            product_name: promo.productName,
            promo_id: promo.id,
          });
        }}
      >
        <PromoImage src={promo.imageUrl} alt={promo.productName} />
        <div className="absolute top-3 left-3 rounded-md bg-red-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
          {bestDiscountLabel(promo)}
        </div>
        <div className="absolute bottom-3 left-3 rounded-md bg-gray-900/90 px-2.5 py-1 text-xs font-semibold text-white">
          {categoryLabel(promo.category)}
        </div>
      </Link>

      <div className="flex grow flex-col p-4">
        <div className="mb-2 flex items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-green-700 dark:text-green-400">{relevanceScoreLabel(promo.relevanceScore)}</span>
          <span className="text-gray-500">{timeAgo(promo.createdAt)}</span>
        </div>

        <Link
          href={`/p/${promo.id}`}
          className="mb-3 line-clamp-2 min-h-12 text-base leading-6 font-bold text-gray-800 hover:text-green-700 dark:text-gray-100 dark:hover:text-green-400"
          onClick={() => {
            trackEvent("promo_detail_click", {
              brand: promo.brandName,
              category: promo.category,
              location: "card_title",
              product_name: promo.productName,
              promo_id: promo.id,
            });
          }}
        >
          {promo.productName}
        </Link>

        {promo.brandName ? <p className="mb-3 text-sm font-medium text-gray-500">{promo.brandName}</p> : null}

        <div className="mt-auto mb-4">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-black tracking-normal text-gray-900 dark:text-gray-100">{newPrice || "Ver preco"}</span>
            {oldPrice ? <span className="pb-1 text-sm font-medium text-gray-400 line-through">{oldPrice}</span> : null}
          </div>
          <div className="mt-1 text-sm font-bold text-green-700 dark:text-green-400">{savingsText(promo)}</div>
        </div>

        {promo.coupon ? (
          <div className="mb-4 flex items-center justify-between rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm dark:border-green-900/60 dark:bg-green-900/20">
            <span className="font-semibold text-green-800 dark:text-green-300">Cupom</span>
            <span className="font-black text-green-900 dark:text-green-100">{promo.coupon}</span>
          </div>
        ) : null}

        <PromoMarketplaceLink
          href={`/api/promos/${promo.id}/go`}
          className="btn w-full justify-center rounded-md bg-green-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-green-600/20 hover:bg-green-700"
          brandName={promo.brandName}
          category={promo.category}
          location="card"
          price={promo.newPrice}
          productName={promo.productName}
          promoId={promo.id}
        >
          Pegar promo agora
        </PromoMarketplaceLink>
      </div>
    </article>
  );
}
