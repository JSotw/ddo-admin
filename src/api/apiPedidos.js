import axios from "./axios.js";

export const obtenerPedidos = (desde, hasta, estado = null) => {
    if(estado === null || estado === undefined)
        return axios.get(`/obtener-pedidos/${desde}/${hasta}`);
    else
        return axios.get(`/obtener-pedidos/${desde}/${hasta}?estado=${estado}`);
}
export const obtenerAllPedidos = () => axios.get(`/obtener-todos-pedidos`);
export const obtenerPedido = (id) => axios.get(`/obtener-pedido/${id}`);

export const crearPedido = (pedido) => axios.post(`/crear-pedido`, pedido);
export const actualizarPedido = (id, pedido) => axios.post(`/actualizar-pedido/${id}`, pedido);
export const actualizarEstadoPedido = (id, pedido) => axios.put(`/actualizar-estado-pedido/${id}`, pedido);

export const eliminarPedido = (id) => axios.delete(`/eliminar-pedido/${id}`);
