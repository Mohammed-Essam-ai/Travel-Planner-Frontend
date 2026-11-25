import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Star, Pencil, ChevronRight } from "lucide-react";
import { getTopDestinations } from "../services/destinationsService";
import DestinationCard from "../components/destinations/DestinationCard";
import { Spinner, ErrorState } from "../components/common/Common";
import useFavorites from "../hooks/useFavorites";
import { useToast } from "../components/common/Toast";

export default function RecommendationsPage() {
  const { state } = useLocation();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fav = useFavorites();
  const toast = useToast();
  const load = () => { setLoading(true); setError(""); getTopDestinations(state || {}).then(setList).catch(() => setError("Couldn't load recommendations.")).finally(() => setLoading(false)); };
  useEffect(load, []); // eslint-disable-line

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-brand-deep sm:text-4xl"><Star className="fill-amber-300 text-amber-300" /> Top Destinations for You</h1>
          <p className="mt-1 text-lg text-brand-deep">Based on your preferences and travel details</p>
        </div>
        <Link to="/plan" className="flex min-h-[46px] items-center gap-2 self-start rounded-xl bg-[#faf9ff] px-5 text-sm font-medium text-[#4f477e] shadow-soft"><Pencil size={16} /> Change Preferences</Link>
      </header>
      {loading ? <Spinner label="Finding your best matches…" /> : error ? <ErrorState message={error} onRetry={load} /> : (
        <div className="relative grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((d, i) => <DestinationCard key={d.id} rank={i + 1} destination={d} favorite={fav.isFavorite(d.id)} onToggle={(x) => toast(fav.toggle(x.id) ? `${x.name} saved` : `${x.name} removed`, "info")} />)}
          <ChevronRight className="pointer-events-none absolute -right-3 top-1/3 hidden h-14 w-14 rounded-full bg-white p-3 shadow-soft xl:block" />
        </div>
      )}
    </div>
  );
}
