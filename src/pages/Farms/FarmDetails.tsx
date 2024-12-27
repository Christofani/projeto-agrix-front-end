import React, { useEffect, useState } from "react";
import { CreateFarm, Farm, FarmDetailsProps } from "../../types/FarmType";
import api from "../../api";

const FarmDetails: React.FC<FarmDetailsProps> = ({ farmId, onBack }) => {
  const [farm, setFarm] = useState<Farm | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<CreateFarm>({
    name: "",
    size: 0,
  });

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        const response = await api.get(`/farms/${farmId}`);
        setFarm(response.data);
        setFormData({ name: response.data.name, size: response.data.size });
      } catch (err) {
        console.error("Erro ao buscar a fazenda:", err);
        setError("Erro ao carregar a fazenda.");
      } finally {
        setLoading(false);
      }
    };

    fetchFarm();
  }, [farmId]);

  const handleDelete = async () => {
    try {
      await api.delete(`/farms/${farmId}`);
      alert("Fazenda excluída com sucesso.");
      onBack(); // Volta para a lista após excluir
    } catch (err) {
      console.error("Erro ao excluir a fazenda:", err);
      alert("Erro ao excluir a fazenda.");
    }
  };

  const handleEdit = async () => {
    try {
      await api.put(`/farms/${farmId}`, formData);
      alert("Fazenda atualizada com sucesso.");
      setEditing(false);
      setFarm({ ...farm!, ...formData }); // Atualiza os dados localmente
    } catch (err) {
      console.error("Erro ao editar a fazenda:", err);
      alert("Erro ao editar a fazenda.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Carregando fazenda...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!farm) {
    return <p className="text-center text-gray-600">Fazenda não encontrada.</p>;
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
        Detalhes da Fazenda
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
              Tamanho (hectares):
            </label>
            <input
              type="number"
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: Number(e.target.value) })
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
            <strong>Nome:</strong> {farm.name}
          </p>
          <p>
            <strong>Tamanho:</strong> {farm.size} hectares
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

export default FarmDetails;
