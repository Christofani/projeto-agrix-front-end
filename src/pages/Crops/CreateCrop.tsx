import React, { useState, useEffect } from "react";
import api from "../../api"; // Importa a configuração do Axios
import { CreateCropType } from "../../types/CropType";
import { Farm } from "../../types/FarmType";

const CreateCrop: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [formData, setFormData] = useState<CreateCropType>({
    name: "",
    plantedArea: 0,
    plantedDate: "",
    harvestDate: "",
    farmId: 0,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await api.get<Farm[]>("/farms");
        setFarms(response.data);
      } catch (error) {
        console.error("Erro ao carregar as fazendas:", error);
      }
    };

    fetchFarms();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFarmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const farmId = Number(e.target.value);
    setFormData({ ...formData, farmId });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.farmId) {
      setMessage("❌ Por favor, selecione uma fazenda.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post(`/farms/${formData.farmId}/crops`, {
        ...formData,
      });

      setMessage(`✅ Plantação de ${response.data.name} criada com sucesso!`);

      setTimeout(() => {
        onCancel();
      }, 1000);

      setFormData({
        name: "",
        plantedArea: 0,
        plantedDate: "",
        harvestDate: "",
        farmId: 0,
      });
      console.log("Plantação criada com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao criar a plantação:", error);
      setMessage("❌ Erro ao criar plantação. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded-md shadow-md font-quicksand">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Criar Nova Plantação
      </h1>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-400 border-solid mb-4"></div>
          </div>
        </div>
      )}
      {message && <p className="mb-4 text-center">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="farm" className="block text-gray-700 font-medium">
            Selecione a Fazenda:
          </label>
          <select
            id="farm"
            name="farm"
            onChange={handleFarmChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Selecione uma fazenda</option>
            {farms.map((farm) => (
              <option key={farm.id} value={farm.id}>
                {farm.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Nome da Plantação:
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
          <label
            htmlFor="plantedArea"
            className="block text-gray-700 font-medium"
          >
            Área Plantada (hectares):
          </label>
          <input
            type="number"
            id="plantedArea"
            name="plantedArea"
            value={formData.plantedArea}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="plantedDate"
            className="block text-gray-700 font-medium"
          >
            Data de Plantio:
          </label>
          <input
            type="date"
            id="plantedDate"
            name="plantedDate"
            value={formData.plantedDate}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="harvestDate"
            className="block text-gray-700 font-medium"
          >
            Data de Colheita:
          </label>
          <input
            type="date"
            id="harvestDate"
            name="harvestDate"
            value={formData.harvestDate}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
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
            {isLoading ? "Criando..." : "Criar Plantação"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCrop;
