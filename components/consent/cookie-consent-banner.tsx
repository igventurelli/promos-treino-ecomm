"use client";

import Link from "next/link";

import { setStoredCookieConsent } from "@/lib/consent";

import { useCookieConsent } from "./use-cookie-consent";

export default function CookieConsentBanner() {
  const { hasChosen, isReady } = useCookieConsent();

  if (!isReady || hasChosen) return null;

  return (
    <div className="fixed right-4 bottom-4 left-4 z-50 mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-4 shadow-2xl dark:border-gray-700/60 dark:bg-gray-900 sm:right-6 sm:bottom-6 sm:left-auto sm:w-[28rem]">
      <div className="space-y-3">
        <div>
          <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">Cookies e anúncios</h2>
          <p className="mt-1 text-sm leading-6 font-medium text-gray-600 dark:text-gray-300">
            Usamos cookies e identificadores para medir visitas e exibir anúncios. Você pode aceitar ou recusar agora.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="btn flex-1 cursor-pointer justify-center rounded-md bg-green-600 px-4 py-2.5 text-sm font-black text-white hover:bg-green-700"
            onClick={() => setStoredCookieConsent("accepted")}
          >
            Aceitar
          </button>
          <button
            type="button"
            className="btn flex-1 cursor-pointer justify-center rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-black text-gray-700 hover:bg-gray-50 dark:border-gray-700/60 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            onClick={() => setStoredCookieConsent("declined")}
          >
            Recusar
          </button>
        </div>

        <Link href="/privacidade" className="inline-flex text-xs font-bold text-gray-500 hover:text-green-700 dark:text-gray-400 dark:hover:text-green-300">
          Ver política de privacidade
        </Link>
      </div>
    </div>
  );
}
