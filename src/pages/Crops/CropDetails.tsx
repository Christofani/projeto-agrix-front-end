import React, { useEffect, useState } from "react";
import { CreateCropType, Crop, CropDetailsProps } from "../../types/CropType";
import { Fertilizer } from "../../types/FertilizerType";
import api from "../../api";
import { AxiosError } from "axios";

const CropDetails: React.FC<CropDetailsProps> = ({ cropId, onBack }) => {
  const [crop, setCrop] = useState<Crop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<CreateCropType>({
    name: "",
    plantedArea: 0,
    plantedDate: "",
    harvestDate: "",
    farmId: 0,
  });
  const [availableFertilizers, setAvailableFertilizers] = useState<
    Fertilizer[]
  >([]);
  const [selectedFertilizer, setSelectedFertilizer] = useState<number | null>(
    null
  );

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
          farmId: response.data.farmId,
        });
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const errorMessage = error.response.data as string;
          setError(errorMessage || "Erro ao carregar a plantação.");
        } else {
          console.error("Erro inesperado ao buscar a plantação:", error);
          setError("Erro inesperado ao carregar a plantação.");
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchFertilizers = async () => {
      try {
        const response = await api.get("/fertilizers");
        setAvailableFertilizers(response.data);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const errorMessage = error.response.data as string;
          alert(errorMessage || "Erro ao buscar fertilizantes.");
        } else {
          console.error("Erro inesperado ao buscar fertilizantes:", error);
          alert("Erro inesperado ao buscar fertilizantes.");
        }
      }
    };

    fetchCrop();
    fetchFertilizers();
  }, [cropId]);

  const handleDelete = async () => {
    try {
      await api.delete(`/crops/${cropId}`);
      alert("Plantação excluída com sucesso.");
      onBack();
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error.response.data as string;
        alert(errorMessage || "Erro ao excluir a plantação.");
      } else {
        console.error("Erro inesperado ao excluir a plantação:", error);
        alert("Erro inesperado ao excluir a plantação.");
      }
    }
  };

  const handleEdit = async () => {
    try {
      await api.put(`/crops/${cropId}`, formData);
      alert("Plantação atualizada com sucesso.");
      setEditing(false);
      setCrop((prev) => (prev ? { ...prev, ...formData } : null));
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error.response.data as string;
        alert(errorMessage || "Erro ao editar a plantação.");
      } else {
        console.error("Erro inesperado ao editar a plantação:", error);
        alert("Erro inesperado ao editar a plantação.");
      }
    }
  };

  const handleAssociateFertilizer = async () => {
    if (!selectedFertilizer) {
      alert("Selecione um fertilizante para associar.");
      return;
    }

    // Verificar se o fertilizante já está associado
    const isAlreadyAssociated = crop?.fertilizers.some(
      (fertilizer) => fertilizer.id === selectedFertilizer
    );

    if (isAlreadyAssociated) {
      alert("Este fertilizante já está associado a esta plantação.");
      return;
    }

    try {
      await api.post(`/crops/${cropId}/fertilizers/${selectedFertilizer}`);

      const associatedFertilizer = availableFertilizers.find(
        (fertilizer) => fertilizer.id === selectedFertilizer
      );

      if (associatedFertilizer) {
        setCrop((prev) =>
          prev
            ? {
                ...prev,
                fertilizers: [...prev.fertilizers, associatedFertilizer],
              }
            : null
        );
      }

      alert("Fertilizante associado com sucesso!");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error.response.data as string;
        alert(errorMessage || "Erro desconhecido.");
      } else {
        console.error(error);
        alert("Erro inesperado ao associar fertilizante.");
      }
    }
  };
  

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-400 border-solid"></div>
      </div>
    );
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
          <p>
            <strong>Fazenda associada:</strong> {crop.farmId}
          </p>
          <h2 className="mt-6 font-bold">Fertilizantes associados:</h2>
          {crop.fertilizers.length > 0 ? (
            <ul className="list-disc list-inside">
              {crop.fertilizers.map((fertilizer) => (
                <li key={fertilizer.id}>{fertilizer.name}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Nenhum fertilizante associado.</p>
          )}

          <h2 className="mt-6 font-bold">Associar fertilizante</h2>
          <div className="mt-2">
            <select
              value={selectedFertilizer || ""}
              onChange={(e) =>
                setSelectedFertilizer(Number(e.target.value) || null)
              }
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="" disabled>
                Selecione um fertilizante
              </option>
              {availableFertilizers.map((fertilizer) => (
                <option key={fertilizer.id} value={fertilizer.id}>
                  {fertilizer.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleAssociateFertilizer}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Associar Fertilizante
            </button>
          </div>

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
