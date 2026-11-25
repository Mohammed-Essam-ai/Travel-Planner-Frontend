# TripMate – React Travel Planner

A responsive travel planner UI built from the "Trip AI" Figma file.
Stack: React 19 · Vite · JavaScript (JSX) · Tailwind CSS 3 · React Router DOM · Lucide React.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

Demo login: `you@email.com` / `password123` (or create an account – any valid details work).

## Pages / routes

| Route | Page | Figma frame |
|---|---|---|
| `/login`, `/register` | Auth | login, create_account |
| `/` | Home dashboard | – (design system) |
| `/explore`, `/explore/:id` | Explore + destination detail | pg1 (Pyramids of Giza) |
| `/plan` | Trip planner form | TripMate — Plan a trip |
| `/recommendations` | Top destinations | Top destinations |
| `/trips`, `/trips/:id` | My Trips + trip details/itinerary | My Trips, pg 2 |
| `/favorites` | Saved places | Favorites |
| `/profile` | Settings | – (design system) |

## Structure

```
src/
  components/ common, navbar, sidebar, destinations, trips, itinerary, forms
  pages/      one file per route
  layouts/    MainLayout (sidebar), AuthLayout
  services/   async functions over mock data (swap for real API calls later)
  data/       destinations, trips, mock users
  hooks/      useTrips, useFavorites, useLocalStorage, useAuth
  utils/      storage, trip helpers, plan download
```

## Mock data → real API

Components never touch `data/` directly; they call `services/*`. Each service
function has a `TODO` where the real `fetch` call goes. Trips, itineraries, favorites,
user and session persist in `localStorage` (keys prefixed `tripmate:`).

## Images

Destination photos load from Unsplash URLs at runtime. If an image fails (offline,
blocked), cards fall back to a gradient matching the Figma artwork. To use the original
Figma photos, export them from Figma into `src/assets/images/` and update `image` in
`src/data/destinations.js`.
