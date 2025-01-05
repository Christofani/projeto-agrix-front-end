import React, { useEffect, useState } from "react";
import { Fertilizer, FertilizerListProps } from "../../types/FertilizerType";
import api from "../../api";
import { AxiosError } from "axios";

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

  const handleCardClick = async (fertilizerId: number) => {
    try {
      // Tente obter os detalhes do fertilizante, se necessário
      await api.get(`/fertilizers/${fertilizerId}`);
      onNavigate(fertilizerId); // Navega apenas se não houver erro
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        const errorMessage = err.response.data as string;
        if (err.response.status === 403) {
          // Erro de permissão (Status 403)
          alert(errorMessage || "Erro de permissão.");
          onNavigate();
        } else {
          // Outros erros
          alert(errorMessage || "Erro ao carregar o fertilizante.");
          setError(errorMessage || "Erro ao carregar o fertilizante.");
        }
      } else {
        console.error("Erro inesperado ao carregar o fertilizante:", err);
        alert("Erro inesperado ao carregar o fertilizante.");
        setError("Erro inesperado ao carregar o fertilizante.");
      }
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
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">
        Lista de Fertilizantes
      </h1>
      {fertilizers.length === 0 ? (
        <div className="flex justify-center items-center flex-col h-full space-y-4 mt-10">
          <p className="text-center font-semibold text-lg text-gray-700">
            Não há fertilizantes cadastrados. Crie um novo fertilizante
          </p>
          <button
            onClick={() => onNavigate()} // Chama onNavigate para ir para a criação
            className="bg-teal-700 text-white py-2 px-6 rounded-md hover:bg-teal-600"
          >
            Criar novo Fertilizante
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-8 my-10">
          {fertilizers.map((fertilizer) => (
            <div
              key={fertilizer.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
              onClick={() => handleCardClick(fertilizer.id)}
            >
              <h3 className="text-xl font-bold text-gray-700">
                {fertilizer.name}
              </h3>
              <p className="text-gray-600">Marca: {fertilizer.brand}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FertilizerList;
