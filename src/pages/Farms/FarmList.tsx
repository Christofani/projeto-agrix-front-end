import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Farm } from '../../types/FarmType';
import api from '../../api'; // Configuração do Axios


const FarmList: React.FC = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await api.get('/farms');
        setFarms(response.data);
      } catch (err) {
        console.error('Erro ao buscar as fazendas:', err);
        setError('Erro ao carregar as fazendas.');
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Carregando fazendas...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-8 my-10">
      {farms.length > 0 ? (
        farms.map((farm) => (
          <div
            key={farm.id}
            className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
            onClick={() => navigate(`/farms/${farm.id}`)} // Navega para os detalhes da fazenda
          >
            <h3 className="text-xl font-bold text-gray-700">{farm.name}</h3>
            <p className="text-gray-600">Tamanho: {farm.size} hectares</p>
          </div>
        ))
      ) : (
        <p className="flex items-center justify-center text-gray-600 text-center">
          Nenhuma fazenda cadastrada.
        </p>
      )}
    </div>
  );
};

export default FarmList;
