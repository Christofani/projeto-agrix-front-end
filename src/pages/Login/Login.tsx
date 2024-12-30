import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import api from "../../api"; // Configuração do Axios

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Atualiza os campos de login
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Lógica para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Lógica para alternar o "remember me"
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  // Realiza a requisição de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", credentials);
      const { token } = response.data; // Assumindo que a resposta tem apenas o token

      // Armazena o token e o nome de usuário no localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", credentials.username); // Salva o nome de usuário que foi digitado

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true"); // Salva a opção "remember me"
      } else {
        localStorage.removeItem("rememberMe");
      }

      // Redireciona para a página principal ou a rota protegida
      navigate("/home"); // Substitua com a rota desejada
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMessage("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="bg-teal-100 min-h-screen flex items-center justify-center font-quicksand">
      {message && <p className="mb-4 text-center text-red-500">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white px-14 py-10 rounded-xl shadow-lg text-center w-96"
      >
        <h1 className="text-6xl mb-10">Sign In</h1>
        <fieldset className="mb-4">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
            className="w-full block bg-black rounded p-2 text-white"
          />
        </fieldset>
        <fieldset className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full block bg-black rounded p-2 text-white"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-teal-400"
              >
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path
                  fillRule="evenodd"
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5  text-teal-400"
              >
                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
              </svg>
            )}
          </button>
        </fieldset>
        <fieldset className="flex items-center justify-between mb-4 ">
          <label className="text-xs text-gray-400 cursor-pointer flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="mr-1 cursor-pointer accent-black"
            />
            Remember me
          </label>
        </fieldset>
        <button
          type="submit"
          className="w-full bg-teal-500 p-3 rounded-lg hover:bg-teal- hover:text-white shadow-md"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p>
            Não é usuário?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Criar usuário
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
