"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useRef } from "react";

import { trackEvent } from "@/lib/analytics";
import { categories } from "@/lib/categories";
import type { FilterOptions, PromoFilters } from "@/lib/promos";

type FilterBarProps = {
  filters: PromoFilters;
  options: FilterOptions;
};

export default function FilterBar({ filters, options }: FilterBarProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const hasActiveFilters = Boolean(filters.q || filters.category || filters.brand);

  const submitFilters = () => {
    formRef.current?.requestSubmit();
  };

  const trackFilters = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("q") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const brand = String(formData.get("brand") || "").trim();

    trackEvent("promo_filter_submit", {
      brand: brand || null,
      category: category || null,
      has_search_term: Boolean(query),
      search_term: query || null,
    });

    if (query) {
      trackEvent("promo_search", {
        search_term: query,
      });
    }

    if (category) {
      trackEvent("promo_filter_category", {
        category,
      });
    }

    if (brand) {
      trackEvent("promo_filter_brand", {
        brand,
      });
    }
  };

  return (
    <form ref={formRef} action="/" onSubmit={trackFilters} className="border-y border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          <Link
            href="/"
            className={
              !filters.category
                ? "shrink-0 rounded-full bg-gray-950 px-4 py-2 text-sm font-black text-white dark:bg-green-500 dark:text-gray-950"
                : "shrink-0 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:border-gray-300 hover:text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
            }
          >
            Todas
          </Link>
          {categories.map((category) => {
            const params = new URLSearchParams();
            if (filters.q) params.set("q", filters.q);
            if (filters.brand) params.set("brand", filters.brand);
            params.set("category", category.value);

            return (
              <Link
                key={category.value}
                href={`/?${params.toString()}`}
                className={
                  filters.category === category.value
                    ? "shrink-0 rounded-full bg-gray-950 px-4 py-2 text-sm font-black text-white dark:bg-green-500 dark:text-gray-950"
                    : "shrink-0 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:border-gray-300 hover:text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                }
              >
                {category.label}
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.5fr_0.85fr_1fr_auto_auto]">
          <label className="relative">
            <span className="sr-only">Buscar promo</span>
            <svg
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 fill-current text-gray-400"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path d="M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14ZM7 2a5 5 0 1 0 0 10A5 5 0 0 0 7 2Zm8.707 12.293-2.82-2.82a8.05 8.05 0 0 1-1.414 1.414l2.82 2.82a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <input
              name="q"
              defaultValue={filters.q}
              className="form-input w-full rounded-md border-gray-200 bg-gray-50 py-2.5 pr-3 pl-9 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              placeholder="Buscar whey, creatina, tenis..."
              type="search"
            />
          </label>

          <label>
            <span className="sr-only">Categoria</span>
            <select
              name="category"
              defaultValue={filters.category || ""}
              onChange={submitFilters}
              className="form-select w-full rounded-md border-gray-200 bg-gray-50 py-2.5 text-sm font-semibold text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            >
              <option value="">Todas categorias</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Marca</span>
            <select
              name="brand"
              defaultValue={filters.brand || ""}
              onChange={submitFilters}
              className="form-select w-full rounded-md border-gray-200 bg-gray-50 py-2.5 text-sm font-semibold text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            >
              <option value="">Todas marcas</option>
              {options.brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </label>

          <button className="btn cursor-pointer justify-center rounded-md bg-gray-950 px-5 py-2.5 text-sm font-black text-white hover:bg-gray-800 dark:bg-green-500 dark:text-gray-950 dark:hover:bg-green-400" type="submit">
            Filtrar
          </button>
          {hasActiveFilters ? (
            <Link
              href="/"
              className="btn justify-center rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-600 hover:border-gray-300 hover:text-gray-950 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
            >
              Limpar
            </Link>
          ) : null}
        </div>
      </div>
    </form>
  );
}
