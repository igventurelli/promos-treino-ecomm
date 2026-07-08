"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

type PromoDetailViewTrackerProps = {
  brandName: string | null;
  category: string | null;
  price: number | null;
  productName: string;
  promoId: string;
};

export default function PromoDetailViewTracker({ brandName, category, price, productName, promoId }: PromoDetailViewTrackerProps) {
  useEffect(() => {
    trackEvent("promo_detail_view", {
      brand: brandName,
      category,
      price,
      product_name: productName,
      promo_id: promoId,
    });
  }, [brandName, category, price, productName, promoId]);

  return null;
}
