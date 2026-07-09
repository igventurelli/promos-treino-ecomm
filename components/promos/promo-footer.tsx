import Link from "next/link";

export default function PromoFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white/80 dark:border-gray-700/60 dark:bg-gray-900/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs font-medium text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Promos Treino e uma vitrine independente de promocoes fitness. Precos, estoque e disponibilidade podem mudar no marketplace.</p>
        <nav className="flex shrink-0 items-center gap-4">
          <Link href="/privacidade" className="font-bold text-gray-700 hover:text-green-700 dark:text-gray-300 dark:hover:text-green-300">
            Privacidade
          </Link>
        </nav>
      </div>
    </footer>
  );
}
