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
    <div className="p-4 md:p-2">
      <h1 className="text-2xl font-bold text-center mb-6">Lista de Fazendas</h1>
      {farms.length === 0 ? (
        // Centraliza a mensagem e o botão
        <div className="flex justify-center items-center flex-col space-y-4 mt-10">
          <p className="text-center font-semibold text-lg text-gray-700">
            Não há fazendas cadastradas. Crie uma nova fazenda
          </p>
          <button
            onClick={() => onNavigate()} // Chama onNavigate para ir para a criação
            className="bg-teal-700 text-white py-2 px-6 rounded-md hover:bg-teal-600"
          >
            Criar nova Fazenda
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {farms.map((farm) => (
            <div
              key={farm.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
              onClick={() => onNavigate(farm.id)} // Passa o farmId para navegação
            >
              <h3 className="text-xl font-bold text-gray-700">{farm.name}</h3>
              <p className="text-gray-600">Tamanho: {farm.size} hectares</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmList;
