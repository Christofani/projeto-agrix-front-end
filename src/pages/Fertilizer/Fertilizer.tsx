import { useState } from "react";
import Header from "../../components/Header";
import imagem from "../../images/fertilizer.webp";
import CreateFertilizer from "./CreateFertilizer";
import FertilizerList from "./FertilizerList";
import FertilizerDetails from "./FertilizerDetails";

function Fertilizer() {
  const [activePage, setActivePage] = useState<
    "create" | "list" | "none" | "details"
  >("none");

  const [selectedFetilizerId, setSelectedFetilizerId] = useState<number | null>(
    null
  );
  const [showImage, setShowImage] = useState(true);

  const handlePageChange = (
    page: "create" | "list" | "details",
    fertilizerId?: number
  ) => {
    setActivePage(page);
    setShowImage(false);
    if (fertilizerId) {
      setSelectedFetilizerId(fertilizerId);
    }
  };

  const handleCancel = () => {
    setActivePage("none");
    setShowImage(true);
    setSelectedFetilizerId(null);
  };

  return (
    <div className="font-quicksand bg-teal-100 min-h-screen w-full overflow-x-hidden ">
      <Header />
      {activePage === "none" && showImage && (
        <div className="flex justify-center mt-4 p-4">
          <div className="flex flex-col items-center mt-4 p-4 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => handlePageChange("create")}
              className="bg-gray-500 text-white w-full max-w-xs sm:w-auto py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Criar novo Fertilizante
            </button>
            <button
              onClick={() => handlePageChange("list")}
              className="bg-teal-700 text-white w-full max-w-xs sm:w-auto py-2 px-4 rounded-md hover:bg-teal-900"
            >
              Listar Fertilizantes
            </button>
          </div>
        </div>
      )}
      {showImage && activePage === "none" && (
        <div className="flex justify-center items-center w-full overflow-hidden">
          <img
            src={imagem}
            alt="Imagem ilustrativa"
            className="w-full max-w-xs sm:max-w-sm h-auto object-cover rounded-lg mb-10"
          ></img>
        </div>
      )}
      {activePage === "create" && (
        <div className="p-2 md:p-4">
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
          <CreateFertilizer onCancel={handleCancel} />
        </div>
      )}
      {activePage === "list" && (
        <div className="p-2 md:p-4">
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
          <FertilizerList
            onNavigate={(fertilizerId) => {
              if (fertilizerId) {
                handlePageChange("details", fertilizerId); // Vai para os detalhes da fazenda
              } else {
                handlePageChange("list"); // Vai para a criação da fazenda, sem farmId
              }
            }}
          />
        </div>
      )}

      {activePage === "details" && selectedFetilizerId && (
        <div className="p-4 md:p-8">
          <FertilizerDetails
            fertilizerId={selectedFetilizerId}
            onBack={() => handlePageChange("list")}
          />
        </div>
      )}
    </div>
  );
}

export default Fertilizer;
