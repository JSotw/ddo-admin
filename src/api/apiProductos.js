import axios from "./axios.js";

export const obtenerProductos = () => axios.get(`/obtener-productos`);
export const obtenerProducto = (id) => axios.get(`/obtener-producto/${id}`,);
export const obtenerProductoCodigo = (codigo) => axios.get(`/obtener-prod-por-codigo/${codigo}`,);

export const crearProducto = (producto) => axios.post(`/crear-producto`, producto);
export const actualizarProducto = (id, producto) => axios.put(`/actualizar-producto/${id}`, producto);

export const eliminarProducto = (id) => axios.delete(`/eliminar-producto/${id}`);
