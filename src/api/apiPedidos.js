import axios from "./axios.js";

export const obtenerPedidos = () => axios.get(`/obtener-pedidos`);

export const crearPedido = (pedido) => axios.post(`/crear-pedido`, pedido);

export const eliminarPedido = (id) => axios.delete(`/eliminar-pedido/${id}`);
