import { createContext } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const username = JSON.parse(localStorage.getItem("username")); // null if not logged in
  const token = JSON.parse(localStorage.getItem("token")); // null if not logged in
  const idUser = JSON.parse(localStorage.getItem("idUser")); // null if not logged in

  return (
    <AuthContext.Provider value={{ username, token, idUser }}>
      {children}
    </AuthContext.Provider>
  );
}
