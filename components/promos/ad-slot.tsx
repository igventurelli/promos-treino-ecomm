"use client";

import { useEffect } from "react";

import { adsenseClientId } from "@/lib/adsense";

type AdSlotProps = {
  placement: string;
  compact?: boolean;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const adSlots: Record<string, string | undefined> = {
  "pdp-before-related": process.env.NEXT_PUBLIC_ADSENSE_PDP_BEFORE_RELATED_SLOT,
  "pdp-sidebar": process.env.NEXT_PUBLIC_ADSENSE_PDP_SIDEBAR_SLOT,
  "plp-sidebar-bottom": process.env.NEXT_PUBLIC_ADSENSE_PLP_SIDEBAR_BOTTOM_SLOT,
  "plp-sidebar-top": process.env.NEXT_PUBLIC_ADSENSE_PLP_SIDEBAR_TOP_SLOT,
  "plp-top": process.env.NEXT_PUBLIC_ADSENSE_PLP_TOP_SLOT,
  "sidebar-bottom": process.env.NEXT_PUBLIC_ADSENSE_PLP_SIDEBAR_BOTTOM_SLOT,
  "sidebar-top": process.env.NEXT_PUBLIC_ADSENSE_PLP_SIDEBAR_TOP_SLOT,
};

export default function AdSlot({ placement, compact = false }: AdSlotProps) {
  const slot = adSlots[placement] || process.env.NEXT_PUBLIC_ADSENSE_SLOT;

  useEffect(() => {
    if (!slot) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("Failed to request AdSense slot", error);
    }
  }, [slot]);

  return (
    <aside
      className={`overflow-hidden rounded-lg border border-dashed border-gray-300 bg-white/70 text-center text-xs font-medium tracking-widest text-gray-400 uppercase dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-500 ${
        compact ? "min-h-16" : "min-h-24"
      }`}
      data-ad-placement={placement}
      aria-label={`Espaco reservado para anuncio ${placement}`}
    >
      {slot ? (
        <ins
          className="adsbygoogle block min-h-16 w-full"
          data-ad-client={adsenseClientId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className={`flex items-center justify-center px-4 ${compact ? "min-h-16" : "min-h-24"}`}>Publicidade</div>
      )}
    </aside>
  );
}
