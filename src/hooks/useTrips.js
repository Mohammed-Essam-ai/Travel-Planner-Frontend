import { useCallback, useEffect, useState } from "react";
import { getTrips, createTrip, deleteTrip, updateTrip } from "../services/tripsService";

export default function useTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try { setTrips(await getTrips()); } catch { setError("We couldn't load your trips."); }
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const add = async (data) => { const t = await createTrip(data); setTrips((p) => [t, ...p]); return t; };
  const remove = async (id) => { await deleteTrip(id); setTrips((p) => p.filter((t) => t.id !== id)); };
  const patch = async (id, p) => { const t = await updateTrip(id, p); setTrips((prev) => prev.map((x) => (x.id === id ? t : x))); };
  return { trips, loading, error, reload: load, add, remove, patch };
}
