import { createContext, useContext, useState, useEffect } from "react";
import { actualizarPedido, crearPedido, obtenerPedidos, obtenerPedido, eliminarPedido } from "../api/apiPedidos";
import { obtenerProductos, obtenerProducto, obtenerProductoCodigo } from "../api/apiProductos";
import { obtenerMediosPago } from "../api/apiPagos";


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
  const [productos, setProductos] = useState([]);
  const [recordsProductos, setRecordsProductos] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pedidoId, setPedidoId] = useState("");
  const [cliente, setCliente] = useState("");
  const [montoTotal, setMontoTotal] = useState(0);
  const [countDetalles, setCountDetalles] = useState(0);
  const [detalles, setDetalles] = useState([]);
  const [mediosPago, setMediosPago] = useState([]);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const getPedidos = async (desde, hasta, estado) => {
    try {
      const res = await obtenerPedidos(desde, hasta, estado);
      setLoading(false);
      setPedidos(res.data);
      setRecords(res.data);
    } catch (error) {
      setLoading(true);
      console.error(error);
    }
  };
  const getMediosPago = async () => {
    try {
      const res = await obtenerMediosPago();
      setLoading(false);
      setMediosPago(res.data);
    } catch (error) {
      setLoading(true);
      console.error(error);
    }
  };
  const getPedido = async (id) => {
    try {
      const res = await obtenerPedido(id);
      setLoading(false);
      setPedidos(res.data);
      setRecords(res.data);
    } catch (error) {
      setLoading(true);
      console.error(error);
    }
  };
  
  const postPedido = async (body) => {
    try {
      const res = await crearPedido(body);
      if(res.status === 200){
        setPedidoId(res.data._id);
        console.log("creado");
        console.log(res.data);
      }else{

      }
      return res;
    } catch (error) {
      return error;
    }
  };
  const putPedido = async (id, body) => {
    try {
      const res = await actualizarPedido(id, body);
      if(res.status === 200){
        console.log("actualizado");
        console.log(res.data);
      }
      return res;
    } catch (error) {
      return error;
    }
  };
  const getProductos = async () => {
    try {
      const res = await obtenerProductos();
      setLoading(false);
      setProductos(res.data);
      setRecordsProductos(res.data);
    } catch (error) {
      setLoading(true);
      return error;
    }
  };
  const getProducto = async (id) => {
    try {
      setRecordsProductos(productos.filter((prod) => prod._id === id));
    } catch (error) {
      setLoading(true);
      return error;
    }
  };
  const getProductoCodigo = async (codigo) => {
    try {
      setRecordsProductos(productos.filter((prod) => prod.codigo === codigo));
    } catch (error) {
      setLoading(true);
      return error;
    }
  };
  const deletePedido = async (id) => {
    try {
      const res = await eliminarPedido(id);
      if (res.status === 204){
        setPedidos(pedidos.filter((pedido) => pedido._id !== id));
        setRecords(records.filter((pedido) => pedido._id !== id));
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        loading,
        records,
        productos,
        recordsProductos,
        pedidoId,
        detalles,
        countDetalles,
        cliente,
        mediosPago,

        setRecords,
        setDetalles,
        setCountDetalles,
        setRecordsProductos,
        getPedidos,
        setCliente,
        setPedidoId,
        getPedido,
        postPedido,
        putPedido,
        deletePedido,
        getProductos,
        getProducto,
        getProductoCodigo,
        getMediosPago,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}
