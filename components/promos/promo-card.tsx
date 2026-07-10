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
  const hasCoupon = Boolean(promo.coupon);

  return (
    <article className="group col-span-full grid h-full grid-rows-[auto_1fr] overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md sm:col-span-6 xl:col-span-4 dark:border-gray-800 dark:bg-gray-950">
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
        <div className="absolute top-3 left-3 rounded-sm bg-red-600 px-2.5 py-1 text-xs font-black text-white shadow-sm">
          {bestDiscountLabel(promo)}
        </div>
        <div className="absolute right-3 bottom-3 left-3 flex flex-wrap items-center justify-between gap-2">
          <span className="shrink-0 rounded-sm bg-gray-950/90 px-2.5 py-1 text-xs font-bold text-white">
            {categoryLabel(promo.category)}
          </span>
          <span className="shrink-0 rounded-sm bg-white/95 px-2.5 py-1 text-xs font-black text-gray-950 shadow-sm dark:bg-gray-950/95 dark:text-gray-100">
            {timeAgo(promo.createdAt)}
          </span>
        </div>
      </Link>

      <div className="flex min-w-0 grow flex-col p-4">
        <div className="mb-2 flex min-h-7 flex-wrap items-start justify-between gap-2 text-xs">
          <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 font-black text-green-700 dark:bg-green-900/25 dark:text-green-300">{relevanceScoreLabel(promo.relevanceScore)}</span>
          {hasCoupon ? <span className="shrink-0 pt-1 font-black text-red-600 dark:text-red-300">Cupom ativo</span> : null}
        </div>

        <Link
          href={`/p/${promo.id}`}
          className="mb-2 line-clamp-2 h-12 overflow-hidden break-words text-base leading-6 font-bold text-gray-900 hover:text-green-700 dark:text-gray-100 dark:hover:text-green-400"
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

        <p className="mb-3 h-5 truncate text-sm font-bold text-gray-500 dark:text-gray-400">{promo.brandName || "Promos Treino"}</p>

        <div className="mb-4 rounded-md bg-gray-50 p-3 dark:bg-gray-900">
          <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
            <span className="text-2xl leading-none font-black tracking-normal text-gray-950 dark:text-gray-50">{newPrice || "Ver preco"}</span>
            {oldPrice ? <span className="pb-0.5 text-sm font-semibold text-gray-400 line-through">{oldPrice}</span> : null}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-black">
            <span className="text-green-700 dark:text-green-300">{savingsText(promo)}</span>
            <span className="text-gray-400">Preco pode mudar</span>
          </div>
        </div>

        <div
          className={
            promo.coupon
              ? "mb-4 flex min-h-11 items-center justify-between gap-3 rounded-md border border-dashed border-green-300 bg-green-50 px-3 py-2 text-sm dark:border-green-800 dark:bg-green-900/20"
              : "mb-4 flex min-h-11 items-center justify-between gap-3 rounded-md border border-gray-100 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-gray-950"
          }
        >
          {promo.coupon ? (
            <>
            <span className="font-bold text-green-800 dark:text-green-300">Use o cupom</span>
            <span className="truncate font-black text-green-950 dark:text-green-100">{promo.coupon}</span>
            </>
          ) : (
            <span className="w-full text-center font-bold text-gray-500 dark:text-gray-400">Preço já com desconto</span>
          )}
        </div>

        <PromoMarketplaceLink
          href={`/api/promos/${promo.id}/go`}
          className="btn w-full justify-center rounded-md bg-green-600 px-4 py-3 text-sm font-black text-white shadow-sm shadow-green-600/20 hover:bg-green-700"
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
