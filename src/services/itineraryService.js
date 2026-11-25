import { defaultItinerary, costBreakdown } from "../data/trips";
import { read, write, delay } from "../utils/storage";
const key = (tripId) => `tripmate:itinerary:${tripId}`;

// TODO: Replace with real API requests.
export const getItinerary = async (tripId) => { await delay(250); return read(key(tripId), defaultItinerary); };
export const saveItinerary = async (tripId, itinerary) => { write(key(tripId), itinerary); return itinerary; };
export const getCostBreakdown = async () => { await delay(100); return costBreakdown; };
