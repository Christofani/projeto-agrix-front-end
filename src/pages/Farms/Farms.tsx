import { useState } from 'react';
import Header from "../../components/Header";
import CreateFarm from "./CreateFarm";
import FarmList from "./FarmList";
import FarmDetails from "./FarmDetails";
import imagem from "../../images/370a0abe-4df3-4e0c-a9fc-354d1d1cd50d.webp"; // Substitua pelo caminho correto da sua imagem

function Farms() {
  const [activePage, setActivePage] = useState<
    "create" | "list" | "details" | "none"
  >("none");
  const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null);
  const [showImage, setShowImage] = useState(true);

  const handlePageChange = (
    page: "create" | "list" | "details",
    farmId?: number
  ) => {
    setActivePage(page);
    setShowImage(false); // Esconde a imagem ao mudar de página
    if (farmId) {
      setSelectedFarmId(farmId); // Define o ID da fazenda selecionada, se fornecido
    }
  };

  const handleCancel = () => {
    setActivePage("none");
    setShowImage(true); // Volta a mostrar os botões e a imagem
    setSelectedFarmId(null); // Reseta o ID da fazenda
  };

  return (
    <div className="font-quicksand bg-teal-100 min-h-screen w-full overflow-x-hidden">
      <Header />

      {/* Exibe botões e imagem quando activePage for 'none' */}
      {activePage === "none" && showImage && (
        <div className="flex justify-center mt-4 p-4">
          <div className="space-x-4">
            <button
              onClick={() => handlePageChange("create")}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Criar nova Fazenda
            </button>
            <button
              onClick={() => handlePageChange("list")}
              className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-900"
            >
              Listar Fazendas
            </button>
          </div>
        </div>
      )}

      {/* Imagem que será exibida quando activePage for 'none' */}
      {showImage && activePage === "none" && (
        <div className="flex justify-center items-center w-full overflow-hidden">
          <img
            src={imagem}
            alt="Imagem ilustrativa"
            className="w-full max-w-xs sm:max-w-sm h-auto object-cover rounded-lg mb-10"
          />
        </div>
      )}

      {/* Formulário de criação de fazenda */}
      {activePage === "create" && (
        <div className="p-4 md:p-8">
          <button
            onClick={handleCancel}
            className="text-teal-700 hover:text-teal-900 flex items-center mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 transition-transform transform hover:scale-125"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <CreateFarm onCancel={handleCancel} />
        </div>
      )}

      {/* Lista de fazendas */}
      {activePage === "list" && (
        <div className="p-4 md:p-8">
          <button
            onClick={handleCancel}
            className="text-teal-700 hover:text-teal-900 flex items-center mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 transition-transform transform hover:scale-125"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <FarmList
            onNavigate={(farmId) => handlePageChange("details", farmId)}
          />
        </div>
      )}

      {/* Detalhes da fazenda */}
      {activePage === "details" && selectedFarmId && (
        <div className="p-4 md:p-8">
          <FarmDetails
            farmId={selectedFarmId}
            onBack={() => handlePageChange("list")}
          />
        </div>
      )}
    </div>
  );
}

export default Farms;
