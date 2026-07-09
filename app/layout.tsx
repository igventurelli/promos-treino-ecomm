import "./css/style.css";

import { Suspense } from "react";

import AppProvider from "./app-provider";
import Theme from "./theme-provider";
import GoogleAnalytics from "@/components/analytics/google-analytics";

export const metadata = {
  title: "Promos Treino",
  description: "As melhores promocoes fitness das ultimas 24h em suplementos, roupas, acessorios e equipamentos.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      {/* suppressHydrationWarning: https://github.com/vercel/next.js/issues/44343 */}
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9471619371733558"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-inter bg-gray-100 text-gray-600 antialiased dark:bg-gray-900 dark:text-gray-400">
        <Theme>
          <AppProvider>{children}</AppProvider>
        </Theme>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
