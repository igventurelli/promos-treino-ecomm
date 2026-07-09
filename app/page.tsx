import AdSlot from "@/components/promos/ad-slot";
import FilterBar from "@/components/promos/filter-bar";
import PromoBrand from "@/components/promos/promo-brand";
import PromoCard from "@/components/promos/promo-card";
import { hasDatabaseConfig } from "@/lib/db";
import { getFilterOptions, getPromos, type FilterOptions, type Promo, type PromoFilters } from "@/lib/promos";
import Link from "next/link";

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
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <PromoBrand />
          <div className="hidden items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-bold text-green-800 sm:flex dark:border-green-900/60 dark:bg-green-900/20 dark:text-green-300">
            Promos das ultimas 24h
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-6 pb-4 sm:px-6 lg:px-8">
        {databaseError ? (
          <div className="mb-5 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-bold text-yellow-900 dark:border-yellow-900/60 dark:bg-yellow-900/20 dark:text-yellow-200">
            Configure o Postgres no `.env` usando `DATABASE_URL` para carregar as promos reais de `promos_treino.promos`.
          </div>
        ) : null}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <FilterBar filters={filters} options={options} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_300px] lg:px-8">
        <div>
          <div className="mb-5">
            <AdSlot placement="plp-top" compact />
          </div>

          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">Promos para pegar agora</h2>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {promos.length > 0 ? `Mostrando ${pageStart}-${pageEnd} de ${promos.length} promos.` : "Ordenadas por relevancia, desconto e horario de entrada."}
              </p>
            </div>
            <div className="hidden rounded-md bg-white px-3 py-2 text-sm font-bold text-red-600 shadow-xs sm:flex dark:bg-gray-800">
              {promos.length} ativas nas ultimas 24h
            </div>
          </div>

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
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700/60 dark:bg-gray-800">
              <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-gray-100">Nenhuma promo nesses filtros</h3>
              <p className="mt-1 text-sm font-medium text-gray-500">Limpe a busca ou volte mais tarde para novos achadinhos.</p>
              <a href="/" className="btn mt-5 rounded-md bg-gray-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-gray-800">
                Ver todas
              </a>
            </div>
          )}
        </div>
        <aside className="space-y-5">
          <AdSlot placement="plp-sidebar-top" />
          <AdSlot placement="plp-sidebar-bottom" />
        </aside>
      </section>
    </main>
  );
}
