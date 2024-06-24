import axios from "./axios.js";

export const obtenerMediosPago = () => axios.get(`/obtener-medios-pago`);
