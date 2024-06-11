import axios from "./axios.js";

export const reporteDiario = (desde, hasta) => axios.get(`/reporte-diario/${desde}/${hasta}`);
export const reportePorDia = (desde, hasta, groupBy="dia",fillEmpty=true) => axios.get(`/reporte-por-dia/${desde}/${hasta}?groupBy=${groupBy}&fillEmpty=${fillEmpty}`);