import React from "react";
import { CreateFertilizerType, Fertilizer } from "../../types/FertilizerType";
import api from "../../api";

const CreateFertilizer: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const [formData, setFormData] = React.useState<CreateFertilizerType>({
    name: "",
    brand: "",
    composition: "",
  });
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.post<Fertilizer>("/fertilizers", formData);
      setMessage("Fertilizante criado com sucesso!");
      setFormData({ name: "", brand: "", composition: "" });
      setError(null);
    } catch (error) {
      console.error("Erro ao criar fertilizante:", error);
      setError("Erro ao criar fertilizante.");
      setMessage(null);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded-md shadow-md font-quicksand">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Criar Novo Fertilizante
      </h1>

      {/* Mensagem de erro ou sucesso */}
      {message && <p className="mb-4 text-green-600 text-center">{message}</p>}
      {error && <p className="mb-4 text-red-600 text-center">{error}</p>}

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
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFertilizer;
