"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { trackEvent } from "@/lib/analytics";

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
  return (
    <Link
      href={href}
      className={className}
      rel="nofollow sponsored"
      onClick={() => {
        trackEvent("promo_marketplace_click", {
          brand: brandName,
          category,
          location,
          price,
          product_name: productName,
          promo_id: promoId,
        });
      }}
    >
      {children}
    </Link>
  );
}
