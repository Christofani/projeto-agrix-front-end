import { useState } from 'react';
import Header from "../../components/Header";
import CreateCrop from "./CreateCrop";
import CropList from "./CropList";
import imagem from "../../images/imagemCrop2.webp";
import CropDetails from "./CropDetails";

function Crops() {
  const [activePage, setActivePage] = useState<
    "create" | "list" | "none" | "details"
  >("none");

  const [selectedCropId, setSelectedCropId] = useState<number | null>(null);
  const [showImage, setShowImage] = useState(true);

  const handlePageChange = (
    page: "create" | "list" | "details",
    cropId?: number
  ) => {
    setActivePage(page);
    setShowImage(false);
    if (cropId) {
      setSelectedCropId(cropId);
    }
  };

  const handleCancel = () => {
    setActivePage("none");
    setShowImage(true);
    setSelectedCropId(null);
  };

  return (
    <div className="font-quicksand bg-teal-100 min-h-screen w-full overflow-x-hidden ">
      <Header />
      {activePage === "none" && showImage && (
        <div className="flex justify-center mt-4 p-4 font-quicksand">
          <div className="space-x-4">
            <button
              onClick={() => handlePageChange("create")} // Ao clicar, exibe o formulário
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Criar nova plantação
            </button>
            <button
              onClick={() => handlePageChange("list")} // Para listar as fazendas
              className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-900"
            >
              Listar Plantações
            </button>
          </div>
        </div>
      )}
      {showImage && activePage === "none" && (
        <div className="flex justify-center items-center w-full overflow-hidden">
          <img
            src={imagem}
            alt="Imagem ilustrativa"
            className="w-full sm:max-w-sm h-auto object-cover rounded-lg mb-10"
          />
        </div>
      )}
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
          <CreateCrop onCancel={handleCancel} />
        </div>
      )}
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
          <CropList
            onNavigate={(cropId) => handlePageChange("details", cropId)}
          />
        </div>
      )}

      {activePage === "details" && selectedCropId && (
        <div className="p-4 md:p-8">
          <CropDetails cropId={selectedCropId} onBack={handleCancel} />
        </div>
      )}
    </div>
  );
}

export default Crops;
