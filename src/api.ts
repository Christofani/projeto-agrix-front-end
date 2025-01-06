import axios from "axios";

const api = axios.create({
  // baseURL: "https://projeto-agrix.fly.dev",
    baseURL: "http://localhost:8080",

});

const getToken = () => localStorage.getItem("token");

api.interceptors.request.use(
  
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const initializeAuth = () => {
  const rememberMe = localStorage.getItem("rememberMe");
  const token = localStorage.getItem("token");

  if (rememberMe === "true" && token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
  }
};

export default api;
