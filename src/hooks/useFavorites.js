import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useFavorites() {
  const [ids, setIds] = useLocalStorage("tripmate:favorites", ["sharm", "cairo", "luxor", "alexandria", "aswan", "dahab"]);
  const isFavorite = useCallback((id) => ids.includes(id), [ids]);
  const toggle = useCallback((id) => {
    let added = false;
    setIds((prev) => { added = !prev.includes(id); return prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]; });
    return added;
  }, [setIds]);
  return { ids, isFavorite, toggle };
}
