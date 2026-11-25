import { Search } from "lucide-react";
import { Chip } from "../common/Common";
import { categories } from "../../data/destinations";

export default function DestinationFilters({ query, setQuery, category, setCategory, sort, setSort }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search destinations…" className="min-h-[48px] w-full rounded-full bg-white/90 py-3 pl-12 pr-4 shadow-md outline-none focus:ring-2 focus:ring-brand-blue" />
        </label>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort" className="min-h-[48px] rounded-full bg-white/90 px-5 shadow-md outline-none">
          <option value="rating">Top rated</option><option value="name">Name A–Z</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-2">{categories.map((c) => <Chip key={c} active={category === c} onClick={() => setCategory(c)}>{c}</Chip>)}</div>
    </div>
  );
}
