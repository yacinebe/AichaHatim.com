import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/client.js";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [checked, setChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    api.adminMe()
      .then(() => setIsAdmin(true))
      .catch(() => setIsAdmin(false))
      .finally(() => setChecked(true));
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin, checked }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
