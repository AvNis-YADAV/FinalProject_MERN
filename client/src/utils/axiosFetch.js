import axios from "axios";
//axios
const axiosFetch = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default axiosFetch;
