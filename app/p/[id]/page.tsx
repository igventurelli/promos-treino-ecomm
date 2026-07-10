import Link from "next/link";
import { notFound } from "next/navigation";

import AdSlot from "@/components/promos/ad-slot";
import PromoBrand from "@/components/promos/promo-brand";
import PromoCard from "@/components/promos/promo-card";
import PromoDetailViewTracker from "@/components/promos/promo-detail-view-tracker";
import PromoFooter from "@/components/promos/promo-footer";
import PromoImage from "@/components/promos/promo-image";
import PromoMarketplaceLink from "@/components/promos/promo-marketplace-link";
import PromoShareButton from "@/components/promos/promo-share-button";
import WhatsAppGroupButton from "@/components/promos/whatsapp-group-button";
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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <PromoDetailViewTracker brandName={promo.brandName} category={promo.category} price={promo.newPrice} productName={promo.productName} promoId={promo.id} />
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <PromoBrand />
          <div className="flex items-center gap-2">
            <Link href="/" className="btn rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
              Voltar
            </Link>
            <div className="hidden sm:block">
              <WhatsAppGroupButton href={process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL} />
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {!promo.isFresh ? (
          <div className="mb-5 rounded-md border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-bold text-yellow-900 dark:border-yellow-900/60 dark:bg-yellow-900/20 dark:text-yellow-200">
            Esta promo passou da janela de 24h. Veja as ofertas ativas no fim da pagina antes de decidir.
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_430px]">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="relative aspect-[4/3] bg-white dark:bg-gray-900">
                <PromoImage src={promo.imageUrl} alt={promo.productName} />
                <div className="absolute top-4 left-4 rounded-sm bg-red-600 px-3 py-1.5 text-sm font-black tracking-normal text-white uppercase shadow-sm">
                  {bestDiscountLabel(promo)}
                </div>
                <div className="absolute right-4 bottom-4 left-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-sm bg-gray-950/90 px-3 py-1.5 text-xs font-black text-white">{categoryLabel(promo.category)}</span>
                  <span className="rounded-sm bg-white/95 px-3 py-1.5 text-xs font-black text-gray-950 shadow-sm dark:bg-gray-950/95 dark:text-gray-100">{timeAgo(promo.createdAt)}</span>
                </div>
              </div>
            </div>

            {promo.purchaseInstructions ? (
              <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <h2 className="text-sm font-black text-gray-950 dark:text-gray-100">Como pegar essa promo</h2>
                <p className="mt-2 text-sm leading-6 font-medium text-gray-600 dark:text-gray-300">{promo.purchaseInstructions}</p>
              </div>
            ) : null}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-black tracking-normal text-gray-700 uppercase dark:bg-gray-800 dark:text-gray-200">
                  {categoryLabel(promo.category)}
                </span>
                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-black tracking-normal text-green-800 uppercase dark:bg-green-900/30 dark:text-green-300">
                  {relevanceScoreLabel(promo.relevanceScore)}
                </span>
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-black tracking-normal text-red-700 uppercase dark:bg-red-900/20 dark:text-red-300">
                  {timeAgo(promo.createdAt)}
                </span>
              </div>

              <h1 className="text-2xl leading-8 font-black tracking-normal text-gray-950 sm:text-3xl dark:text-gray-100">
                {promo.productName}
              </h1>
              {promo.brandName ? <p className="mt-2 text-sm font-bold text-gray-500 dark:text-gray-400">{promo.brandName}</p> : null}

              <div className="my-5 rounded-md bg-gray-50 p-4 dark:bg-gray-900">
                <p className="mb-2 text-xs font-black uppercase text-gray-500 dark:text-gray-400">Oferta selecionada</p>
                <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                  <span className="text-4xl leading-none font-black tracking-normal text-gray-950 dark:text-gray-100">{newPrice || "Ver preco"}</span>
                  {oldPrice ? <span className="pb-1 text-base font-semibold text-gray-500 line-through">{oldPrice}</span> : null}
                </div>
                <p className="mt-2 text-base font-black text-green-700 dark:text-green-300">{savingsText(promo)}</p>
              </div>

              {promo.coupon ? (
                <div className="mb-4 rounded-md border border-dashed border-green-300 bg-white p-4 dark:border-green-900/60 dark:bg-gray-900">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-black text-gray-950 dark:text-gray-100">Use o cupom</span>
                    <span className="rounded-sm bg-gray-950 px-3 py-1.5 text-sm font-black tracking-normal text-white dark:bg-green-600">
                      {promo.coupon}
                    </span>
                  </div>
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

              <PromoShareButton brandName={promo.brandName} category={promo.category} productName={promo.productName} promoId={promo.id} />

              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 text-center dark:border-gray-800">
                <div>
                  <p className="text-xs font-black text-gray-950 dark:text-gray-100">24h</p>
                  <p className="text-xs font-semibold text-gray-500">janela</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-950 dark:text-gray-100">Escolhido</p>
                  <p className="text-xs font-semibold text-gray-500">pelo grupo</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-950 dark:text-gray-100">Seguro</p>
                  <p className="text-xs font-semibold text-gray-500">via loja</p>
                </div>
              </div>

              <p className="mt-3 text-center text-xs font-semibold text-gray-400 dark:text-gray-500">Precos sujeitos a alteracao no marketplace.</p>
            </div>

          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <AdSlot placement="pdp-before-related" compact />
        {related.length > 0 ? (
          <>
            <div className="mt-8 mb-4">
              <h2 className="text-xl font-black text-gray-950 dark:text-gray-100">Outras promos ativas</h2>
              <p className="mt-1 text-sm font-semibold text-gray-500">Nao deixe dinheiro na mesa: veja mais achados das ultimas 24h.</p>
            </div>
            <div className="grid grid-cols-12 gap-5">
              {related.map((item) => (
                <PromoCard key={item.id} promo={item} />
              ))}
            </div>
          </>
        ) : null}
      </section>
      <PromoFooter />
    </main>
  );
}
