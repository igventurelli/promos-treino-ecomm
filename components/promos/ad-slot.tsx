type AdSlotProps = {
  placement: string;
  compact?: boolean;
};

export default function AdSlot({ placement, compact = false }: AdSlotProps) {
  return (
    <aside
      className={`flex min-h-24 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white/70 px-4 text-center text-xs font-medium tracking-widest text-gray-400 uppercase dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-500 ${
        compact ? "min-h-16" : ""
      }`}
      data-ad-placement={placement}
      aria-label={`Espaco reservado para anuncio ${placement}`}
    >
      Publicidade
    </aside>
  );
}
