// Mock destinations. `gradient` is a graceful fallback when `image` fails to load.
export const destinations = [
  { id: "sharm", name: "Sharm El Sheikh", rating: 4.8, reviews: "312", categories: ["Beaches", "Nature"], price: "$420 – 600", gradient: "linear-gradient(180deg,#7fcbff,#1e8fc4)", image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=900&q=70", description: "Red Sea resort town famed for coral reefs, snorkeling and desert mountains.", duration: "3 days", location: "South Sinai" },
  { id: "cairo", name: "Cairo", rating: 4.7, reviews: "1.2K", categories: ["History", "Culture"], price: "$300 – 450", gradient: "linear-gradient(180deg,#8fb8f5,#fbe3a0 60%,#d9a441)", image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=900&q=70", description: "Egypt's vibrant capital, home to museums, bazaars and the Giza plateau.", duration: "2 days", location: "Cairo" },
  { id: "luxor", name: "Luxor", rating: 4.6, reviews: "8K", categories: ["History", "Nature"], price: "$350 – 500", gradient: "linear-gradient(180deg,#ffc08a,#e2a35a 70%,#c9873f)", image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=900&q=70", description: "The world's greatest open-air museum, with Karnak and the Valley of the Kings.", duration: "4 days", location: "Upper Egypt" },
  { id: "alexandria", name: "Alexandria", rating: 4.5, reviews: "2.1K", categories: ["Beaches", "Culture"], price: "$280 – 400", gradient: "linear-gradient(180deg,#9ccaff,#2f6ba3)", image: "https://images.unsplash.com/photo-1591785319393-3ac7b7ad8d56?w=900&q=70", description: "A Mediterranean port city layered with Greek, Roman and Islamic heritage.", duration: "2 days", location: "Mediterranean coast" },
  { id: "aswan", name: "Aswan", rating: 4.6, reviews: "3.4K", categories: ["Nature", "History"], price: "$330 – 480", gradient: "linear-gradient(180deg,#ffc08a,#d9945a 55%,#3c8ab0)", image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=900&q=70", description: "Nile islands, Nubian villages and the temple of Philae.", duration: "3 days", location: "Upper Egypt" },
  { id: "dahab", name: "Dahab", rating: 4.7, reviews: "2.8K", categories: ["Beaches", "Nature"], price: "$310 – 460", gradient: "linear-gradient(180deg,#8fe0f5,#2fc2c0 60%,#ecd9a0)", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=70", description: "A laid-back Sinai coast town loved by divers and freedivers.", duration: "3 days", location: "South Sinai" },
];

export const categories = ["All", "Beaches", "History", "Nature", "Culture"];

export const placeDetails = {
  id: "giza",
  name: "Pyramids of Giza",
  rating: 4.9,
  reviews: "50k",
  description: "The Great Pyramids are one of the seven wonders of the Ancient World, and a must-see in Egypt.",
  tags: ["History", "Culture", "Outdoor"],
  duration: "2-3 hours",
  price: "$15 per person",
  location: "Giza, Cairo",
  image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=1400&q=70",
  gradient: "linear-gradient(180deg,#5b8fd6,#e9c98a 70%,#c9983f)",
};
