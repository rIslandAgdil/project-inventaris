import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => ({
    username: JSON.parse(localStorage.getItem("username")),
    idUser: JSON.parse(localStorage.getItem("idUser")),
  }));

  return (
    <AuthContext.Provider value={{ ...auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
