import axios from "./axios.js";


export const loginRequest = user => axios.post(`/login`, user);
export const recuperarDatos = user => axios.post(`/recuperar-datos`, user);

export const verifyTokenRequest = () => axios.get('/verify');