import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; // Configuração do Axios

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Atualiza os campos de login
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Realiza a requisição de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', credentials);
      const { token } = response.data; // Assumindo que a resposta tem apenas o token

      // Armazena o token e o nome de usuário no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', credentials.username); // Salva o nome de usuário que foi digitado

      // Redireciona para a página principal ou a rota protegida
      navigate('/home'); // Substitua com a rota desejada

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMessage('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      {message && <p className="mb-4 text-center text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium">
            Nome de Usuário:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Fazer Login
        </button>
      </form>
    </div>
  );
};

export default Login;
