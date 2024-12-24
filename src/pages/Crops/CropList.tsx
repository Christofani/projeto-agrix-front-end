import React, { useEffect, useState } from 'react';
import api from '../../api'; // Configuração do Axios

interface Crop {
  id: number;
  name: string;
  plantedArea: number;
  plantedDate: string;
  harvestDate: string;
  farmId: number; // ID da fazenda associada à plantação
}

const CropList: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await api.get('/crops'); // Rota para obter todas as plantações
        setCrops(response.data);
      } catch (err) {
        console.error('Erro ao buscar as plantações:', err);
        setError('Erro ao carregar as plantações.');
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Carregando plantações...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      {crops.length > 0 ? (
        crops.map((crop) => (
          <div key={crop.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-700">{crop.name}</h3>
            <p className="text-gray-600">Área plantada: {crop.plantedArea} hectares</p>
            <p className="text-gray-600">Data de plantio: {crop.plantedDate}</p>
            <p className="text-gray-600">Data de colheita: {crop.harvestDate}</p>
            <p className="text-gray-600">Fazenda associada: {crop.farmId}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center">Nenhuma plantação cadastrada.</p>
      )}
    </div>
  );
};

export default CropList;
