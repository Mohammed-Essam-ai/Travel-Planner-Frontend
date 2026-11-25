import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Briefcase, Heart, User, Users, Car, Bus, Train, Plane, Wand2, ArrowRight } from "lucide-react";
import Field from "../components/forms/Field";
import OptionButton from "../components/forms/OptionButton";
import { createTrip } from "../services/tripsService";
import { destinations } from "../data/destinations";
import { estimateCost } from "../utils/trip";
import { useToast } from "../components/common/Toast";

const tripTypes = [["Business", Briefcase], ["Couple", Heart], ["Solo", User], ["Family", Users]];
const transports = [["car", Car], ["bus", Bus], ["train", Train], ["plane", Plane]];
const interestsList = ["Nature", "History", "Beaches", "Shopping", "Culture"];
const budgets = [["Low", "($–$$)"], ["Medium", "($$$)"], ["High", "($$$$)"]];
const today = new Date().toISOString().slice(0, 10);

export default function TripPlannerPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [f, setF] = useState({ destinationId: "", departure: "", start: "", end: "", travelers: 2, tripType: "Family", transport: "plane", interests: [], budget: "Medium" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const toggleInterest = (i) => set("interests", f.interests.includes(i) ? f.interests.filter((x) => x !== i) : [...f.interests, i]);

  const validate = () => {
    const e = {};
    if (!f.destinationId) e.destinationId = "Choose a destination";
    if (f.departure.trim().length < 2) e.departure = "Enter your departure city";
    if (!f.start) e.start = "Pick a start date"; else if (f.start < today) e.start = "Start date can't be in the past";
    if (!f.end) e.end = "Pick an end date"; else if (f.start && f.end < f.start) e.end = "End date must be after start date";
    if (!(f.travelers >= 1 && f.travelers <= 20)) e.travelers = "1 to 20 travelers";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const create = async (e) => {
    e.preventDefault();
    if (!validate()) { toast("Please fix the highlighted fields", "error"); return; }
    setBusy(true);
    const d = destinations.find((x) => x.id === f.destinationId);
    const days = Math.max(1, Math.round((new Date(f.end) - new Date(f.start)) / 86400000) + 1);
    const trip = await createTrip({ destinationId: d.id, destination: d.name, days, people: Number(f.travelers), transport: f.transport, cost: estimateCost(days, f.travelers, f.budget), departure: f.departure, start: f.start, end: f.end, tripType: f.tripType, interests: f.interests });
    toast(`Trip to ${d.name} created`);
    navigate(`/trips/${trip.id}`);
  };
  const recommend = () => navigate("/recommendations", { state: { interests: f.interests } });
  const err = (k) => errors[k] ? "ring-2 ring-red-400" : "";

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_540px]">
      <section className="flex flex-col justify-center rounded-3xl bg-gradient-to-br from-[#5aa0e8] via-[#9cc7f2] to-[#f2d9a8] p-8 sm:p-12 lg:min-h-[600px]">
        <h1 className="text-4xl font-bold text-[#183057] sm:text-5xl">Where do you want to go?</h1>
        <p className="mt-5 text-xl text-[#183057]">Tell us your travel details, and we'll create the perfect trip for you!</p>
      </section>
      <form onSubmit={create} noValidate className="space-y-6 rounded-3xl bg-[#f8f8ff] p-5 shadow-card sm:p-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-brand-navy"><Sparkles className="text-amber-400" /> Your Travel Preferences</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Destination" error={errors.destinationId}>
            <select value={f.destinationId} onChange={(e) => set("destinationId", e.target.value)} className={`input !rounded-xl !bg-white ${err("destinationId")}`}><option value="">Select…</option>{destinations.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select>
          </Field>
          <Field label="Departure city" error={errors.departure}><input value={f.departure} onChange={(e) => set("departure", e.target.value)} placeholder="e.g. Cairo" className={`input !rounded-xl !bg-white ${err("departure")}`} /></Field>
          <Field label="Start date" error={errors.start}><input type="date" min={today} value={f.start} onChange={(e) => set("start", e.target.value)} className={`input !rounded-xl !bg-white ${err("start")}`} /></Field>
          <Field label="End date" error={errors.end}><input type="date" min={f.start || today} value={f.end} onChange={(e) => set("end", e.target.value)} className={`input !rounded-xl !bg-white ${err("end")}`} /></Field>
          <Field label="Travelers" error={errors.travelers}><input type="number" min="1" max="20" value={f.travelers} onChange={(e) => set("travelers", e.target.value)} className={`input !rounded-xl !bg-white ${err("travelers")}`} /></Field>
        </div>
        <div><h3 className="mb-2 text-lg font-semibold text-brand-deep">Trip Type</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{tripTypes.map(([n, Icon]) => <OptionButton key={n} selected={f.tripType === n} onClick={() => set("tripType", n)}><Icon size={20} />{n}</OptionButton>)}</div></div>
        <div><h3 className="mb-2 text-lg font-semibold text-brand-deep">Transportation</h3>
          <div className="grid grid-cols-4 gap-3">{transports.map(([n, Icon]) => <OptionButton key={n} selected={f.transport === n} onClick={() => set("transport", n)}><Icon size={24} /><span className="sr-only">{n}</span></OptionButton>)}</div></div>
        <div><h3 className="mb-2 text-lg font-semibold text-brand-deep">What do you like?</h3>
          <div className="flex flex-wrap gap-2">{interestsList.map((i) => <OptionButton key={i} selected={f.interests.includes(i)} onClick={() => toggleInterest(i)} className="!px-4">{i}</OptionButton>)}</div></div>
        <div><h3 className="mb-2 text-lg font-semibold text-brand-deep">Trip Budget <span className="text-sm font-normal text-slate-500">(Optional)</span></h3>
          <div className="grid grid-cols-3 gap-3">{budgets.map(([n, s]) => <OptionButton key={n} selected={f.budget === n} onClick={() => set("budget", n)}><span className="font-semibold">{n}</span><span className="text-xs opacity-80">{s}</span></OptionButton>)}</div></div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={recommend} className="btn-ghost flex-1 !rounded-xl !bg-[#8ec3ef] !text-white !border-0"><Wand2 size={18} /> Get Recommendations <ArrowRight size={16} /></button>
          <button disabled={busy} className="btn-primary flex-1">{busy ? "Creating…" : "Create trip"}</button>
        </div>
      </form>
    </div>
  );
}
