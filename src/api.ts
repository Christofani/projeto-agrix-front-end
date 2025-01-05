import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Função para obter o token do localStorage
const getToken = () => localStorage.getItem("token");

// Interceptor de requisição para adicionar o token ao cabeçalho
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

// Interceptor de resposta para lidar com erros de autenticação (401)
api.interceptors.response.use(
  (response) => response, // Retorna a resposta diretamente se não houver erros
  (error) => {
    if (error.response && error.response.status === 401) {
      // Remove o token inválido do localStorage
      localStorage.removeItem("token");

      // Opcional: Redireciona para a página de login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Lógica de persistência para "Remember Me"
export const initializeAuth = () => {
  const rememberMe = localStorage.getItem("rememberMe");
  const token = localStorage.getItem("token");

  if (rememberMe === "true" && token) {
    // Configura o token nos headers do Axios
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    // Remove o token do localStorage se "Remember Me" não estiver ativado
    localStorage.removeItem("token");
  }
};

export default api;
