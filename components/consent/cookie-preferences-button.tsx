"use client";

import { cookieConsentStorageKey, cookieConsentEventName } from "@/lib/consent";

export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="cursor-pointer font-bold text-gray-700 hover:text-green-700 dark:text-gray-300 dark:hover:text-green-300"
      onClick={() => {
        window.localStorage.removeItem(cookieConsentStorageKey);
        window.dispatchEvent(new CustomEvent(cookieConsentEventName, { detail: null }));
      }}
    >
      Cookies
    </button>
  );
}
