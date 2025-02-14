import React, { useEffect, useState } from "react";
import api from "../../api";
import { Crop, CropListProps } from "../../types/CropType";
import { Farm } from "../../types/FarmType";

const CropList: React.FC<CropListProps> = ({ onNavigate }) => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [filteredCrops, setFilteredCrops] = useState<Crop[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [hasCrops, setHasCrops] = useState<boolean>(false);
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
      }
    };

    fetchFarms();
  }, []);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await api.get("/crops");
        const cropsData = response.data;
        setCrops(cropsData);
        setFilteredCrops(cropsData);
        setHasCrops(cropsData.length > 0);
      } catch (err) {
        console.error("Erro ao buscar as plantações:", err);
        setError("Erro ao carregar as plantações.");
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

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
      applyFarmFilter(filteredByDate);
    } catch (err) {
      console.error("Erro ao filtrar plantações por data:", err);
      setError("Erro ao filtrar plantações por data.");
    } finally {
      setLoading(false);
    }
  };

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
        setFilteredCrops(cropsList);
      }
    },
    [selectedFarmId]
  );

  useEffect(() => {
    applyFarmFilter(crops);
  }, [selectedFarmId, crops, applyFarmFilter]);

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
      <h1 className="text-2xl font-bold text-center mb-6">
        Lista de Plantações
      </h1>

      {!hasCrops ? (
        <div className="flex flex-col items-center justify-center space-y-4 mt-10">
          <p className="text-lg font-semibold text-gray-700 text-center">
            Não há plantações cadastradas. Crie uma nova plantação.
          </p>
          <button
            onClick={() => onNavigate()}
            className="bg-teal-700 text-white px-4 py-2 rounded w-50 hover:bg-teal-900"
          >
            Criar Nova Plantação
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center gap-10 mb-6 sm:flex-col sm:w-full md:flex-col md:w-full lg:flex-row lg:w-full">
            <div className="flex flex-col gap-2 w-full sm:flex-row sm:gap-4 sm:w-auto md:flex-row md:w-full lg:w-65">
              <select
                value={selectedFarmId || ""}
                onChange={(e) => handleFarmChange(Number(e.target.value))}
                className="border p-2 rounded w-full cursor-pointer sm:w-64 md:w-1/2 lg:w-1/3"
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

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 rounded w-full hover:bg-gray-100 cursor-pointer sm:w-64 md:w-1/2 lg:w-1/3"
              />
              <span className="mx-1 text-gray-600">até</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 rounded w-full hover:bg-gray-100 cursor-pointer sm:w-64 md:w-1/2 lg:w-1/3"
              />
            </div>

            <div className="flex flex-col gap-2 w-full sm:flex-row sm:w-auto md:flex-row lg:w-35">
              <button
                onClick={handleDateFilter}
                className="bg-teal-700 text-white px-4 py-2 rounded w-50 hover:bg-teal-900 sm:w-1/2 md:w-1/2 lg:w-1/2"
              >
                Filtrar por datas
              </button>

              <button
                onClick={resetFilters}
                className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-900 sm:w-1/2 md:w-1/2 lg:w-1/2"
              >
                Todas as plantações
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCrops.length > 0 ? (
              filteredCrops.map((crop) => (
                <div
                  key={crop.id}
                  className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
                  onClick={() => onNavigate(crop.id)}
                >
                  <h3 className="text-xl font-bold text-gray-700">
                    {crop.name}
                  </h3>
                  <p className="text-gray-600">
                    Área plantada: {crop.plantedArea} hectares
                  </p>
                  <p className="text-gray-600">
                    Data de plantio: {crop.plantedDate}
                  </p>
                  <p className="text-gray-600">
                    Data de colheita: {crop.harvestDate}
                  </p>
                  <p className="text-gray-600">
                    Fazenda associada: {crop.farmId}
                  </p>
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
                    <p className="text-gray-500">
                      Nenhum fertilizante associado.
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center h-full">
                <p className="text-center text-gray-600">
                  Nenhuma plantação encontrada para a data selecionada.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CropList;
