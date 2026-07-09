"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";

import { trackEvent } from "@/lib/analytics";
import { whatsappGroupUrl } from "@/lib/whatsapp";

type PromoMarketplaceLinkProps = {
  brandName?: string | null;
  category?: string | null;
  children: ReactNode;
  className?: string;
  href: string;
  location: "card" | "pdp";
  price?: number | null;
  productName: string;
  promoId: string;
};

export default function PromoMarketplaceLink({
  brandName,
  category,
  children,
  className,
  href,
  location,
  price,
  productName,
  promoId,
}: PromoMarketplaceLinkProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMarketplaceClick = () => {
    trackEvent("promo_marketplace_click", {
      brand: brandName,
      category,
      location,
      price,
      product_name: productName,
      promo_id: promoId,
    });

    setIsDialogOpen(true);
    trackEvent("whatsapp_group_invite_shown", {
      category,
      location,
      promo_id: promoId,
      trigger: "marketplace_click",
    });
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    trackEvent("whatsapp_group_invite_close", {
      category,
      location,
      promo_id: promoId,
    });
  };

  const dialog = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 px-4 py-6 backdrop-blur-sm" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`promo-group-dialog-title-${promoId}`}
        className="w-full max-w-md rounded-lg border border-green-200 bg-white p-5 shadow-2xl dark:border-green-900/60 dark:bg-gray-900"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black tracking-wide text-green-700 uppercase dark:text-green-300">Antes de perder a proxima</p>
            <h2 id={`promo-group-dialog-title-${promoId}`} className="mt-1 text-2xl leading-7 font-black text-gray-900 dark:text-gray-100">
              Receba as melhores promos no WhatsApp
            </h2>
          </div>
          <button
            type="button"
            className="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            aria-label="Fechar convite do grupo"
            onClick={closeDialog}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L8.94 10l-4.72 4.72a.75.75 0 1 0 1.06 1.06L10 11.06l4.72 4.72a.75.75 0 1 0 1.06-1.06L11.06 10l4.72-4.72a.75.75 0 0 0-1.06-1.06L10 8.94 5.28 4.22Z"
              />
            </svg>
          </button>
        </div>

        <p className="text-sm leading-6 font-medium text-gray-600 dark:text-gray-300">
          A promo abriu em uma nova aba. Entre no grupo para receber achados fitness em tempo real, antes do preco mudar ou o estoque acabar.
        </p>

        <a
          href={whatsappGroupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="promo-whatsapp-cta btn relative isolate mt-5 w-full justify-center gap-2 overflow-visible rounded-full bg-[#25D366] px-5 py-4 text-base font-black text-white shadow-lg shadow-green-500/30 hover:bg-[#1ebe5d]"
          onClick={() => {
            trackEvent("whatsapp_group_click", {
              action: "open_group",
              category,
              location: `marketplace_dialog_${location}`,
              promo_id: promoId,
              target_url: whatsappGroupUrl,
            });
          }}
        >
          <svg className="h-5 w-5 shrink-0" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M16.01 3.2c-7.05 0-12.78 5.72-12.78 12.77 0 2.25.59 4.45 1.72 6.38L3.12 29l6.81-1.79a12.68 12.68 0 0 0 6.08 1.55h.01c7.04 0 12.77-5.73 12.77-12.78 0-3.41-1.33-6.62-3.74-9.04a12.67 12.67 0 0 0-9.04-3.74Zm0 23.4h-.01c-1.93 0-3.82-.52-5.47-1.5l-.39-.23-4.04 1.06 1.08-3.94-.25-.41a10.55 10.55 0 0 1-1.61-5.61c0-5.89 4.79-10.68 10.69-10.68 2.85 0 5.53 1.11 7.55 3.13a10.6 10.6 0 0 1 3.13 7.56c0 5.9-4.8 10.7-10.68 10.7Zm5.86-8.01c-.32-.16-1.9-.94-2.2-1.04-.29-.11-.51-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.58-1.59a9.66 9.66 0 0 1-1.78-2.21c-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.98-2.38-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.67 0 1.57 1.15 3.09 1.31 3.3.16.21 2.27 3.47 5.49 4.86.77.33 1.37.53 1.84.68.77.25 1.47.21 2.03.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z"
            />
          </svg>
          Entrar no grupo agora
        </a>

        <button
          type="button"
          className="mt-3 w-full rounded-md px-4 py-2 text-sm font-bold text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          onClick={closeDialog}
        >
          Continuar vendo promos
        </button>
      </div>
    </div>
  );

  return (
    <>
      <a href={href} target="_blank" className={className} rel="nofollow sponsored noopener noreferrer" onClick={handleMarketplaceClick}>
        {children}
      </a>

      {isDialogOpen && typeof document !== "undefined" ? createPortal(dialog, document.body) : null}
    </>
  );
}
