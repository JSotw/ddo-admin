import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:3000/api`,
  // baseURL: `https://shalom-propiedades-servidor.onrender.com/api`,
  withCredentials: true
})

export default instance;