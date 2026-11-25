import { Navigate, Outlet } from "react-router-dom";
import { Plane } from "lucide-react";
import { SmartImage } from "../components/common/Common";
import { useAuth } from "../hooks/useAuth";

export default function AuthLayout() {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return (
    <div className="grid min-h-screen bg-gradient-to-b from-[#c3d6f5] to-[#3a72d6] lg:grid-cols-2 lg:p-2">
      <section className="hidden flex-col px-12 py-16 lg:flex xl:px-16">
        <div className="flex items-center gap-2 text-2xl font-bold text-brand-side"><Plane className="text-fuchsia-500" /> TripMate</div>
        <h1 className="mt-16 max-w-md text-5xl font-bold leading-tight text-brand-side">Where do you want to go ?</h1>
        <p className="mt-6 max-w-md text-2xl text-brand-side">Log in to pick up your trip plans and favorite destinations.</p>
        <SmartImage src="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=700&q=70" gradient="linear-gradient(180deg,#5b8fd6,#e9c98a)" className="mt-12 h-80 w-80 rounded-full shadow-2xl" />
      </section>
      <section className="flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-lg rounded-[30px] bg-[#f8faff] p-6 shadow-2xl sm:p-10"><Outlet /></div>
      </section>
    </div>
  );
}
