import { Menu } from "lucide-react";
import { Logo } from "../common/Common";
import { useAuth } from "../../hooks/useAuth";

export default function MobileBar({ onMenu }) {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-[#2f66c2] px-4 py-3 lg:hidden">
      <button onClick={onMenu} aria-label="Open menu" className="flex h-11 w-11 items-center justify-center text-white"><Menu /></button>
      <Logo />
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-brand-indigo">{user?.name?.[0] || "T"}</div>
    </header>
  );
}
