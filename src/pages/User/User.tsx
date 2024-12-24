import React, { useState } from 'react';
import api from '../../api'; // Configuração do Axios
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CreateUserPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'USER',
  });

  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Atualiza os campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Envia o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/persons', formData);
      setMessage('Usuário criado com sucesso!');
      console.log('Resposta:', response.data);

      setTimeout(() => {
        navigate('/login'); // Redireciona para a página de login
      }, 1000);
      // Reset do formulário
      setFormData({ username: '', password: '', role: 'USER' });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setMessage('Erro ao criar usuário. Tente novamente.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Criar Novo Usuário</h1>
      {message && <p className="mb-4 text-center">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium">
            Nome de Usuário:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
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
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-medium">
            Papel (Role):
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          >
            <option value="USER">Usuário</option>
            <option value="ADMIN">Administrador</option>
            <option value="MANAGER">Gerente</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Criar Usuário
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>Já é um usuário? <Link to="/login" className="text-blue-500 hover:underline">Clique aqui para entrar</Link></p>
      </div>
    </div>
  );
};

export default CreateUserPage;
