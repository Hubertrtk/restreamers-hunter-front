import axios from "axios";
const getBaseURL = () => {
  return "http://localhost:80";
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor requestu
api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default api;
