import axios from "./axios.js";

export const obtenerPedidos = (desde, hasta) => axios.get(`/obtener-pedidos/${desde}/${hasta}`);
export const obtenerPedido = (id) => axios.get(`/obtener-pedido/${id}`);

export const crearPedido = (pedido) => axios.post(`/crear-pedido`, pedido);
export const actualizarPedido = (id, pedido) => axios.post(`/actualizar-pedido/${id}`, pedido);

export const eliminarPedido = (id) => axios.delete(`/eliminar-pedido/${id}`);
