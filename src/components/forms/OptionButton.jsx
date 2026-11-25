import { Check } from "lucide-react";

export default function OptionButton({ selected, onClick, children, className = "" }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={selected}
      className={`relative flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition ${selected ? "bg-[#8ec3ef] text-white" : "bg-white text-[#2a7bd0] shadow-sm hover:bg-blue-50"} ${className}`}>
      {children}
      {selected && <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-brand-blue shadow"><Check size={12} /></span>}
    </button>
  );
}
