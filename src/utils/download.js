import { transportLabel } from "./trip";

export function downloadTripPlan(trip, itinerary = []) {
  const lines = [`TripMate – ${trip.destination}`, `${trip.days} days · ${trip.people} people · ${transportLabel[trip.transport] || ""}`, `Estimated cost: ${trip.cost}`, ""];
  itinerary.forEach((d) => { lines.push(`Day ${d.day}: ${d.title}`); d.activities.forEach((a) => lines.push(`  - ${a.period}: ${a.text}`)); lines.push(""); });
  if (trip.notes) lines.push(`Notes: ${trip.notes}`);
  const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: `${trip.destination.replace(/\s+/g, "-").toLowerCase()}-plan.txt` });
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
