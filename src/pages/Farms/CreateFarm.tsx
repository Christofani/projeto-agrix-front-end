import React, { useState } from "react";
import api from "../../api"; // Configuração do Axios
import { Farm, CreateFarmProps } from "../../types/FarmType";
import { AxiosError } from "axios";

const CreateFarm: React.FC<CreateFarmProps> = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    size: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Atualiza os campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Envia o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Ativa o spinner

    try {
      const response = await api.post<Farm>("/farms", formData);

      // Exibe mensagem de sucesso
      alert(`✅ Fazenda criada com sucesso! ID: ${response.data.id}`);

      // Limpa o formulário e volta para a lista
      setFormData({ name: "", size: 0 });
      onCancel();
    } catch (error) {
      console.error("Erro ao criar a fazenda:", error);

      // Acessa a resposta de erro vinda do backend
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error.response.data?.message;
        alert(`❌ ${errorMessage}`);
      } else {
        alert("❌ Erro inesperado ao criar a fazenda.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Criar Nova Fazenda
      </h1>

      {/* Spinner de carregamento */}
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
            placeholder="exemplo: 5.1"
          />
        </div>
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
