import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Farm } from '../../types/FarmType';

import api from '../../api'; // Configuração do Axios


const FarmDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [farm, setFarm] = useState<Farm | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        const response = await api.get(`/farms/${id}`);
        setFarm(response.data);
      } catch (err) {
        console.error('Erro ao buscar a fazenda:', err);
        setError('Erro ao carregar a fazenda.');
      } finally {
        setLoading(false);
      }
    };

    fetchFarm();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/farms/${id}`);
      alert('Fazenda excluída com sucesso.');
      navigate('/farms'); // Volta para a lista de fazendas
    } catch (err) {
      console.error('Erro ao excluir a fazenda:', err);
      alert('Erro ao excluir a fazenda.');
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/farms/${id}`, farm);
      alert('Fazenda atualizada com sucesso.');
    } catch (err) {
      console.error('Erro ao editar a fazenda:', err);
      alert('Erro ao editar a fazenda.');
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={() => navigate('/farms')}
        className="text-blue-500 hover:text-blue-700 flex items-center mb-6"
      >
        <span className="mr-2">&larr;</span> Voltar para fazendas
      </button>
      <h1 className="text-2xl font-bold mb-6 text-center">Detalhes da Fazenda</h1>
      <form onSubmit={handleEdit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Nome da Fazenda:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={farm.name}
            onChange={(e) => setFarm({ ...farm, name: e.target.value })}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="size" className="block text-gray-700 font-medium">
            Tamanho da Fazenda (hectares):
          </label>
          <input
            type="number"
            id="size"
            name="size"
            value={farm.size}
            onChange={(e) => setFarm({ ...farm, size: +e.target.value })}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Excluir
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default FarmDetails;
