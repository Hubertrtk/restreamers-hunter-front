import axios from "axios";
const getBaseURL = () => {
  //   return 'https://waftool-plc-01-b6f8g8e2fffwfjfp.polandcentral-01.azurewebsites.net'
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
