export const seedTrips = [
  { id: "t1", destinationId: "sharm", destination: "Sharm El Sheikh", days: 3, people: 2, transport: "plane", status: "upcoming", cost: "$480 – 620", gradient: "linear-gradient(180deg,#bcd3f2,#ffe8a3)", notes: "Bring reef-safe sunscreen." },
  { id: "t2", destinationId: "cairo", destination: "Cairo", days: 2, people: 2, transport: "car", status: "upcoming", cost: "$300 – 450", gradient: "linear-gradient(180deg,#bcd3f2,#ffe8a3)", notes: "" },
  { id: "t3", destinationId: "luxor", destination: "Luxor", days: 4, people: 3, transport: "train", status: "upcoming", cost: "$350 – 500", gradient: "linear-gradient(180deg,#bcd3f2,#ffe8a3)", notes: "" },
];

export const defaultItinerary = [
  { day: 1, title: "Arrive & Explore", activities: [
    { id: "a1", period: "Morning", text: "Arrival at Sharm El Sheikh" },
    { id: "a2", period: "Afternoon", text: "Visit Naama Bay" },
    { id: "a3", period: "Evening", text: "Enjoy the beach" } ] },
  { day: 2, title: "Nature & Adventure", activities: [
    { id: "a4", period: "Morning", text: "Visit Ras Mohamed National Park" },
    { id: "a5", period: "Afternoon", text: "Snorkeling & Diving" },
    { id: "a6", period: "Evening", text: "Relax at the resort" } ] },
  { day: 3, title: "Free Day & Departure", activities: [
    { id: "a7", period: "Morning", text: "Shopping in Soho Square" },
    { id: "a8", period: "Afternoon", text: "Prepare for departure" } ] },
];

export const costBreakdown = [
  { label: "Flights", value: 360 }, { label: "Hotel (3 night)", value: 180 },
  { label: "Activities", value: 40 }, { label: "Transport", value: 40 },
];
