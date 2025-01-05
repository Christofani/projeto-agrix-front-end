import React, { useEffect, useState } from 'react';
import { Farm, FarmListProps } from "../../types/FarmType";
import api from "../../api"; // Configuração do Axios
import { Person } from "../../types/PersonType";

const FarmList: React.FC<FarmListProps> = ({ onNavigate }) => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [persons, setPersons] = useState<Person[]>([]); // Lista de proprietários
  const [selectedPersonId, setSelectedPersonId] = useState<number | "">(""); // Estado para o filtro

  const userRole = localStorage.getItem("role"); // Obtém a role do usuário logado

  useEffect(() => {
    const fetchFarmsAndPersons = async () => {
      try {
        const farmResponse = await api.get("/farms");
        setFarms(farmResponse.data);

        const personResponse = await api.get("/persons");
        setPersons(personResponse.data);
      } catch (err) {
        console.error("Erro ao buscar fazendas ou usuários:", err);
        setError("Erro ao carregar fazendas ou usuários.");
      } finally {
        setLoading(false);
      }
    };

    fetchFarmsAndPersons();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const personId = e.target.value;
    setSelectedPersonId(personId === "" ? "" : parseInt(personId, 10));
  };

  const filteredFarms = selectedPersonId
    ? farms.filter((farm) => farm.person.personId === selectedPersonId)
    : farms;

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

      {/* Filtro por proprietário, exibido apenas para ADMIN e MANAGER */}
      {(userRole === "ADMIN" || userRole === "MANAGER") && (
        <div className="mb-4">
          <label htmlFor="personId" className="block text-gray-700 font-medium">
            Filtrar por Proprietário:
          </label>
          <select
            id="personId"
            value={selectedPersonId}
            onChange={handleFilterChange}
            className="w-60 mt-2 mb-8 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Todos os Proprietários</option>
            {persons.map((person) => (
              <option key={person.personId} value={person.personId}>
                {person.username}
              </option>
            ))}
          </select>
        </div>
      )}

      {filteredFarms.length === 0 ? (
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
          {filteredFarms.map((farm) => (
            <div
              key={farm.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
              onClick={() => onNavigate(farm.id)} // Passa o farmId para navegação
            >
              <h3 className="text-xl font-bold text-gray-700">{farm.name}</h3>
              <p className="text-gray-600">Tamanho: {farm.size} hectares</p>
              <p className="text-gray-600">
                Proprietário: {farm.person.username}
              </p>{" "}
              {/* Exibindo o username do proprietário */}
              <p className="text-gray-600">
                Plantações: {farm.crops.length > 0 ? farm.crops.length : 0}{" "}
                {/* Exibe "0" se não houver plantações */}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmList;
