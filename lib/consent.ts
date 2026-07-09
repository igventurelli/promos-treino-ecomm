export const cookieConsentEventName = "promos_treino_cookie_consent_changed";
export const cookieConsentStorageKey = "promos_treino_cookie_consent";

export type CookieConsentValue = "accepted" | "declined";

export function getStoredCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;

  const storedValue = window.localStorage.getItem(cookieConsentStorageKey);
  return storedValue === "accepted" || storedValue === "declined" ? storedValue : null;
}

export function setStoredCookieConsent(value: CookieConsentValue) {
  window.localStorage.setItem(cookieConsentStorageKey, value);
  window.dispatchEvent(new CustomEvent(cookieConsentEventName, { detail: value }));
}
