import axios from "axios";

const instance = axios.create({
  // baseURL: `http://localhost:3000/api`,
  baseURL: `https://ddo-server.onrender.com/api`,
  withCredentials: true
})

export default instance;