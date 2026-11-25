import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import MobileBar from "../components/navbar/MobileBar";
import { useAuth } from "../hooks/useAuth";

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const loc = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <MobileBar onMenu={() => setOpen(true)} />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <main className="page-bg min-w-0 flex-1 px-4 py-6 sm:px-8 lg:px-10 lg:py-9"><Outlet /></main>
    </div>
  );
}
