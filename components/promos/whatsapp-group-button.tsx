"use client";

import { trackEvent } from "@/lib/analytics";
import { whatsappGroupUrl } from "@/lib/whatsapp";

type WhatsAppGroupButtonProps = {
  href?: string;
};

export default function WhatsAppGroupButton({ href }: WhatsAppGroupButtonProps) {
  const targetHref = href || whatsappGroupUrl;

  return (
    <a
      href={targetHref}
      target="_blank"
      rel="noopener noreferrer"
      className="promo-whatsapp-cta btn relative isolate gap-2 overflow-visible rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-black whitespace-nowrap text-white shadow-lg shadow-green-500/30 hover:bg-[#1ebe5d] sm:px-5"
      onClick={() => {
        trackEvent("whatsapp_group_click", {
          action: "open_group",
          location: "header",
          target_url: targetHref,
        });
      }}
    >
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M16.01 3.2c-7.05 0-12.78 5.72-12.78 12.77 0 2.25.59 4.45 1.72 6.38L3.12 29l6.81-1.79a12.68 12.68 0 0 0 6.08 1.55h.01c7.04 0 12.77-5.73 12.77-12.78 0-3.41-1.33-6.62-3.74-9.04a12.67 12.67 0 0 0-9.04-3.74Zm0 23.4h-.01c-1.93 0-3.82-.52-5.47-1.5l-.39-.23-4.04 1.06 1.08-3.94-.25-.41a10.55 10.55 0 0 1-1.61-5.61c0-5.89 4.79-10.68 10.69-10.68 2.85 0 5.53 1.11 7.55 3.13a10.6 10.6 0 0 1 3.13 7.56c0 5.9-4.8 10.7-10.68 10.7Zm5.86-8.01c-.32-.16-1.9-.94-2.2-1.04-.29-.11-.51-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.58-1.59a9.66 9.66 0 0 1-1.78-2.21c-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.98-2.38-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.67 0 1.57 1.15 3.09 1.31 3.3.16.21 2.27 3.47 5.49 4.86.77.33 1.37.53 1.84.68.77.25 1.47.21 2.03.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z"
        />
      </svg>
      Entrar no grupo
    </a>
  );
}
