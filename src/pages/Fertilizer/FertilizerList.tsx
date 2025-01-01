import React, { useEffect, useState } from "react";
import { Fertilizer, FertilizerListProps } from "../../types/FertilizerType";
import api from "../../api";

const FertilizerList: React.FC<FertilizerListProps> = ({ onNavigate }) => {
  const [fertilizers, setFertilizers] = useState<Fertilizer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFertilizers = async () => {
      try {
        const response = await api.get("/fertilizers");
        setFertilizers(response.data);
      } catch (err) {
        console.error("Erro ao buscar os fertilizantes:", err);
        setError("Erro ao carregar os fertilizantes.");
      } finally {
        setLoading(false);
      }
    };

    fetchFertilizers();
  }, []);

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-8 my-10">
      {fertilizers.map((fertilizer) => (
        <div
          key={fertilizer.id}
          className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
          onClick={() => onNavigate(fertilizer.id)}
        >
          <h3 className="text-xl font-bold text-gray-700">{fertilizer.name}</h3>
          <p className="text-gray-600">Marca: {fertilizer.brand}</p>
        </div>
      ))}
    </div>
  );
};

export default FertilizerList;
