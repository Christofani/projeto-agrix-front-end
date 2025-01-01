import React, { useState } from "react";
import api from "../../api"; // Configuração do Axios
import { Farm, CreateFarmProps } from "../../types/FarmType";

const CreateFarm: React.FC<CreateFarmProps> = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    size: 0,
  });
  const [message, setMessage] = useState<string | null>(null);
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
      await api.post<Farm>("/farms", formData);

      // Mensagem de sucesso com emoji
      setMessage("✅ Fazenda criada com sucesso!");
      setTimeout(() => {
        setMessage(null);
        onCancel();
      }, 2000);

      // Limpa o formulário
      setFormData({ name: "", size: 0 });
    } catch (error) {
      console.error("Erro ao criar a fazenda:", error);

      // Mensagem de erro com emoji
      setMessage("❌ Erro ao criar fazenda. Tente novamente.");
    } finally {
      setIsLoading(false);
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

      {/* Mensagem de erro ou sucesso */}
      {message && <p className="mb-4 text-center">{message}</p>}

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
