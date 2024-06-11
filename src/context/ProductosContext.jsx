import { createContext, useContext, useState, useEffect } from "react";
import { 
  obtenerProductos,
  crearProducto,
  eliminarProducto
} from "../api/apiProductos.js";

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
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
      setProductos(res.data);
      setRecords(res.data);
    } catch (error) {
      setLoading(true);
      console.error(error);
    }
  };
  
  const postProducto = async (body) => {
    try {
      const res = await crearProducto(body);
      return res;
    } catch (error) {
      return error;
    }
  };
  const deleteProducto = async (id) => {
    try {
      const res = await eliminarProducto(id);
      if (res.status === 204)
        setProductos(productos.filter((productos) => productos._id !== id));
        setProductos(records.filter((productos) => productos._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        loading,
        records,
        setRecords,
        getProductos,
        postProducto,
        deleteProducto
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}
