import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Briefcase } from "lucide-react";
import useTrips from "../hooks/useTrips";
import TripCard from "../components/trips/TripCard";
import { Chip, Spinner, ErrorState, EmptyState } from "../components/common/Common";
import { useToast } from "../components/common/Toast";
import { downloadTripPlan } from "../utils/download";
import { getItinerary } from "../services/itineraryService";

const tabs = [["upcoming", "Upcoming"], ["past", "Past"], ["draft", "Drafts"]];

export default function MyTripsPage() {
  const { trips, loading, error, reload, remove } = useTrips();
  const toast = useToast();
  const [tab, setTab] = useState("upcoming");
  const [q, setQ] = useState("");
  const list = useMemo(() => trips.filter((t) => t.status === tab && t.destination.toLowerCase().includes(q.toLowerCase())), [trips, tab, q]);

  const download = async (t) => { downloadTripPlan(t, await getItinerary(t.id)); toast("Plan downloaded"); };
  const del = async (t) => { if (window.confirm(`Delete your trip to ${t.destination}?`)) { await remove(t.id); toast("Trip deleted", "info"); } };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div><h1 className="text-3xl font-bold text-brand-ink sm:text-4xl">My Trips</h1><p className="text-slate-500">Your saved plans in one place.</p></div>
        <Link to="/plan" className="btn-primary self-start"><Plus size={16} /> Plan new trip</Link>
      </header>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">{tabs.map(([k, l]) => <Chip key={k} active={tab === k} onClick={() => setTab(k)}>{l}</Chip>)}</div>
        <label className="relative sm:w-64"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search trips" className="min-h-[44px] w-full rounded-full bg-white/90 pl-10 pr-4 shadow outline-none focus:ring-2 focus:ring-brand-blue" /></label>
      </div>
      {loading ? <Spinner /> : error ? <ErrorState message={error} onRetry={reload} /> : list.length === 0 ? (
        <EmptyState icon={Briefcase} title={`No ${tab} trips`} text={q ? "No trips match your search." : "Plan a trip to see it here."} action={<Link to="/plan" className="btn-primary">Plan new trip</Link>} />
      ) : <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{list.map((t) => <TripCard key={t.id} trip={t} onDownload={download} onDelete={del} />)}</div>}
      <div className="flex flex-col items-start justify-between gap-3 rounded-2xl bg-[#eef1ff] p-5 sm:flex-row sm:items-center">
        <p><span className="mr-2">✨</span><strong>Need ideas?</strong> Get new recommendations for your next trip</p>
        <Link to="/recommendations" className="btn-primary">See recommendations</Link>
      </div>
    </div>
  );
}
