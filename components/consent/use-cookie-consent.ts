"use client";

import { useEffect, useState } from "react";

import { cookieConsentEventName, type CookieConsentValue, getStoredCookieConsent } from "@/lib/consent";

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setConsent(getStoredCookieConsent());
    setIsReady(true);

    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent<CookieConsentValue>;
      setConsent(customEvent.detail || getStoredCookieConsent());
    };

    window.addEventListener(cookieConsentEventName, handleConsentChange);

    return () => {
      window.removeEventListener(cookieConsentEventName, handleConsentChange);
    };
  }, []);

  return {
    consent,
    hasAccepted: consent === "accepted",
    hasChosen: consent !== null,
    isReady,
  };
}
