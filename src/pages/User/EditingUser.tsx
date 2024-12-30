import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // Configuração do Axios

const EditUserPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "USER",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de loading
  const [showPassword, setShowPassword] = useState(false); // Estado para controle de visibilidade da senha
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");

      if (!username || !token) {
        setMessage("Usuário não encontrado.");
        return;
      }

      try {
        setIsLoading(true);

        // Fazendo a requisição para pegar todos os usuários
        const response = await api.get("/persons", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Encontrar o usuário com o mesmo username
        const user = response.data.find(
          (user: { username: string }) => user.username === username
        );

        if (user) {
          // Armazenar o personId do usuário encontrado no localStorage
          localStorage.setItem("personId", user.personId.toString()); // Usando personId aqui
          setFormData(user); // Preencher o formulário com os dados do usuário
        } else {
          setMessage("Usuário não encontrado.");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        setMessage("Erro ao carregar dados do usuário.");
        setIsLoading(false);
      }
    };

    fetchUserId();
  }, []); // Executa apenas uma vez ao carregar o componente

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("personId"); // Usar personId aqui
      if (!userId) {
        setMessage("Usuário não encontrado.");
        return;
      }

      setIsLoading(true);
      await api.put(`/persons/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage("Usuário atualizado com sucesso!");
      setTimeout(() => navigate("/home"), 1000);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      setMessage("Erro ao atualizar usuário.");
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir este usuário?"
    );
    if (!confirmDelete) return;

    try {
      const userId = localStorage.getItem("personId"); // Usar personId aqui
      if (!userId) {
        setMessage("Usuário não encontrado.");
        return;
      }

      setIsLoading(true);
      await api.delete(`/persons/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage("Usuário excluído com sucesso!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      setMessage("Erro ao excluir usuário.");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-teal-100 min-h-screen flex items-center justify-center font-quicksand relative">
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-400 border-solid mb-4"></div>
            <p>Atualizando...</p>
          </div>
        </div>
      )}

      {/* A mensagem só será exibida se não estiver carregando */}
      {!isLoading && message && (
        <p className="mb-4 text-center text-red-500">{message}</p>
      )}

      {/* Botão para voltar para a home */}
      <button
        onClick={() => navigate("/home")}
        className="absolute top-5 left-5 text-teal-700 hover:text-teal-900 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 transition-transform transform hover:scale-125"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white px-14 py-10 rounded-xl shadow-lg text-center"
      >
        <h1 className="text-6xl mb-10">Editar Usuário</h1>

        {/* Campo de nome de usuário */}
        <fieldset className="mb-4">
          <label htmlFor="username" className="block text-left text-gray-600">
            Nome de Usuário
          </label>
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
        <fieldset className="mb-4 relative">
          <label htmlFor="password" className="block text-left text-gray-600">
            Nova Senha
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha"
            required
            className="w-full block bg-black rounded p-2 text-white"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-11 transform -translate-y-1/2 text-white"
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
                className="size-5 text-teal-400"
              >
                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 00 1 6.75 12Z" />
              </svg>
            )}
          </button>
        </fieldset>

        {/* Campo de seleção de papel */}
        <fieldset className="mb-4">
          <label htmlFor="role" className="block text-left text-gray-600">
            Nova Função
          </label>
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

        {/* Botão de atualização */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-500 p-3 rounded-lg hover:bg-teal-600 text-white shadow-md"
        >
          {isLoading ? "Atualizando..." : "Atualizar Usuário"}
        </button>

        {/* Botão de exclusão */}
        <button
          type="button"
          onClick={handleDelete}
          disabled={isLoading}
          className="w-full bg-red-500 p-3 rounded-lg hover:bg-red-600 text-white shadow-md mt-4"
        >
          {isLoading ? "Excluindo..." : "Excluir Usuário"}
        </button>
      </form>
    </div>
  );
};

export default EditUserPage;
