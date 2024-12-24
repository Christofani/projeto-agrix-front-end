import { useState } from 'react';
import Header from "../../components/Header";
import CreateCrop from "./CreateCrop";
import CropList from "./CropList";
import imagem from "../../images/plantinha.png"

function Crops() {
  const [activePage, setActivePage] = useState<'create' | 'list' | 'none'>('none');
  const [showImage, setShowImage] = useState(true);

  const handlePageChange = (page: 'create' | 'list') => {
    setActivePage(page);
    setShowImage(false); // Esconde a imagem ao mudar para o formulário ou lista
  };

  const handleCancel = () => {
    setActivePage('none');
    setShowImage(true); // Volta a mostrar os botões e a imagem
  };

  return (
    <div>
      <Header />
      {activePage === 'none' && showImage && (
        <div className="flex justify-center mt-10">
          <div className="space-x-4">
            <button
              onClick={() => handlePageChange('create')} // Ao clicar, exibe o formulário
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Criar nova plantação
            </button>
            <button
              onClick={() => handlePageChange('list')} // Para listar as fazendas
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Listar Plantações
            </button>
          </div>
        </div>
      )}

      {/* Imagem que será exibida quando activePage for 'none' */}
      {showImage && activePage === 'none' && (
        <div className="flex justify-center mt-6">
          <img
            src={imagem}
            alt="Imagem ilustrativa"
            className="w-64 h-auto rounded-lg"
          />
        </div>
      )}

      {/* Formulário de criação de plantação */}
      {activePage === 'create' && <CreateCrop onCancel={handleCancel} />}

      {/* Lista de plantações */}
      {activePage === 'list' && <CropList />}
    </div>
  );
}

export default Crops;
