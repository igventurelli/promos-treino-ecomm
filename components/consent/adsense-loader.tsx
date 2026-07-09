"use client";

import Script from "next/script";

import { adsenseClientId } from "@/lib/adsense";

import { useCookieConsent } from "./use-cookie-consent";

export default function AdsenseLoader() {
  const { hasAccepted } = useCookieConsent();

  if (!hasAccepted) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
