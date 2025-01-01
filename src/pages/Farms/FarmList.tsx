import React, { useEffect, useState } from 'react';
import { Farm, FarmListProps } from "../../types/FarmType";
import api from "../../api"; // Configuração do Axios

const FarmList: React.FC<FarmListProps> = ({ onNavigate }) => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await api.get("/farms");
        setFarms(response.data);
      } catch (err) {
        console.error("Erro ao buscar as fazendas:", err);
        setError("Erro ao carregar as fazendas.");
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
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
      {farms.map((farm) => (
        <div
          key={farm.id}
          className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
          onClick={() => onNavigate(farm.id)}
        >
          <h3 className="text-xl font-bold text-gray-700">{farm.name}</h3>
          <p className="text-gray-600">Tamanho: {farm.size} hectares</p>
        </div>
      ))}
    </div>
  );
};

export default FarmList;
