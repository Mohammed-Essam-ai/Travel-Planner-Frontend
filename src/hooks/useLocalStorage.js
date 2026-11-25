import { useState, useEffect } from "react";
import { read, write } from "../utils/storage";

export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => read(key, initial));
  useEffect(() => { write(key, value); }, [key, value]);
  return [value, setValue];
}
