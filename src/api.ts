import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Adiciona um interceptor para incluir o token no cabeçalho
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Obtém o token do localStorage ou outro método de armazenamento
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Define o token no cabeçalho Authorization
    }
    return config;
  },
  (error) => {
    // Lida com erros antes de enviar a requisição
    return Promise.reject(error);
  }
);

export default api;
