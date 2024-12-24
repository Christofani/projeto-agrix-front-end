import { useState } from 'react';
import Header from "../../components/Header";
import CreateFarm from "./CreateFarm";
import FarmList from "./FarmList";
import imagem from "../../images/370a0abe-4df3-4e0c-a9fc-354d1d1cd50d.webp"; // Substitua pelo caminho correto da sua imagem

function Farms() {
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
              Criar nova Fazenda
            </button>
            <button
              onClick={() => handlePageChange('list')} // Para listar as fazendas
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Listar Fazendas
            </button>
          </div>
        </div>
      )}

      {/* Imagem que será exibida quando activePage for 'none' */}
      {showImage && activePage === 'none' && (
        <div className="flex justify-center mt-6">
          <img
            src={imagem} // Substitua pelo caminho correto da sua imagem
            alt="Imagem ilustrativa"
            className="w-full max-w-xs sm:max-w-sm h-auto rounded-lg"
          />
        </div>





      )}

      {/* Formulário de criação de fazenda */}
      {activePage === 'create' && <CreateFarm onCancel={handleCancel} />}

      {/* Lista de fazendas */}
      {activePage === 'list' && <FarmList />}
    </div>
  );
}

export default Farms;
