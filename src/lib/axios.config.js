import axios from "axios";

const axiosPublic = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 5000,
});


const axiosPrivate = axios.create({
    baseURL:`${import.meta.env.VITE_API_BASE_URL}/api/v1`,
    headers:{
        Accept:"application/json",
    },
    timeout:5000,
});

axiosPrivate.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
requests, let the browser s      }
      // For FormData et multipart boundaries automatically
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      } else {
        config.headers["Content-Type"] = "application/json";
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  
  export { axiosPrivate, axiosPublic };


