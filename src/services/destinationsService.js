import { destinations, placeDetails } from "../data/destinations";
import { delay } from "../utils/storage";

// TODO: Replace the bodies below with real API requests.
export const getDestinations = async () => { await delay(); return destinations; };
export const getDestinationById = async (id) => { await delay(150); return destinations.find((d) => d.id === id) || null; };
export const getTopDestinations = async (prefs = {}) => {
  await delay(500);
  let list = [...destinations];
  if (prefs.interests?.length) list = list.filter((d) => d.categories.some((c) => prefs.interests.includes(c)));
  return (list.length ? list : destinations).sort((a, b) => b.rating - a.rating).slice(0, 6);
};
export const getPlaceDetails = async () => { await delay(200); return placeDetails; };
