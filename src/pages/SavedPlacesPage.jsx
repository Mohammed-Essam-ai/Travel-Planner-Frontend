import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { getDestinations } from "../services/destinationsService";
import { SmartImage, Chip, Spinner, ErrorState, EmptyState } from "../components/common/Common";
import useFavorites from "../hooks/useFavorites";
import { useToast } from "../components/common/Toast";

const filters = ["All", "Beaches", "History", "Nature"];

export default function SavedPlacesPage() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cat, setCat] = useState("All");
  const fav = useFavorites();
  const toast = useToast();
  const load = () => { setLoading(true); setError(""); getDestinations().then(setAll).catch(() => setError("Couldn't load favorites.")).finally(() => setLoading(false)); };
  useEffect(load, []);
  const saved = useMemo(() => all.filter((d) => fav.ids.includes(d.id) && (cat === "All" || d.categories.includes(cat))), [all, fav.ids, cat]);

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <header><h1 className="text-3xl font-bold text-brand-ink sm:text-4xl">Favorites</h1><p className="text-slate-500">Destinations you saved for later.</p></header>
      <div className="flex flex-wrap gap-2">{filters.map((f) => <Chip key={f} active={cat === f} onClick={() => setCat(f)}>{f}</Chip>)}</div>
      {loading ? <Spinner /> : error ? <ErrorState message={error} onRetry={load} /> : saved.length === 0 ? (
        <EmptyState icon={Heart} title="Nothing saved yet" text="Tap the heart on any destination to save it here." action={<Link to="/explore" className="btn-primary">Explore destinations</Link>} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((d) => (
            <article key={d.id} className="overflow-hidden rounded-2xl bg-white shadow-card">
              <SmartImage src={d.image} gradient={d.gradient} alt={d.name} className="h-36">
                <button onClick={() => { fav.toggle(d.id); toast(`${d.name} removed from favorites`, "info"); }} aria-label={`Remove ${d.name} from favorites`} className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow"><Heart size={18} className="fill-pink-500 text-pink-500" /></button>
              </SmartImage>
              <div className="space-y-2 p-4">
                <Link to={`/explore/${d.id}`} className="text-lg font-semibold text-brand-ink hover:underline">{d.name}</Link>
                <p className="text-sm text-slate-500">{d.rating} rating</p>
                <div className="flex gap-2">{d.categories.map((c) => <span key={c} className="rounded-full bg-[#eef1ff] px-3 py-0.5 text-xs font-medium text-brand-indigo">{c}</span>)}</div>
                <div className="rounded-lg bg-[#eef1ff] py-2 text-center font-bold text-brand-indigo">{d.price}</div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
