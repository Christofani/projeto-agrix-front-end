import React from 'react';
import Header from '../../components/Header'; // Importe o Header
import { Outlet } from 'react-router-dom';
import imagem from '../../images/inicial.webp'
import Footer from '../../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
        <h1 className="text-4xl font-semibold text-center text-green-600 mb-6">
          Bem-vindo à <span className="font-extrabold">Agrix</span>
        </h1>

        {/* Imagem ilustrativa */}
        <div className="text-center mb-8">
          <img
            src={imagem} // Substitua pelo link da sua imagem
            alt="Agrix - Plataforma de gestão agrícola"
            className="w-full h-auto max-h-[44rem] object-cover rounded-lg shadow-lg" // A altura foi ajustada para 80 (20rem)
          />
        </div>

        {/* Descrição da API */}
        <p className="text-lg text-gray-700 text-center mb-6">
          A <strong>API Agrix</strong> oferece uma plataforma completa para gerenciar fazendas, plantações e fertilizantes, com autenticação e controle de acesso integrados. Entre as principais funcionalidades da API, destacam-se:
        </p>

        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li><strong>Gerenciamento de fazendas:</strong> Crie, liste, visualize, atualize e delete fazendas através dos endpoints em <code>/farms</code>.</li>
          <li><strong>Gestão de plantações:</strong> Adicione, liste e modifique plantações dentro das fazendas, incluindo a possibilidade de buscar plantações por data de colheita, usando o endpoint <code>/crops</code>.</li>
          <li><strong>Controle de fertilizantes:</strong> Registre e associe fertilizantes às plantações, além de listar todos os fertilizantes disponíveis. O acesso a essa funcionalidade é restrito a usuários com o role ADMIN, via <code>/fertilizers</code>.</li>
          <li><strong>Autenticação e controle de acesso:</strong> Realize o login e autentique-se para acessar os dados das fazendas, plantações e fertilizantes de forma segura, com tokens JWT.</li>
        </ul>

        <p className="text-lg text-gray-700 text-center">
          A plataforma Agrix é ideal para agricultores e gestores agrícolas que buscam uma solução prática e segura para a administração de suas propriedades e recursos.
        </p>

        <Outlet /> {/* Aqui você pode adicionar conteúdo das páginas aninhadas */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
