import React, { useState, useEffect } from 'react';
import api from '../../api'; // Importa a configuração do Axios

interface Farm {
  id: number;
  name: string;
}

interface Crop {
  name: string;
  plantedArea: number;
  plantedDate: string;
  harvestDate: string;
}

const CreateCrop: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [formData, setFormData] = useState<Crop>({
    name: '',
    plantedArea: 0,
    plantedDate: '',
    harvestDate: '',
  });
  const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null); // Farm selecionada
  const [message, setMessage] = useState<string | null>(null);

  // Carrega as fazendas disponíveis para o select
  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await api.get<Farm[]>('/farms'); // Endpoint que retorna as fazendas
        setFarms(response.data);
      } catch (error) {
        console.error('Erro ao carregar as fazendas:', error);
      }
    };

    fetchFarms();
  }, []);

  // Atualiza os campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Atualiza a fazenda selecionada
  const handleFarmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFarmId(Number(e.target.value));
  };

  // Envia o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFarmId) {
      setMessage('Por favor, selecione uma fazenda.');
      return;
    }

    try {
      const response = await api.post(`/farms/${selectedFarmId}/crops`, formData);
      setMessage(`Plantação de ${response.data.name} criada com sucesso!`);
      setFormData({
        name: '',
        plantedArea: 0,
        plantedDate: '',
        harvestDate: '',
      });
    } catch (error) {
      console.error('Erro ao criar a plantação:', error);
      setMessage('Erro ao criar plantação. Tente novamente.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Criar Nova Plantação</h1>

      {/* Mensagem de erro ou sucesso */}
      {message && <p className="mb-4 text-center">{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Select de Fazendas */}
        <div className="mb-4">
          <label htmlFor="farm" className="block text-gray-700 font-medium">
            Selecione a Fazenda:
          </label>
          <select
            id="farm"
            name="farm"
            onChange={handleFarmChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Selecione uma fazenda</option>
            {farms.map((farm) => (
              <option key={farm.id} value={farm.id}>
                {farm.name}
              </option>
            ))}
          </select>
        </div>

        {/* Nome da plantação */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Nome da Plantação:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Área plantada */}
        <div className="mb-4">
          <label htmlFor="plantedArea" className="block text-gray-700 font-medium">
            Área Plantada (hectares):
          </label>
          <input
            type="number"
            id="plantedArea"
            name="plantedArea"
            value={formData.plantedArea}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Data de plantio */}
        <div className="mb-4">
          <label htmlFor="plantedDate" className="block text-gray-700 font-medium">
            Data de Plantio:
          </label>
          <input
            type="date"
            id="plantedDate"
            name="plantedDate"
            value={formData.plantedDate}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Data de colheita */}
        <div className="mb-4">
          <label htmlFor="harvestDate" className="block text-gray-700 font-medium">
            Data de Colheita:
          </label>
          <input
            type="date"
            id="harvestDate"
            name="harvestDate"
            value={formData.harvestDate}
            onChange={handleChange}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Botões de ação */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onCancel} // Chama a função onCancel ao clicar em "Cancelar"
            className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Criar Plantação
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCrop;
