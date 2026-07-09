"use client";

import { useState } from "react";

import { trackEvent } from "@/lib/analytics";

type PromoShareButtonProps = {
  brandName?: string | null;
  category?: string | null;
  productName: string;
  promoId: string;
};

export default function PromoShareButton({ brandName, category, productName, promoId }: PromoShareButtonProps) {
  const [message, setMessage] = useState("");

  const copyPromoUrl = async () => {
    const promoUrl = `https://protre.fit${window.location.pathname}${window.location.search}${window.location.hash}`;

    try {
      await navigator.clipboard.writeText(promoUrl);
      setMessage("Link copiado");
      trackEvent("promo_share_copy", {
        brand: brandName,
        category,
        product_name: productName,
        promo_id: promoId,
        status: "success",
      });
    } catch {
      setMessage("Nao foi possivel copiar");
      trackEvent("promo_share_copy", {
        brand: brandName,
        category,
        product_name: productName,
        promo_id: promoId,
        status: "failed",
      });
    }

    window.setTimeout(() => setMessage(""), 2200);
  };

  return (
    <div className="mt-3">
      <button
        type="button"
        className="btn w-full cursor-pointer justify-center gap-2 rounded-md border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-700 shadow-xs transition hover:border-green-300 hover:text-green-700 dark:border-gray-700/60 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-green-700 dark:hover:text-green-300"
        onClick={copyPromoUrl}
      >
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M14.5 3a2.5 2.5 0 0 0-2.44 3.06L7.8 8.5a2.5 2.5 0 1 0 0 3l4.26 2.44A2.5 2.5 0 1 0 12.8 12.6L8.55 10.17a2.63 2.63 0 0 0 0-.34l4.26-2.44A2.5 2.5 0 1 0 14.5 3Zm0 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM5.5 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm9 4.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
          />
        </svg>
        Compartilhar promo
      </button>
      {message ? <p className="mt-2 text-center text-xs font-semibold text-green-600 dark:text-green-400">{message}</p> : null}
    </div>
  );
}
