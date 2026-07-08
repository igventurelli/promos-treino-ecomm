import { NextResponse } from "next/server";

import { hasDatabaseConfig } from "@/lib/db";
import { getPromoById } from "@/lib/promos";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  const { id } = await params;

  if (!hasDatabaseConfig()) {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }

  const promo = await getPromoById(id).catch((error) => {
    console.error("Failed to load redirect promo from Postgres", error);
    return null;
  });

  if (!promo) {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }

  try {
    return NextResponse.redirect(new URL(promo.productUrl), 302);
  } catch {
    return NextResponse.redirect(new URL(`/p/${id}`, request.url), 302);
  }
}
