import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Send, Compass, Heart, Briefcase, ArrowRight } from "lucide-react";
import { getDestinations } from "../services/destinationsService";
import DestinationCard from "../components/destinations/DestinationCard";
import TripCard from "../components/trips/TripCard";
import { Spinner, ErrorState, EmptyState } from "../components/common/Common";
import { useAuth } from "../hooks/useAuth";
import useFavorites from "../hooks/useFavorites";
import useTrips from "../hooks/useTrips";
import { useToast } from "../components/common/Toast";
import { downloadTripPlan } from "../utils/download";

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const fav = useFavorites();
  const { trips, remove, loading: tl } = useTrips();
  const [dest, setDest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  const load = () => { setLoading(true); setError(""); getDestinations().then(setDest).catch(() => setError("Couldn't load destinations.")).finally(() => setLoading(false)); };
  useEffect(load, []);
  const toggle = (d) => toast(fav.toggle(d.id) ? `${d.name} saved` : `${d.name} removed`, "info");
  const upcoming = trips.filter((t) => t.status === "upcoming").slice(0, 3);
  const actions = [
    { to: "/plan", label: "Plan a Trip", icon: Send }, { to: "/explore", label: "Explore", icon: Compass },
    { to: "/trips", label: "My Trips", icon: Briefcase }, { to: "/favorites", label: "Favorites", icon: Heart },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section>
        <h1 className="text-3xl font-bold text-brand-ink sm:text-4xl">Hello, {user.name.split(" ")[0]} 👋</h1>
        <p className="mt-1 text-slate-600">Where do you want to go next?</p>
        <form onSubmit={(e) => { e.preventDefault(); navigate(`/explore?q=${encodeURIComponent(q)}`); }} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1"><Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a destination, e.g. Luxor" className="min-h-[52px] w-full rounded-full bg-white py-3 pl-12 pr-4 shadow-md outline-none focus:ring-2 focus:ring-brand-blue" /></label>
          <button className="btn-primary !rounded-full px-8">Search</button>
        </form>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {actions.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} className="flex min-h-[64px] items-center gap-3 rounded-2xl bg-white/80 px-4 font-semibold text-brand-deep shadow-card hover:bg-white"><Icon size={22} className="text-brand-blue" />{label}</Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-bold text-brand-deep">Upcoming trips</h2><Link to="/trips" className="flex items-center gap-1 text-sm font-semibold text-brand-indigo">See all <ArrowRight size={16} /></Link></div>
        {tl ? <Spinner /> : upcoming.length === 0 ? <EmptyState icon={Briefcase} title="No upcoming trips" text="Plan your first trip and it will show up here." action={<Link to="/plan" className="btn-primary">Plan a trip</Link>} /> : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{upcoming.map((t) => <TripCard key={t.id} trip={t} onDownload={(x) => { downloadTripPlan(x); toast("Plan downloaded"); }} onDelete={async (x) => { await remove(x.id); toast("Trip deleted", "info"); }} />)}</div>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-bold text-brand-deep">Popular destinations</h2><Link to="/explore" className="flex items-center gap-1 text-sm font-semibold text-brand-indigo">Explore all <ArrowRight size={16} /></Link></div>
        {loading ? <Spinner /> : error ? <ErrorState message={error} onRetry={load} /> : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{dest.slice(0, 3).map((d) => <DestinationCard key={d.id} destination={d} favorite={fav.isFavorite(d.id)} onToggle={toggle} />)}</div>
        )}
      </section>

      <section className="rounded-3xl bg-white/80 p-6 shadow-card sm:p-8">
        <h2 className="text-2xl font-bold text-brand-deep">Travel inspiration</h2>
        <p className="mt-2 text-slate-600">Snorkel the Red Sea, watch sunrise over the Nile, or walk the temples of Luxor. Tell us what you like and we'll build the perfect trip.</p>
        <Link to="/plan" className="btn-primary mt-4">Get recommendations <ArrowRight size={16} /></Link>
      </section>
    </div>
  );
}
