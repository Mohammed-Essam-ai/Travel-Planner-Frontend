import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import { getDestinations } from "../services/destinationsService";
import DestinationCard from "../components/destinations/DestinationCard";
import DestinationFilters from "../components/destinations/DestinationFilters";
import { Spinner, ErrorState, EmptyState } from "../components/common/Common";
import useFavorites from "../hooks/useFavorites";
import { useToast } from "../components/common/Toast";

export default function ExplorePage() {
  const [params] = useSearchParams();
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("rating");
  const fav = useFavorites();
  const toast = useToast();

  const load = () => { setLoading(true); setError(""); getDestinations().then(setAll).catch(() => setError("Couldn't load destinations.")).finally(() => setLoading(false)); };
  useEffect(load, []);

  const list = useMemo(() => all
    .filter((d) => (category === "All" || d.categories.includes(category)) && d.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => (sort === "name" ? a.name.localeCompare(b.name) : b.rating - a.rating)), [all, query, category, sort]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header><h1 className="text-3xl font-bold text-brand-ink sm:text-4xl">Explore</h1><p className="text-slate-600">Find your next destination in Egypt.</p></header>
      <DestinationFilters {...{ query, setQuery, category, setCategory, sort, setSort }} />
      {loading ? <Spinner /> : error ? <ErrorState message={error} onRetry={load} /> : list.length === 0 ?
        <EmptyState icon={SearchX} title="No destinations found" text="Try a different search or category." action={<button className="btn-primary" onClick={() => { setQuery(""); setCategory("All"); }}>Reset filters</button>} /> : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((d) => <DestinationCard key={d.id} destination={d} favorite={fav.isFavorite(d.id)} onToggle={(x) => toast(fav.toggle(x.id) ? `${x.name} saved` : `${x.name} removed`, "info")} />)}</div>
      )}
    </div>
  );
}
