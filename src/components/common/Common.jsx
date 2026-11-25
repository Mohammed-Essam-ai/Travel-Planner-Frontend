import { useState } from "react";
import { Loader2, Star, AlertTriangle } from "lucide-react";

// Image with a gradient fallback when the remote image fails
export function SmartImage({ src, gradient, alt = "", className = "", children }) {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: gradient }}>
      {!failed && <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" />}
      {children}
    </div>
  );
}
export const Spinner = ({ label = "Loading…" }) => (
  <div className="flex items-center justify-center gap-2 py-16 text-brand-deep"><Loader2 className="animate-spin" size={22} /> {label}</div>
);
export const EmptyState = ({ icon: Icon, title, text, action }) => (
  <div className="flex flex-col items-center rounded-3xl bg-white/70 px-6 py-14 text-center shadow-card">
    {Icon && <Icon size={40} className="mb-3 text-brand-blue" />}
    <h3 className="text-xl font-bold text-brand-deep">{title}</h3>
    <p className="mt-1 max-w-sm text-sm text-slate-500">{text}</p>
    {action && <div className="mt-5">{action}</div>}
  </div>
);
export const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center rounded-3xl bg-white/70 px-6 py-12 text-center shadow-card">
    <AlertTriangle size={36} className="mb-2 text-red-500" />
    <p className="font-semibold text-brand-deep">{message}</p>
    {onRetry && <button onClick={onRetry} className="btn-primary mt-4">Try again</button>}
  </div>
);
export const Rating = ({ value, reviews }) => (
  <div className="flex items-center gap-1.5 text-brand-deep">
    <Star size={20} className="fill-brand-blue text-brand-blue" />
    <span className="text-lg font-medium">{value}</span>
    {reviews && <span className="text-xs">({reviews} reviews)</span>}
  </div>
);
export const Chip = ({ children, active, onClick }) => (
  <button onClick={onClick} className={`min-h-[40px] rounded-full px-5 text-sm font-medium transition ${active ? "bg-brand-indigo text-white" : "bg-white/80 text-brand-indigo hover:bg-white"}`}>{children}</button>
);
export const Logo = ({ className = "", light = true }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg width="30" height="30" viewBox="0 0 24 24" fill="#6db8ff"><path d="M2 12 22 2l-6 20-4-8-10-2Z" /></svg>
    <span className={`text-2xl font-bold ${light ? "text-white" : "text-brand-ink"}`}>TripMate</span>
  </div>
);
