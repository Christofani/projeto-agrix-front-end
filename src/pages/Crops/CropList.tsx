import React, { useEffect, useState } from "react";
import api from "../../api"; // Configuração do Axios
import { Crop, CropListProps } from "../../types/CropType";
import { Farm } from "../../types/FarmType";

const CropList: React.FC<CropListProps> = ({ onNavigate }) => {
  const [crops, setCrops] = useState<Crop[]>([]); // Todas as plantações
  const [filteredCrops, setFilteredCrops] = useState<Crop[]>([]); // Plantações filtradas por data e/ou fazenda
  const [farms, setFarms] = useState<Farm[]>([]); // Fazendas para o filtro
  const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null); // ID da fazenda selecionada
  const [startDate, setStartDate] = useState<string>(""); // Data de início do filtro
  const [endDate, setEndDate] = useState<string>(""); // Data de fim do filtro
  const [loading, setLoading] = useState<boolean>(true); // Carregando dados
  const [error, setError] = useState<string | null>(null); // Mensagem de erro

  // Carregar as fazendas ao montar o componente
  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await api.get("/farms");
        setFarms(response.data);
      } catch (err) {
        console.error("Erro ao buscar as fazendas:", err);
        setError("Erro ao carregar as fazendas.");
      }
    };

    fetchFarms();
  }, []);

  // Carregar as plantações ao montar o componente
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await api.get("/crops");
        setCrops(response.data);
        setFilteredCrops(response.data); // Inicialmente, todas as plantações são exibidas
      } catch (err) {
        console.error("Erro ao buscar as plantações:", err);
        setError("Erro ao carregar as plantações.");
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  // Função para aplicar o filtro de data
  const handleDateFilter = async () => {
    if (!startDate || !endDate) {
      alert("Por favor, selecione um intervalo de datas.");
      return;
    }

    setLoading(true);
    try {
      const formattedStartDate = startDate;
      const formattedEndDate = endDate;

      const response = await api.get("/crops/search", {
        params: { start: formattedStartDate, end: formattedEndDate },
      });
      const filteredByDate = response.data;
      setCrops(filteredByDate);
      applyFarmFilter(filteredByDate); // Aplica o filtro de fazenda após o filtro de data
    } catch (err) {
      console.error("Erro ao filtrar plantações por data:", err);
      setError("Erro ao filtrar plantações por data.");
    } finally {
      setLoading(false);
    }
  };

  // Aplicar o filtro de fazenda
  const handleFarmChange = (farmId: number | null) => {
    setSelectedFarmId(farmId);
  };

  const applyFarmFilter = React.useCallback(
    (cropsList: Crop[]) => {
      if (selectedFarmId) {
        const farmFilteredCrops = cropsList.filter(
          (crop) => crop.farmId === selectedFarmId
        );
        setFilteredCrops(farmFilteredCrops);
      } else {
        setFilteredCrops(cropsList); // Se não houver fazenda selecionada, retorna todas
      }
    },
    [selectedFarmId]
  );

  // Filtrar plantações por fazenda
  useEffect(() => {
    applyFarmFilter(crops); // Sempre que o `selectedFarmId` mudar, o filtro de fazenda é aplicado
  }, [selectedFarmId, crops, applyFarmFilter]);

  // Resetar todos os filtros
  const resetFilters = async () => {
    setLoading(true);
    setStartDate("");
    setEndDate("");
    setSelectedFarmId(null);
    try {
      const response = await api.get("/crops");
      setCrops(response.data);
      setFilteredCrops(response.data);
    } catch (err) {
      console.error("Erro ao buscar as plantações:", err);
      setError("Erro ao carregar as plantações.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-600">Carregando plantações...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="p-4 md:p-2">
      <h1 className="text-2xl font-bold text-center mb-6">
        Lista de Plantações
      </h1>

      {/* Controles de filtros */}
      <div className="flex flex-col sm:flex-row justify-center gap-8 mb-6">
        {/* Filtro de fazenda */}
        <select
          value={selectedFarmId || ""}
          onChange={(e) => handleFarmChange(Number(e.target.value))}
          className="border p-2 rounded w-full sm:w-64 cursor-pointer"
        >
          <option value="" disabled className="text-gray-600">
            Selecione uma fazenda
          </option>
          {farms.map((farm) => (
            <option
              key={farm.id}
              value={farm.id}
              className="cursor-pointer hover:bg-teal-900 hover:text-white"
            >
              {farm.name}
            </option>
          ))}
        </select>

        {/* Filtro de intervalo de datas */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto ">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded w-full sm:w-64 hover:bg-gray-100 cursor-pointer"
          />
          <span className="mx-2 text-gray-600">até</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded w-full sm:w-64 hover:bg-gray-100 cursor-pointer"
          />
        </div>

        {/* Botão de aplicar filtro por data */}
        <button
          onClick={handleDateFilter}
          className="bg-teal-700 text-white px-4 py-2 rounded w-50 hover:bg-teal-900"
        >
          Filtrar por datas
        </button>

        {/* Botão de reset */}
        <button
          onClick={resetFilters}
          className="bg-teal-700 text-white px-4 py-2 rounded w-50 hover:bg-teal-900"
        >
          Todas as plantações
        </button>
      </div>

      {/* Exibir plantações filtradas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCrops.length > 0 ? (
          filteredCrops.map((crop) => (
            <div
              key={crop.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
              onClick={() => onNavigate(crop.id)}
            >
              <h3 className="text-xl font-bold text-gray-700">{crop.name}</h3>
              <p className="text-gray-600">
                Área plantada: {crop.plantedArea} hectares
              </p>
              <p className="text-gray-600">
                Data de plantio: {crop.plantedDate}
              </p>
              <p className="text-gray-600">
                Data de colheita: {crop.harvestDate}
              </p>
              <p className="text-gray-600">Fazenda associada: {crop.farmId}</p>
              <h4 className="font-semibold mt-4">Fertilizantes:</h4>
              {crop.fertilizers.length > 0 ? (
                <ul className="list-disc list-inside">
                  {crop.fertilizers.map((fertilizer) => (
                    <li key={fertilizer.id} className="text-gray-600">
                      {fertilizer.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Nenhum fertilizante associado.</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">
            Nenhuma plantação encontrada.
          </p>
        )}
      </div>
    </div>
  );
};

export default CropList;
