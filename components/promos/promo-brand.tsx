import Link from "next/link";

const logoUrl = "https://d2vw167ji09p5z.cloudfront.net/assets/promos-treino-logo_1000px_compressed.png";

export default function PromoBrand() {
  return (
    <Link href="/" className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
      <img src={logoUrl} alt="Promos Treino" className="h-10 w-10 rounded-lg object-contain" />
      <span className="flex flex-col">
        <span className="text-lg leading-5 font-bold">Promos Treino</span>
        <span className="text-xs leading-4 font-semibold text-gray-500 dark:text-gray-400">Grupo de promoções fitness</span>
      </span>
    </Link>
  );
}
