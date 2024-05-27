import axios from "./axios.js";

export const obtenerUsuarios = () => axios.get(`/obtener-usuarios`);

export const crearUsuario = (usuario) => axios.post(`/crear-usuario`, usuario);

export const eliminarUsuario = (id) => axios.delete(`/eliminar-usuario/${id}`);