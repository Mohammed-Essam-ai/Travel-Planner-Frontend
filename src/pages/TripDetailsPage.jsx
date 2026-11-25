import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Check, Download, Heart, CalendarDays, Users, Plane, Wallet, Hotel, Car, FerrisWheel, Lightbulb } from "lucide-react";
import { getTripById } from "../services/tripsService";
import { getItinerary, saveItinerary, getCostBreakdown } from "../services/itineraryService";
import { updateTrip } from "../services/tripsService";
import ItineraryDay from "../components/itinerary/ItineraryDay";
import { Spinner, ErrorState, EmptyState } from "../components/common/Common";
import { useToast } from "../components/common/Toast";
import { downloadTripPlan } from "../utils/download";
import { transportLabel } from "../utils/trip";

const costIcons = [Plane, Hotel, FerrisWheel, Car];

export default function TripDetailsPage() {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [costs, setCosts] = useState([]);
  const [notes, setNotes] = useState("");
  const [state, setState] = useState("loading");

  useEffect(() => {
    setState("loading");
    Promise.all([getTripById(id), getItinerary(id), getCostBreakdown()])
      .then(([t, it, c]) => { setTrip(t); setItinerary(it); setCosts(c); setNotes(t?.notes || ""); setState(t ? "ok" : "missing"); })
      .catch(() => setState("error"));
  }, [id]);

  if (state === "loading") return <Spinner />;
  if (state === "error") return <ErrorState message="Couldn't load this trip." onRetry={() => navigate(0)} />;
  if (state === "missing") return <EmptyState title="Trip not found" text="It may have been deleted." action={<Link to="/trips" className="btn-primary">Back to My Trips</Link>} />;

  const persist = (next) => { setItinerary(next); saveItinerary(id, next); };
  const add = (day, { period, text }) => { persist(itinerary.map((d) => d.day === day ? { ...d, activities: [...d.activities, { id: `a${Date.now()}`, period, text }] } : d)); toast("Activity added"); };
  const remove = (day, actId) => { persist(itinerary.map((d) => d.day === day ? { ...d, activities: d.activities.filter((a) => a.id !== actId) } : d)); toast("Activity removed", "info"); };
  const saveNotes = async () => { setTrip(await updateTrip(id, { notes })); toast("Notes saved"); };
  const toggleSave = async () => { const t = await updateTrip(id, { saved: !trip.saved }); setTrip(t); toast(t.saved ? "Trip saved" : "Trip unsaved", "info"); };
  const total = costs.reduce((s, c) => s + c.value, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <ol className="flex flex-wrap items-center justify-center gap-3 text-brand-side sm:gap-5" aria-label="Progress">
        {["Destinations", "Plan"].map((s) => <li key={s} className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-white"><Check size={18} /></span>{s}<span className="hidden h-px w-8 bg-slate-400 sm:block" /></li>)}
        <li className="flex items-center gap-2 font-medium"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue font-bold text-white">3</span>Your Trip</li>
      </ol>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr_300px]">
        <aside className="space-y-4 rounded-3xl bg-[rgba(63,129,234,0.2)] p-6 shadow-card">
          <h1 className="flex items-center gap-3 text-2xl font-bold text-brand-navy"><CalendarDays className="text-brand-blue" /> {trip.destination}</h1>
          <p className="flex items-center gap-3 text-lg text-brand-side"><Users className="text-orange-500" /> {trip.days} Day – {trip.people} People</p>
          <p className="flex items-center gap-3 text-lg text-brand-side"><Plane className="text-orange-500" /> {transportLabel[trip.transport]}</p>
          <p className="flex items-start gap-3 text-lg text-brand-side"><Wallet className="text-amber-500" /><span>Est. Cost<br /><strong className="text-2xl">{trip.cost}</strong></span></p>
          <button onClick={() => { downloadTripPlan(trip, itinerary); toast("Plan downloaded"); }} className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full bg-[#2022b0]/85 text-lg font-medium text-white shadow hover:bg-[#2022b0]"><Download size={20} /> Download Plan</button>
          <button onClick={toggleSave} className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full border border-[#2a61ba] bg-[#3271d7]/15 text-lg font-medium text-[#2a61ba]"><Heart size={20} className={trip.saved ? "fill-pink-500 text-pink-500" : ""} /> {trip.saved ? "Saved" : "Save Trip"}</button>
        </aside>

        <section className="space-y-4 rounded-3xl bg-white p-4 shadow-card sm:p-6">
          {itinerary.map((d) => <ItineraryDay key={d.day} day={d} onAdd={add} onRemove={remove} />)}
          <div>
            <h3 className="mb-2 text-lg font-bold">Notes</h3>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Add notes about this trip…" className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:ring-2 focus:ring-brand-blue" />
            <button onClick={saveNotes} className="btn-primary mt-2">Save notes</button>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-3xl bg-brand-pale p-6 shadow-card"><div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffe8a3]"><Wallet className="text-amber-700" /></span><h3 className="text-xl font-bold text-[#224a8a]">Estimated Cost</h3></div>
            <p className="mt-6 text-center text-3xl font-extrabold text-[#224a8a]">{trip.cost}</p><p className="text-center text-[#224a8a]">for {trip.people} people</p></div>
          <div className="rounded-3xl bg-brand-pale/40 p-6 shadow-card"><ul className="space-y-3 text-lg text-[#224a8a]">
            {costs.map((c, i) => { const Icon = costIcons[i]; return <li key={c.label} className="flex items-center justify-between"><span className="flex items-center gap-2"><Icon size={20} /> {c.label}</span><span>${c.value}</span></li>; })}
            <li className="flex justify-between border-t border-brand-blue/30 pt-2 font-bold"><span>Total</span><span>${total}</span></li></ul></div>
          <div className="rounded-3xl bg-gradient-to-b from-sky-100 to-amber-50 p-6 text-lg shadow-card"><Lightbulb className="mb-2 text-amber-400" /><strong>Trip:</strong><p className="text-[#224a8a]">Book in advance for better prices!</p></div>
        </aside>
      </div>
    </div>
  );
}
