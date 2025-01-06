import React, { useState, useEffect } from "react";
import api from "../../api";
import { Farm, CreateFarmProps } from "../../types/FarmType";
import { PersonInfoDto } from "../../types/PersonType";
import { AxiosError } from "axios";

const CreateFarm: React.FC<CreateFarmProps> = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    size: 0,
    personId: 0, // Alterado para armazenar somente o personId
  });
  const [isLoading, setIsLoading] = useState(false);
  const [persons, setPersons] = useState<PersonInfoDto[]>([]);
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    console.log("User Role:", userRole); // Log da role para depuração

    // Carrega as pessoas apenas se o usuário for ADMIN ou MANAGER
    if (userRole === "ADMIN" || userRole === "MANAGER") {
      const fetchPersons = async () => {
        try {
          console.log("Iniciando a busca de pessoas...");
          const response = await api.get<PersonInfoDto[]>("/persons");
          console.log("Pessoas carregadas com sucesso:", response.data); // Verifique os dados
          setPersons(response.data);
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
        }
      };

      fetchPersons();
    } else {
      console.log("Usuário não tem permissão para carregar pessoas.");
    }
  }, [userRole]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(`Mudança no campo ${name}: ${value}`); // Verifique o valor aqui

    if (name === "personId") {
      setFormData({
        ...formData,
        personId: parseInt(value, 10), // Atualiza diretamente o personId
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário enviado com os dados:", formData);

    // Verifica se o usuário tem permissão para criar a fazenda
    if (userRole === "USER") {
      alert("❌ Você não tem permissão para criar fazendas.");
      console.log("Tentativa de criação de fazenda por usuário sem permissão.");
      return;
    }

    setIsLoading(true);
    console.log("Iniciando a criação da fazenda...");

    try {
      const response = await api.post<Farm>("/farms", formData);
      console.log("Fazenda criada com sucesso:", response.data);
      alert(`✅ Fazenda criada com sucesso! ID: ${response.data.id}`);
      setFormData({ name: "", size: 0, personId: 0 }); // Resetando os dados após envio
      onCancel();
    } catch (error) {
      console.error("Erro ao criar a fazenda:", error);
      if (error instanceof AxiosError && error.response) {
        alert(`❌ ${error.response.data?.message}`);
        console.log(
          "Mensagem de erro do servidor:",
          error.response.data?.message
        );
      } else {
        alert("❌ Erro inesperado ao criar a fazenda.");
        console.log("Erro inesperado ao criar a fazenda:", error);
      }
    } finally {
      setIsLoading(false);
      console.log("Processo de criação de fazenda finalizado.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Criar Nova Fazenda
      </h1>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-400 border-solid mb-4"></div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Nome da Fazenda:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="size" className="block text-gray-700 font-medium">
            Tamanho da Fazenda (hectares):
          </label>
          <input
            type="number"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {(userRole === "ADMIN" || userRole === "MANAGER") && (
          <div className="mb-4">
            <label htmlFor="person" className="block text-gray-700 font-medium">
              Proprietário da Fazenda:
            </label>
            <select
              id="person"
              name="personId" // Alterado para personId
              value={formData.personId}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Selecione um proprietário</option>
              {persons.map((person) => (
                <option key={person.personId} value={person.personId}>
                  {person.username}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-red-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? "Criando..." : "Criar Fazenda"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFarm;
