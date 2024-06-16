import { createContext, useContext, useState, useEffect } from "react";


const PedidosContext = createContext();

export const usePedidos = () => {
  const context = useContext(PedidosContext);

  if (!context) {
    throw new Error("usePedidos debe usarse dentro de un PedidosProvider");
  }

  return context;
};

export function PedidosProvider({ children }) {
  const [pedidos, setPedidos] = useState([]);
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

  const getPedidos = async () => {
    try {
      const res = await obtenerPedidos();
      setLoading(false);
      setPedidos(res.data);
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
    <PedidosContext.Provider
      value={{
        pedidos,
        loading,
        records,
        setRecords,
        getPedidos,
        postProducto,
        deleteProducto
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}
