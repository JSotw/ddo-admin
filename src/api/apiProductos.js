import axios from "./axios.js";

export const obtenerProductos = () => axios.get(`/obtener-productos`);

export const crearProducto = (producto) => axios.post(`/crear-producto`, producto);

export const eliminarProducto = (id) => axios.delete(`/eliminar-producto/${id}`);
