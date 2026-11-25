import { seedTrips } from "../data/trips";
import { read, write, delay } from "../utils/storage";
const KEY = "tripmate:trips";
const load = () => read(KEY, seedTrips);

// TODO: Replace with real API requests.
export const getTrips = async () => { await delay(); return load(); };
export const getTripById = async (id) => { await delay(150); return load().find((t) => t.id === id) || null; };
export const createTrip = async (trip) => {
  await delay(500);
  const created = { id: `t${Date.now()}`, status: "upcoming", gradient: "linear-gradient(180deg,#bcd3f2,#ffe8a3)", notes: "", ...trip };
  write(KEY, [created, ...load()]);
  return created;
};
export const updateTrip = async (id, patch) => { const next = load().map((t) => (t.id === id ? { ...t, ...patch } : t)); write(KEY, next); return next.find((t) => t.id === id); };
export const deleteTrip = async (id) => { write(KEY, load().filter((t) => t.id !== id)); };
