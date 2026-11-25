import { Heart, Umbrella, Landmark, TreePine, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { SmartImage, Rating } from "../common/Common";

const catIcon = { Beaches: Umbrella, History: Landmark, Nature: TreePine, Culture: Building2 };

export default function DestinationCard({ destination: d, favorite, onToggle, rank }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-[#fdfcff] shadow-card transition hover:-translate-y-1">
      <SmartImage src={d.image} gradient={d.gradient} alt={d.name} className="h-48 sm:h-56">
        {rank && <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#0088ff] text-xl font-bold text-white">{rank}</span>}
        <button onClick={() => onToggle(d)} aria-label={favorite ? "Remove from favorites" : "Add to favorites"} aria-pressed={favorite}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/70 backdrop-blur transition hover:bg-white">
          <Heart size={22} className={favorite ? "fill-pink-500 text-pink-500" : "text-slate-600"} />
        </button>
      </SmartImage>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link to={`/explore/${d.id}`} className="text-2xl font-bold text-brand-deep hover:underline">{d.name}</Link>
        <Rating value={d.rating} reviews={d.reviews} />
        <div className="flex flex-wrap gap-4 text-sm text-brand-deep">
          {d.categories.map((c) => { const Icon = catIcon[c] || Landmark; return <span key={c} className="flex items-center gap-1.5"><Icon size={18} />{c}</span>; })}
        </div>
        <span className="mt-auto w-fit rounded-full bg-brand-sky px-5 py-2 text-xl font-semibold text-[#2282cb]">{d.price}</span>
      </div>
    </article>
  );
}
