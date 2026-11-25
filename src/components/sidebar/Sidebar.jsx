import { NavLink, useNavigate } from "react-router-dom";
import { Home, Compass, Send, Briefcase, Heart, Settings, LogOut, X } from "lucide-react";
import { Logo } from "../common/Common";
import { useAuth } from "../../hooks/useAuth";

const links = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/plan", label: "Plan a Trip", icon: Send },
  { to: "/trips", label: "My Trips", icon: Briefcase },
  { to: "/favorites", label: "Favorites", icon: Heart },
  { to: "/profile", label: "Settings", icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-gradient-to-b from-[#3a72d0] to-[#2a5db5] p-4 transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-6 flex items-center justify-between px-2 pt-3">
          <Logo />
          <button className="text-white lg:hidden" onClick={onClose} aria-label="Close menu"><X /></button>
        </div>
        <nav className="flex flex-col gap-2">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={onClose}
              className={({ isActive }) => `flex min-h-[52px] items-center gap-3 rounded-2xl px-4 text-base font-medium transition ${isActive ? "bg-white text-brand-indigo shadow-soft" : "text-white/85 hover:bg-white/15"}`}>
              <Icon size={22} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto space-y-3">
          <button onClick={() => { signOut(); navigate("/login"); }} className="flex min-h-[44px] w-full items-center gap-3 rounded-2xl px-4 text-white/85 hover:bg-white/15"><LogOut size={20} /> Log out</button>
          <div className="rounded-2xl bg-white/20 p-4 text-sm text-white">Your next adventure is just a click away! ✨</div>
        </div>
      </aside>
    </>
  );
}
