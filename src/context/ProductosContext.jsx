import { createContext, useContext, useState, useEffect } from "react";
import { obtenerProductos } from "../api/apiProductos.js";

const ProductosContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductosContext);

  if (!context) {
    throw new Error("useProductos debe usarse dentro de un ProductosProvider");
  }

  return context;
};

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const getProductos = async () => {
    try {
      const res = await obtenerProductos();
      setProductos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        getProductos,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}
