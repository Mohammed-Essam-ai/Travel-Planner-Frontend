import { mockUser, validCredentials } from "../data/mockUsers";
import { read, write, delay } from "../utils/storage";

// TODO: Replace with real auth API.
export const login = async ({ email, password }) => {
  await delay(500);
  if (email.trim().toLowerCase() !== validCredentials.email || password !== validCredentials.password) {
    throw new Error("Invalid email or password. Try you@email.com / password123");
  }
  const user = read("tripmate:user", mockUser);
  write("tripmate:session", true);
  return user;
};
export const register = async ({ name, email }) => { await delay(500); const user = { ...mockUser, name, email }; write("tripmate:user", user); write("tripmate:session", true); return user; };
export const logout = () => write("tripmate:session", false);
export const getCurrentUser = () => (read("tripmate:session", false) ? read("tripmate:user", mockUser) : null);
export const updateUser = async (patch) => { await delay(250); const u = { ...read("tripmate:user", mockUser), ...patch }; write("tripmate:user", u); return u; };
