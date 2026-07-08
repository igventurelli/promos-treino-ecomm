type PromoImageProps = {
  src: string | null;
  alt: string;
};

export default function PromoImage({ src, alt }: PromoImageProps) {
  if (src) {
    return <img src={src} alt={alt} className="h-full w-full object-contain" loading="lazy" />;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
      <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.57 14.86a2.4 2.4 0 0 0-2.98.32l-8.77-8.77a2.4 2.4 0 1 0-3.39 3.39l8.77 8.77a2.4 2.4 0 1 0 3.39 3.39l.85-.85.42.42a1 1 0 0 0 1.41-1.41l-.42-.42.72-.72a2.4 2.4 0 0 0 0-3.4Zm-14.3-8.6a.4.4 0 0 1 .56 0l9.9 9.9-.56.57-9.9-9.9a.4.4 0 0 1 0-.57Zm10.74 14.29a.4.4 0 0 1-.56 0 .4.4 0 0 1 0-.57l2.12-2.12a.4.4 0 0 1 .57 0 .4.4 0 0 1 0 .56l-2.13 2.13ZM5.56 11.13l-1.7 1.7a2.4 2.4 0 1 0 3.4 3.39l1.7-1.7-1.42-1.41-1.7 1.7a.4.4 0 1 1-.57-.57l1.7-1.7-1.41-1.41Z" />
      </svg>
      <span className="text-xs font-semibold tracking-widest uppercase">Promo Fitness</span>
    </div>
  );
}
