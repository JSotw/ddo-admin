import { createContext, useContext, useState, useEffect } from "react";
import { obtenerUsuarios } from "../api/apiUsuarios.js";

const UsuariosContext = createContext();

export const useUsuarios = () => {
  const context = useContext(UsuariosContext);

  if (!context) {
    throw new Error("useUsuarios debe usarse dentro de un UsuariosProvider");
  }

  return context;
};

export function UsuariosProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const getUsuarios = async () => {
    try {
      const res = await obtenerUsuarios();
      setUsuarios(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        getUsuarios,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
}
