import Link from "next/link";

import AdSlot from "@/components/promos/ad-slot";
import FilterBar from "@/components/promos/filter-bar";
import PromoBrand from "@/components/promos/promo-brand";
import PromoCard from "@/components/promos/promo-card";
import PromoFooter from "@/components/promos/promo-footer";
import WhatsAppGroupButton from "@/components/promos/whatsapp-group-button";
import { hasDatabaseConfig } from "@/lib/db";
import { type FilterOptions, getFilterOptions, getPromos, type Promo, type PromoFilters } from "@/lib/promos";

const promosPerPage = 12;

type HomeProps = {
  searchParams: Promise<{
    brand?: string;
    category?: string;
    page?: string;
    q?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const filters: PromoFilters = {
    brand: params.brand,
    category: params.category,
    q: params.q,
  };
  const requestedPage = Math.max(1, Number.parseInt(params.page || "1", 10) || 1);

  let promos: Promo[] = [];
  let options: FilterOptions = { brands: [] };
  let databaseError = false;

  try {
    if (!hasDatabaseConfig()) {
      throw new Error("Database connection is not configured.");
    }

    [promos, options] = await Promise.all([getPromos(filters), getFilterOptions()]);
  } catch (error) {
    databaseError = true;
    if (hasDatabaseConfig()) {
      console.error("Failed to load promos from Postgres", error);
    }
  }

  const totalPages = Math.max(1, Math.ceil(promos.length / promosPerPage));
  const currentPage = Math.min(requestedPage, totalPages);
  const paginatedPromos = promos.slice((currentPage - 1) * promosPerPage, currentPage * promosPerPage);
  const pageStart = promos.length > 0 ? (currentPage - 1) * promosPerPage + 1 : 0;
  const pageEnd = Math.min(currentPage * promosPerPage, promos.length);
  const paginationStart = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, index) => paginationStart + index);
  const createPageHref = (page: number) => {
    const query = new URLSearchParams();

    if (filters.q) query.set("q", filters.q);
    if (filters.category) query.set("category", filters.category);
    if (filters.brand) query.set("brand", filters.brand);
    if (page > 1) query.set("page", String(page));

    const queryString = query.toString();
    return queryString ? `/?${queryString}` : "/";
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <PromoBrand />
          <WhatsAppGroupButton href={process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL} />
        </div>
      </header>

      <section className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-black uppercase text-gray-500 dark:text-gray-400">
              <span className="rounded-full bg-green-50 px-3 py-1 text-green-700 dark:bg-green-900/25 dark:text-green-300">Ultimas 24h</span>
              <span>Curadoria Promos Treino</span>
              <span>Preco e estoque mudam rapido</span>
            </div>
            <h1 className="text-3xl leading-tight font-black tracking-normal text-gray-950 sm:text-4xl dark:text-gray-50">
              Promos fitness boas o bastante para abrir agora.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 font-medium text-gray-600 dark:text-gray-300">
              Achados de suplemento, tenis, smartwatch e roupa de treino com desconto de verdade. Entrou promo boa, a gente coloca aqui antes de acabar.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-md border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-800 dark:bg-gray-900">
            <div className="flex min-h-24 flex-col items-center justify-center rounded-sm bg-white p-3 dark:bg-gray-950">
              <p className="text-2xl font-black tracking-normal text-gray-950 dark:text-gray-50">{promos.length}</p>
              <p className="mt-1 text-xs font-bold text-gray-500">ativas</p>
            </div>
            <div className="flex min-h-24 flex-col items-center justify-center rounded-sm bg-white p-3 dark:bg-gray-950">
              <p className="text-2xl font-black tracking-normal text-gray-950 dark:text-gray-50">{options.brands.length}</p>
              <p className="mt-1 text-xs font-bold text-gray-500">marcas</p>
            </div>
            <div className="flex min-h-24 flex-col items-center justify-center rounded-sm bg-white p-3 dark:bg-gray-950">
              <p className="text-2xl font-black tracking-normal text-green-700 dark:text-green-300">24h</p>
              <p className="mt-1 text-xs font-bold text-gray-500">janela</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-5 pb-4 sm:px-6 lg:px-8">
        {databaseError ? (
          <div className="rounded-md border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-bold text-yellow-900 dark:border-yellow-900/60 dark:bg-yellow-900/20 dark:text-yellow-200">
            Configure o Postgres no `.env` usando `DATABASE_URL` para carregar as promos reais de `promos_treino.promos`.
          </div>
        ) : null}
      </section>

      <FilterBar filters={filters} options={options} />

      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-gray-950 dark:text-gray-100">Promos para pegar agora</h2>
              <p className="mt-1 text-sm font-semibold text-gray-500">
                {promos.length > 0 ? `Mostrando ${pageStart}-${pageEnd} de ${promos.length} promos.` : "Ordenadas por relevancia, desconto e horario de entrada."}
              </p>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-red-100 bg-white px-3 py-2 text-sm font-black text-red-600 shadow-xs sm:flex dark:border-red-900/40 dark:bg-gray-900 dark:text-red-300">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Ao vivo nas ultimas 24h
            </div>
          </div>

          <AdSlot placement="plp-top" className="mb-5" compact />

          {promos.length > 0 ? (
            <>
              <div className="grid grid-cols-12 gap-5">
                {paginatedPromos.map((promo) => (
                  <PromoCard key={promo.id} promo={promo} />
                ))}
              </div>

              {totalPages > 1 ? (
                <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Paginacao de promos">
                  {currentPage > 1 ? (
                    <Link
                      href={createPageHref(currentPage - 1)}
                      className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700 shadow-xs hover:border-green-300 hover:text-green-700 dark:border-gray-700/60 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-green-700 dark:hover:text-green-300"
                    >
                      Anterior
                    </Link>
                  ) : (
                    <span className="rounded-md border border-gray-200 bg-white/60 px-3 py-2 text-sm font-bold text-gray-400 dark:border-gray-700/60 dark:bg-gray-800/60">
                      Anterior
                    </span>
                  )}

                  {pageNumbers.map((page) => (
                    <Link
                      key={page}
                      href={createPageHref(page)}
                      aria-current={page === currentPage ? "page" : undefined}
                      className={
                        page === currentPage
                          ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-black text-white shadow-xs dark:bg-green-500 dark:text-gray-950"
                          : "rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700 shadow-xs hover:border-green-300 hover:text-green-700 dark:border-gray-700/60 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-green-700 dark:hover:text-green-300"
                      }
                    >
                      {page}
                    </Link>
                  ))}

                  {currentPage < totalPages ? (
                    <Link
                      href={createPageHref(currentPage + 1)}
                      className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700 shadow-xs hover:border-green-300 hover:text-green-700 dark:border-gray-700/60 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-green-700 dark:hover:text-green-300"
                    >
                      Proxima
                    </Link>
                  ) : (
                    <span className="rounded-md border border-gray-200 bg-white/60 px-3 py-2 text-sm font-bold text-gray-400 dark:border-gray-700/60 dark:bg-gray-800/60">
                      Proxima
                    </span>
                  )}
                </nav>
              ) : null}
            </>
          ) : (
            <div className="rounded-md border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-950">
              <h3 className="mt-3 text-lg font-black text-gray-950 dark:text-gray-100">Nenhuma promo nesses filtros</h3>
              <p className="mt-1 text-sm font-semibold text-gray-500">Limpe a busca ou volte mais tarde para novos achados.</p>
              <Link href="/" className="btn mt-5 rounded-md bg-gray-950 px-4 py-2.5 text-sm font-black text-white hover:bg-gray-800">
                Ver todas
              </Link>
            </div>
          )}
        </div>
      </section>
      <PromoFooter />
    </main>
  );
}
