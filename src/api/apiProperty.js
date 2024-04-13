import axios from "./axios.js";

export const getPropertiesFront = () => axios.get(`/propiedades`);
export const getPropertyFront = (id) => axios.get(`/propiedad/${id}`);

export const getLastFourProperties = () => axios.get(`/last-four-properties`);




export const getPropertiesBack = () => axios.get(`/admin/propiedades`);
export const getPropertyBack = (id) => axios.get(`/admin/propiedad/${id}`);

export const createPropertyBack = (property) =>
  axios.post(`/admin/agregar-propiedad`, property);
export const updatePropertyBack = (property) =>
  axios.put(`/admin/editar-propiedad/${property._id}`, property);
export const deletePropertyBack = (id) =>
  axios.delete(`/admin/eliminar-propiedad/${id}`);

  
