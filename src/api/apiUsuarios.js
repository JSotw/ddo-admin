import axios from "./axios.js";

export const obtenerUsuarios = () => axios.get(`/obtener-usuarios`);

export const eliminarUsuario = (id) => axios.delete(`/eliminar-usuario/${id}`);


  
