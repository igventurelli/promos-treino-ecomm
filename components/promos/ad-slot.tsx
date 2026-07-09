"use client";

import { useEffect, useRef, useState } from "react";

import { useCookieConsent } from "@/components/consent/use-cookie-consent";
import { adsenseClientId } from "@/lib/adsense";

type AdSlotProps = {
  placement: string;
  className?: string;
  compact?: boolean;
};

type AdVisibility = "hidden" | "loading" | "visible";

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

export default function AdSlot({ placement, className = "", compact = false }: AdSlotProps) {
  const slot = adSlots[placement] || process.env.NEXT_PUBLIC_ADSENSE_SLOT;
  const adRef = useRef<HTMLModElement>(null);
  const { hasAccepted } = useCookieConsent();
  const [visibility, setVisibility] = useState<AdVisibility>(slot ? "loading" : "hidden");

  useEffect(() => {
    if (!slot || !hasAccepted) {
      setVisibility("hidden");
      return;
    }

    setVisibility("loading");

    const adElement = adRef.current;

    const updateVisibility = () => {
      if (adElement?.dataset.adStatus === "filled") {
        setVisibility("visible");
      }
    };

    const observer = adElement
      ? new MutationObserver(updateVisibility)
      : null;

    if (adElement) {
      observer?.observe(adElement, {
        attributeFilter: ["data-ad-status"],
        attributes: true,
      });
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      setVisibility("hidden");
    }

    const timeoutId = window.setTimeout(() => {
      if (!adElement || adElement.dataset.adStatus !== "filled") {
        setVisibility("hidden");
      }
    }, 4500);

    return () => {
      observer?.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [hasAccepted, slot]);

  if (!slot || !hasAccepted || visibility === "hidden") return null;

  return (
    <aside
      className={
        visibility === "loading"
          ? "pointer-events-none absolute left-0 right-0 h-0 min-h-0 overflow-hidden border-0 p-0 opacity-0"
          : `overflow-hidden rounded-lg border border-dashed border-gray-300 bg-white/70 text-center text-xs font-medium tracking-widest text-gray-400 uppercase opacity-100 transition-opacity dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-500 ${className} ${
              compact ? "min-h-16" : "min-h-24"
            }`
      }
      data-ad-placement={placement}
      aria-label={`Espaco reservado para anuncio ${placement}`}
      aria-hidden={visibility === "loading"}
    >
      <ins
        ref={adRef}
        className="adsbygoogle block min-h-16 w-full"
        data-ad-client={adsenseClientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
