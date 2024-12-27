import { useState } from 'react';
import Header from "../../components/Header";
import CreateCrop from "./CreateCrop";
import CropList from "./CropList";
import imagem from "../../images/imagemCrop2.webp";

function Crops() {
  const [activePage, setActivePage] = useState<"create" | "list" | "none">(
    "none"
  );
  const [showImage, setShowImage] = useState(true);

  const handlePageChange = (page: "create" | "list") => {
    setActivePage(page);
    setShowImage(false); // Esconde a imagem ao mudar para o formulário ou lista
  };

  const handleCancel = () => {
    setActivePage("none");
    setShowImage(true); // Volta a mostrar os botões e a imagem
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
      {activePage === "create" && <CreateCrop onCancel={handleCancel} />}
      {activePage === "list" && <CropList />}
    </div>
  );
}

export default Crops;
