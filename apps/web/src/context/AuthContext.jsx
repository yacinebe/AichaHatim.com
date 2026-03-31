import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [checked, setChecked] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    api.getMe()
      .then(setClient)
      .catch(() => setClient(null))
      .finally(() => setChecked(true));
  }, []);

  const logout = async () => {
    await api.logout();
    setClient(null);
  };

  return (
    <AuthContext.Provider value={{ client, setClient, checked, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
