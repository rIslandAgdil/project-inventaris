import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   try {
  //     const saved = localStorage.getItem("user");
  //     if (saved) setUser(JSON.parse(saved));
  //   } catch {}
  // }, []);
  const username = JSON.parse(localStorage.getItem("username")); // null if not logged in
  const token = JSON.parse(localStorage.getItem("token")); // null if not logged in
  const idUser = JSON.parse(localStorage.getItem("idUser")); // null if not logged in

  return (
    <AuthContext.Provider value={{ username, token, idUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// export function useAuth() {
//   return useContext(AuthContext);
// }

