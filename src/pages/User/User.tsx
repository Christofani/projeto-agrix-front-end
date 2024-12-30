import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Configuração do Axios
import { Link } from "react-router-dom";

const CreateUserPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "USER",
  });

  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Atualiza os campos do formulário
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Envia o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/persons", formData);
      setMessage("Usuário criado com sucesso!");
      console.log("Resposta:", response.data);

      setTimeout(() => {
        navigate("/login"); // Redireciona para a página de login
      }, 1000);
      // Reset do formulário
      setFormData({ username: "", password: "", role: "USER" });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      setMessage("Erro ao criar usuário. Tente novamente.");
    }
  };

  return (
    <div className="bg-teal-100 min-h-screen flex items-center justify-center font-quicksand">
      {message && <p className="mb-4 text-center text-red-500">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white px-14 py-10 rounded-xl shadow-lg text-center "
      >
        <h1 className="text-6xl mb-10">Criar Usuário</h1>
        <fieldset className="mb-4">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Nome de Usuário"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full block bg-black rounded p-2 text-white"
          />
        </fieldset>
        <fieldset className="mb-4">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha"
            required
            className="w-full block bg-black rounded p-2 text-white"
          />
        </fieldset>
        <fieldset className="mb-4">
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full block bg-black rounded p-2 text-white"
          >
            <option value="USER">Usuário</option>
            <option value="ADMIN">Administrador</option>
            <option value="MANAGER">Gerente</option>
          </select>
        </fieldset>
        <button
          type="submit"
          className="w-full bg-teal-500 p-3 rounded-lg hover:bg-teal-600 text-white shadow-md"
        >
          Criar Usuário
        </button>
        <div className="mt-4 text-center">
          <p>
            Já é um usuário?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Clique aqui para entrar
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;
