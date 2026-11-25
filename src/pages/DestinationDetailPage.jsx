import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Clock, UserCheck, MapPin, Plus } from "lucide-react";
import { getDestinationById, getPlaceDetails } from "../services/destinationsService";
import { SmartImage, Spinner, ErrorState, EmptyState } from "../components/common/Common";
import useFavorites from "../hooks/useFavorites";
import useTrips from "../hooks/useTrips";
import { useToast } from "../components/common/Toast";
import { estimateCost } from "../utils/trip";

export default function DestinationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const fav = useFavorites();
  const { add } = useTrips();
  const [d, setD] = useState(null);
  const [place, setPlace] = useState(null);
  const [state, setState] = useState("loading");

  useEffect(() => {
    setState("loading");
    Promise.all([getDestinationById(id), getPlaceDetails()]).then(([dest, p]) => { setD(dest); setPlace(p); setState(dest ? "ok" : "missing"); }).catch(() => setState("error"));
  }, [id]);

  if (state === "loading") return <Spinner />;
  if (state === "error") return <ErrorState message="Couldn't load this destination." />;
  if (state === "missing") return <EmptyState title="Destination not found" text="It may have been removed." action={<Link to="/explore" className="btn-primary">Back to Explore</Link>} />;

  const addToPlan = async () => {
    const t = await add({ destinationId: d.id, destination: d.name, days: 3, people: 2, transport: "plane", cost: estimateCost(3, 2, "Medium") });
    toast(`${d.name} added to your plan`); navigate(`/trips/${t.id}`);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <SmartImage src={d.image} gradient={d.gradient} alt={d.name} className="h-64 rounded-t-[30px] sm:h-96">
        <button onClick={() => navigate(-1)} aria-label="Back" className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#183057]/80 text-white"><ArrowLeft /></button>
        <button onClick={() => toast(fav.toggle(d.id) ? "Saved to favorites" : "Removed from favorites", "info")} aria-label="Favorite" className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/50"><Heart className={fav.isFavorite(d.id) ? "fill-pink-500 text-pink-500" : "text-white"} /></button>
      </SmartImage>
      <div className="-mt-6 rounded-[30px] bg-[#f5f5f5] p-5 shadow-card sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <h1 className="text-3xl font-bold text-brand-navy sm:text-5xl">{d.name}</h1>
            <p className="mt-2 text-brand-navy"><span className="font-bold">★ {d.rating}</span> ({d.reviews} reviews)</p>
            <p className="mt-4 text-lg font-medium text-brand-navy sm:text-2xl">{d.description}</p>
            <div className="mt-5 flex flex-wrap gap-3">{d.categories.map((c) => <span key={c} className="rounded-full bg-[#3f81ea]/35 px-5 py-2 font-bold text-brand-blue">{c}</span>)}</div>
          </div>
          <div className="flex h-44 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-100 to-sky-200 text-brand-deep shadow-md"><MapPin size={44} /><span className="ml-2 font-semibold">{place.location}</span></div>
        </div>
        <h2 className="mt-8 text-2xl font-bold text-brand-navy">Visit Info</h2>
        <div className="mt-3 flex flex-col gap-4 text-lg font-medium text-brand-blue sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <span className="flex items-center gap-2"><Clock /> {d.duration}</span>
            <span className="flex items-center gap-2"><UserCheck /> {d.price}</span>
            <span className="flex items-center gap-2"><MapPin /> {d.location}</span>
          </div>
          <button onClick={addToPlan} className="rounded-3xl bg-brand-royal px-8 py-5 text-xl font-bold text-white shadow-soft hover:opacity-90"><Plus className="mr-1 inline" /> Add to plan</button>
        </div>
      </div>
    </div>
  );
}
