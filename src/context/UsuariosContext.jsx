import { createContext, useContext, useState, useEffect } from "react";
import { obtenerUsuarios, eliminarUsuario, crearUsuario } from "../api/apiUsuarios.js";

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

  const postUsuario = async (body) => {
    try {
      const res = await crearUsuario(body);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUsuario = async (id) => {
    try {
      const res = await eliminarUsuario(id);
      if(res.status === 204) setUsuarios(usuarios.filter(usuarios => usuarios._id !== id))
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <UsuariosContext.Provider
      value={{
        usuarios,

        getUsuarios,
        postUsuario,
        deleteUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
}
