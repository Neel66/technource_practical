import axios from "axios";

const BASE_URL = "http://localhost:5000/";
// create an axios instance
const service = axios.create({
  baseURL: BASE_URL,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default service;
