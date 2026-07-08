import Link from "next/link";
import { notFound } from "next/navigation";

// import AdSlot from "@/components/promos/ad-slot";
import PromoBrand from "@/components/promos/promo-brand";
import PromoCard from "@/components/promos/promo-card";
import PromoDetailViewTracker from "@/components/promos/promo-detail-view-tracker";
import PromoImage from "@/components/promos/promo-image";
import PromoMarketplaceLink from "@/components/promos/promo-marketplace-link";
import { hasDatabaseConfig } from "@/lib/db";
import { bestDiscountLabel, categoryLabel, formatCurrency, relevanceScoreLabel, savingsText, timeAgo } from "@/lib/promo-format";
import { getPromoById, getRelatedPromos } from "@/lib/promos";

type PromoPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PromoPage({ params }: PromoPageProps) {
  const { id } = await params;

  if (!hasDatabaseConfig()) notFound();

  const promo = await getPromoById(id).catch((error) => {
    console.error("Failed to load promo from Postgres", error);
    return null;
  });

  if (!promo) notFound();

  const related = await getRelatedPromos(promo).catch((error) => {
    console.error("Failed to load related promos from Postgres", error);
    return [];
  });

  const newPrice = formatCurrency(promo.newPrice);
  const oldPrice = formatCurrency(promo.oldPrice);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <PromoDetailViewTracker brandName={promo.brandName} category={promo.category} price={promo.newPrice} productName={promo.productName} promoId={promo.id} />
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <PromoBrand />
          <Link href="/" className="btn rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 dark:border-gray-700/60 dark:bg-gray-800 dark:text-gray-200">
            &lt;- Voltar
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {!promo.isFresh ? (
          <div className="mb-5 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-bold text-yellow-900 dark:border-yellow-900/60 dark:bg-yellow-900/20 dark:text-yellow-200">
            Esta promo passou da janela de 24h. Veja as ofertas ativas no fim da pagina antes de decidir.
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xs dark:border-gray-700/60 dark:bg-gray-800">
            <div className="relative aspect-[4/3] bg-white dark:bg-gray-900">
              <PromoImage src={promo.imageUrl} alt={promo.productName} />
              <div className="absolute top-4 left-4 rounded-md bg-red-600 px-3 py-1.5 text-sm font-black tracking-wide text-white uppercase shadow-sm">
                {bestDiscountLabel(promo)}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-700/60 dark:bg-gray-800">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-bold tracking-wide text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-200">
                  {categoryLabel(promo.category)}
                </span>
                <span className="rounded-md bg-green-100 px-2.5 py-1 text-xs font-bold tracking-wide text-green-800 uppercase dark:bg-green-900/30 dark:text-green-300">
                  {relevanceScoreLabel(promo.relevanceScore)}
                </span>
                <span className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-bold tracking-wide text-red-700 uppercase dark:bg-red-900/20 dark:text-red-300">
                  {timeAgo(promo.createdAt)}
                </span>
              </div>

              <h1 className="text-2xl leading-8 font-black tracking-normal text-gray-900 sm:text-3xl dark:text-gray-100">
                {promo.productName}
              </h1>
              {promo.brandName ? <p className="mt-2 text-sm font-semibold text-gray-500">{promo.brandName}</p> : null}

              <div className="my-5 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/60 dark:bg-green-900/20">
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black tracking-normal text-gray-900 dark:text-gray-100">{newPrice || "Ver preco"}</span>
                  {oldPrice ? <span className="pb-1 text-base font-semibold text-gray-400 line-through">{oldPrice}</span> : null}
                </div>
                <p className="mt-2 text-base font-black text-green-700 dark:text-green-300">{savingsText(promo)}</p>
              </div>

              {promo.coupon ? (
                <div className="mb-4 rounded-lg border border-dashed border-green-300 bg-white p-4 dark:border-green-900/60 dark:bg-gray-900">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-black text-gray-900 dark:text-gray-100">Use o cupom</span>
                    <span className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-black tracking-wide text-white dark:bg-green-600">
                      {promo.coupon}
                    </span>
                  </div>
                </div>
              ) : null}

              {promo.purchaseInstructions ? (
                <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700/60 dark:bg-gray-900">
                  <h2 className="text-sm font-black text-gray-900 dark:text-gray-100">Como pegar</h2>
                  <p className="mt-1 text-sm leading-6 font-medium text-gray-600 dark:text-gray-300">{promo.purchaseInstructions}</p>
                </div>
              ) : null}

              <PromoMarketplaceLink
                href={`/api/promos/${promo.id}/go`}
                className="btn promo-pdp-cta w-full justify-center rounded-md bg-green-600 px-5 py-4 text-base font-black whitespace-nowrap text-white shadow-lg shadow-green-600/20 hover:bg-green-700"
                brandName={promo.brandName}
                category={promo.category}
                location="pdp"
                price={promo.newPrice}
                productName={promo.productName}
                promoId={promo.id}
              >
                Pegar promo agora
              </PromoMarketplaceLink>

              <p className="mt-3 text-center text-xs font-medium text-gray-400 dark:text-gray-500">
                Precos sujeitos a alteracao no marketplace.
              </p>
            </div>

            {/* Ads paused for now. Keep this slot for future Google Ads integration.
            <AdSlot placement="pdp-sidebar" compact />
            */}
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        {/* Ads paused for now. Keep this slot for future Google Ads integration.
        <AdSlot placement="pdp-before-related" compact />
        */}
        {related.length > 0 ? (
          <>
            <div className="mt-8 mb-4">
              <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">Outras promos ativas</h2>
              <p className="mt-1 text-sm font-medium text-gray-500">Nao deixe dinheiro na mesa: veja mais achados das ultimas 24h.</p>
            </div>
            <div className="grid grid-cols-12 gap-5">
              {related.map((item) => (
                <PromoCard key={item.id} promo={item} />
              ))}
            </div>
          </>
        ) : null}
      </section>
    </main>
  );
}
