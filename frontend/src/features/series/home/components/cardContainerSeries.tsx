import type { Serie } from '@/entities/serie/model/serie';
import CardSerie from './cardSerie';

type Props = {
  title?: string;
  series: Serie[];
};

export default function CardContainerSeries({ title, series }: Props) {
  return (
    <section className="p-6 border rounded-2xl border-zinc-800 bg-zinc-950/60">
      {title && <h2 className="mb-4 text-xl font-semibold">{title}</h2>}

      {series.length === 0 ? (
        <p className="text-zinc-400">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {series.map((serie) => (
            <CardSerie key={serie.id} serie={serie} />
          ))}
        </div>
      )}
    </section>
  );
}