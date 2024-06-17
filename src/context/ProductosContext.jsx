import { createContext, useContext, useState, useEffect } from "react";
import { 
  obtenerProductos,
  crearProducto,
  eliminarProducto,
  actualizarProducto,
  obtenerProducto
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
  const [agregados, setAgregados] = useState(1);
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
  //Obtiene un listado de todos los productos
  const getProductos = async () => {
    try {
      const res = await obtenerProductos();
      setLoading(false);
      setProductos(res.data);
      setRecords(res.data);
    } catch (error) {
      setLoading(true);
      return error;
    }
  };
  //Obtiene un producto en base al id
  const getProducto = async (id) => {
    try {
      const res = await obtenerProducto(id);
      return res.data;
    } catch (error) {
      return error;
    }
  };
  //Envía los datos de un producto para agregarlo como un registro nuevo
  const postProducto = async (body) => {
    try {
      const res = await crearProducto(body);
      return res;
    } catch (error) {
      return error;
    }
  };
  //Envía los datos de un producto para actualizarlo en base al id resibido
  const putProducto = async (id, body) => {
    try {
      const res = await actualizarProducto(id, body);
      return res;
    } catch (error) {
      return error;
    }
  };
  //Envía el id del producto a eliminar
  const deleteProducto = async (id) => {
    try {
      const res = await eliminarProducto(id);
      if (res.status === 204){
        setProductos(productos.filter((productos) => productos._id !== id));
        setProductos(records.filter((productos) => productos._id !== id));
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        //datos
        productos,
        loading,
        records,
        agregados,

        //métodos
        setAgregados,
        setRecords,
        getProductos,
        getProducto,
        postProducto,
        putProducto,
        deleteProducto
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}
