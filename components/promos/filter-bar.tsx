"use client";

import type { FormEvent } from "react";
import { useRef } from "react";

import { categories } from "@/lib/categories";
import { trackEvent } from "@/lib/analytics";
import type { FilterOptions, PromoFilters } from "@/lib/promos";

type FilterBarProps = {
  filters: PromoFilters;
  options: FilterOptions;
};

export default function FilterBar({ filters, options }: FilterBarProps) {
  const formRef = useRef<HTMLFormElement>(null);

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
    <form ref={formRef} action="/" onSubmit={trackFilters} className="rounded-lg border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-700/60 dark:bg-gray-800">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.5fr_0.9fr_1fr_auto]">
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
            className="form-input w-full rounded-md border-gray-200 py-2.5 pr-3 pl-9 text-sm dark:border-gray-700/60 dark:bg-gray-900"
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
            className="form-select w-full rounded-md border-gray-200 py-2.5 text-sm dark:border-gray-700/60 dark:bg-gray-900"
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
            className="form-select w-full rounded-md border-gray-200 py-2.5 text-sm dark:border-gray-700/60 dark:bg-gray-900"
          >
            <option value="">Todas marcas</option>
            {options.brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>

        <button className="btn cursor-pointer rounded-md bg-gray-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-gray-800 dark:bg-violet-500 dark:hover:bg-violet-600" type="submit">
          Filtrar
        </button>
      </div>
    </form>
  );
}
