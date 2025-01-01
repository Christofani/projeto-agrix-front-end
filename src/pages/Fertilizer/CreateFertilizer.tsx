import React, { useState } from "react";
import { CreateFertilizerType, Fertilizer } from "../../types/FertilizerType";
import api from "../../api";

const CreateFertilizer: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const [formData, setFormData] = useState<CreateFertilizerType>({
    name: "",
    brand: "",
    composition: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post<Fertilizer>("/fertilizers", formData);

      // Mensagem de sucesso
      setMessage("✅ Fertilizante criado com sucesso!");
      setTimeout(() => {
        onCancel(); // Voltar para a página anterior
      }, 1000);

      // Limpar formulário
      setFormData({ name: "", brand: "", composition: "" });
    } catch (error) {
      console.error("Erro ao criar fertilizante:", error);
      setMessage("❌ Erro ao criar fertilizante. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded-md shadow-md font-quicksand">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Criar Novo Fertilizante
      </h1>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-400 border-solid mb-4"></div>
          </div>
        </div>
      )}

      {/* Mensagem de sucesso ou erro */}
      {message && <p className="mb-4 text-center">{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Nome do fertilizante */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Nome do Fertilizante:
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

        {/* Marca */}
        <div className="mb-4">
          <label htmlFor="brand" className="block text-gray-700 font-medium">
            Marca:
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Composição */}
        <div className="mb-4">
          <label
            htmlFor="composition"
            className="block text-gray-700 font-medium"
          >
            Composição:
          </label>
          <input
            type="text"
            id="composition"
            name="composition"
            value={formData.composition}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Botões de ação */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-red-500"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? "Criando..." : "Criar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFertilizer;
