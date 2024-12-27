import React, { useEffect, useState } from "react";
import { CreateCrop, Crop, CropDetailsProps } from "../../types/CropType";
import api from "../../api";

const CropDetails: React.FC<CropDetailsProps> = ({ cropId, onBack }) => {
  const [crop, setCrop] = useState<Crop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<CreateCrop>({
    name: "",
    plantedArea: 0,
    plantedDate: "",
    harvestDate: "",
  });

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const response = await api.get(`/crops/${cropId}`);
        setCrop(response.data);
        setFormData({
          name: response.data.name,
          plantedArea: response.data.plantedArea,
          plantedDate: response.data.plantedDate,
          harvestDate: response.data.harvestDate,
        });
      } catch (error) {
        console.error("Erro ao buscar a plantação:", error);
        setError("Erro ao carregar a plantação.");
      } finally {
        setLoading(false);
      }
    };

    fetchCrop();
  }, [cropId]);

  const handleDelete = async () => {
    try {
      await api.delete(`/crops/${cropId}`);
      alert("PLantação excluída com sucesso.");
      onBack(); // Volta para a lista após excluir
    } catch (err) {
      console.error("Erro ao excluir a plantação:", err);
      alert("Erro ao excluir aplantação.");
    }
  };

  const handleEdit = async () => {
    try {
      await api.put(`/crops/${cropId}`, formData);
      alert("Plantação atualizada com sucesso.");
      setEditing(false);
      setCrop({ ...crop!, ...formData }); // Atualiza os dados localmente
    } catch (err) {
      console.error("Erro ao editar a plantação:", err);
      alert("Erro ao editar a plantação.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Carregando plantação...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!crop) {
    return (
      <p className="text-center text-gray-600">Plantação não encontrada.</p>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md font-quicksand">
      <button
        onClick={onBack}
        className="text-teal-700 hover:text-teal-900 flex items-center mb-6"
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
      <h1 className="text-2xl font-bold mb-6 text-center">
        Detalhes da plantação
      </h1>

      {editing ? (
        <div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Nome:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">
              Área plantada (hectares):
            </label>
            <input
              type="number"
              value={formData.plantedArea}
              onChange={(e) =>
                setFormData({ ...formData, plantedArea: +e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Data de plantio:</label>
            <input
              type="date"
              value={formData.plantedDate}
              onChange={(e) =>
                setFormData({ ...formData, plantedDate: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Data de colheita:</label>
            <input
              type="date"
              value={formData.harvestDate}
              onChange={(e) =>
                setFormData({ ...formData, harvestDate: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleEdit}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Salvar
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>
            <strong>Nome:</strong> {crop.name}
          </p>
          <p>
            <strong>Área plantada:</strong> {crop.plantedArea} hectares
          </p>
          <p>
            <strong>Data de plantio:</strong> {crop.plantedDate}
          </p>
          <p>
            <strong>Data de colheita:</strong> {crop.harvestDate}
          </p>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropDetails;
