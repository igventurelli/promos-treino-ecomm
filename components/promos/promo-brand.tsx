import Link from "next/link";

const logoUrl = "https://d2vw167ji09p5z.cloudfront.net/assets/promos-treino-logo_1000px_compressed.png";

export default function PromoBrand() {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-3 text-gray-950 dark:text-gray-100">
      <img src={logoUrl} alt="Promos Treino" className="h-10 w-10 shrink-0 rounded-md object-contain ring-1 ring-gray-200 dark:ring-gray-700/70" />
      <span className="flex flex-col">
        <span className="text-lg leading-5 font-black">Promos Treino</span>
        <span className="hidden text-xs leading-4 font-semibold text-gray-500 sm:inline dark:text-gray-400">Promo boa pra treinar gastando menos</span>
      </span>
    </Link>
  );
}
