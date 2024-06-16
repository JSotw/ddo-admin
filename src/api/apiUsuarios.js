import axios from "./axios.js";
// Peticiones a la API, usando axios
export const obtenerUsuarios = () => axios.get(`/obtener-usuarios`);

export const crearUsuario = (usuario) => axios.post(`/crear-usuario`, usuario);

export const obtenerUsuario = (id) => axios.get(`/obtener-usuario/${id}`,);
export const actualizarUsuario = (id, usuario) => axios.put(`/actualizar-usuario/${id}`, usuario);

export const eliminarUsuario = (id) => axios.delete(`/eliminar-usuario/${id}`);