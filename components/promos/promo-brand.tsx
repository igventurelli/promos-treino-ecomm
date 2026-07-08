import Link from "next/link";

const logoUrl = "https://d2vw167ji09p5z.cloudfront.net/assets/promos-treino-logo_1000px_compressed.png";

export default function PromoBrand() {
  return (
    <Link href="/" className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
      <img src={logoUrl} alt="Promos Treino" className="h-10 w-10 rounded-lg object-contain" />
      <span className="text-lg leading-5 font-bold">Promos Treino</span>
    </Link>
  );
}
