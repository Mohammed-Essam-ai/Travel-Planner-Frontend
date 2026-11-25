import { Link } from "react-router-dom";
import { Download, Trash2 } from "lucide-react";
import { transportLabel } from "../../utils/trip";

export default function TripCard({ trip, onDownload, onDelete }) {
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-card">
      <div className="relative h-36 sm:h-40" style={{ background: trip.gradient }}>
        <span className="absolute left-4 top-4 rounded-full bg-[#fff0b8] px-3 py-1 text-xs font-semibold capitalize text-brand-ink">{trip.status}</span>
        <button onClick={() => onDelete(trip)} aria-label={`Delete ${trip.destination} trip`} className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-slate-600 hover:bg-white hover:text-red-600"><Trash2 size={16} /></button>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-xl font-bold text-brand-ink">{trip.destination}</h3>
          <p className="text-xs text-slate-500">{trip.days} days · {trip.people} people · {transportLabel[trip.transport]}</p>
        </div>
        <div className="rounded-lg bg-[#eef1ff] py-2 text-center font-bold text-brand-indigo">{trip.cost}</div>
        <div className="flex gap-2">
          <Link to={`/trips/${trip.id}`} className="btn-primary flex-1">View plan</Link>
          <button onClick={() => onDownload(trip)} className="btn-ghost"><Download size={16} /> Download</button>
        </div>
      </div>
    </article>
  );
}
