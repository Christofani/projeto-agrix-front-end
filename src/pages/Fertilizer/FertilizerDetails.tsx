import React, { useEffect } from "react";
import {
  CreateFertilizerType,
  Fertilizer,
  FertilizerDetailsProps,
} from "../../types/FertilizerType";
import api from "../../api";

const FertilizerDetails: React.FC<FertilizerDetailsProps> = ({
  fertilizerId,
  onBack,
}) => {
  const [fertilizer, setFertilizer] = React.useState<Fertilizer | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [editing, setEditing] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<CreateFertilizerType>({
    name: "",
    brand: "",
    composition: "",
  });

  useEffect(() => {
    const fetchFertilizer = async () => {
      try {
        const response = await api.get(`/fertilizers/${fertilizerId}`);
        setFertilizer(response.data);
        setFormData({
          name: response.data.name,
          brand: response.data.brand,
          composition: response.data.composition,
        });
      } catch (error) {
        console.error("Erro ao buscar o fertilizante:", error);
        setError("Erro ao carregar o fertilizante.");
      } finally {
        setLoading(false);
      }
    };

    fetchFertilizer();
  }, [fertilizerId]);

  const handleDelete = async () => {
    try {
      await api.delete(`/fertilizers/${fertilizerId}`);
      alert("Fertilizante excluído com sucesso.");
      onBack(); // Volta para a lista após excluir
    } catch (err) {
      console.error("Erro ao excluir o fertilizante:", err);
      alert("Erro ao excluir o fertilizante.");
    }
  };

  const handleEdit = async () => {
    try {
      await api.put(`/fertilizers/${fertilizerId}`, formData);
      alert("Fertilizante atualizado com sucesso.");
      setEditing(false);
      setFertilizer({ ...fertilizer!, ...formData }); // Atualiza os dados localmente
    } catch (err) {
      console.error("Erro ao editar o fertilizante:", err);
      alert("Erro ao editar o fertilizante.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Carregando detalhes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!fertilizer) {
    return (
      <p className="text-center text-red-600">Fertilizante não encontrado.</p>
    );
  }

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded-md shadow-md font-quicksand">
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
        Detalhes do Fertilizante
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
            <label className="block font-medium mb-1">Marca:</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Composição:</label>
            <input
              type="text"
              value={formData.composition}
              onChange={(e) =>
                setFormData({ ...formData, composition: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleEdit}
              className="bg-green-500 text-white w-full max-w-xs sm:w-auto py-2 px-4 rounded-md hover:bg-green-600"
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
            <strong>Nome:</strong> {fertilizer.name}
          </p>
          <p>
            <strong>Marca:</strong> {fertilizer.brand}
          </p>
          <p>
            <strong>Composição:</strong> {fertilizer.composition}
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
export default FertilizerDetails;
