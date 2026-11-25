import { createContext, useContext, useState } from "react";
import * as userService from "../services/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => userService.getCurrentUser());
  const signIn = async (creds) => setUser(await userService.login(creds));
  const signUp = async (data) => setUser(await userService.register(data));
  const signOut = () => { userService.logout(); setUser(null); };
  const update = async (patch) => setUser(await userService.updateUser(patch));
  return <AuthContext.Provider value={{ user, signIn, signUp, signOut, update }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
