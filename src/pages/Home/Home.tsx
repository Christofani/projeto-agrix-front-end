import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div
        className="mx-auto p-8 bg-white shadow-md font-quicksand 
        bg-cover bg-center relative"
        style={{
          backgroundImage: `url('/fundoPlantas.png')`,
        }}
      >
        <main className="max-w-4xl mx-auto p-4  shadow-md rounded-lg font-quicksand backdrop-opacity-40 backdrop-invert bg-white/25 ">
          <h1 className="text-4xl font-semibold text-center text-green-900 mb-6 p-4">
            Bem-vindo à <span className="font-extrabold">Agrix</span>
          </h1>
          <div className="backdrop-opacity-20  ">
            <p className="text-lg text-black-900 text-center mb-6">
              A <strong>API Agrix</strong> oferece uma plataforma completa para
              gerenciar fazendas, plantações e fertilizantes, com autenticação e
              controle de acesso integrados. Entre as principais funcionalidades
              da API, destacam-se:
            </p>

            <ul className="list-disc list-inside text-black-900 mb-6">
              <li>
                <strong>Gerenciamento de fazendas:</strong> Crie, liste,
                visualize, atualize e delete fazendas através dos endpoints em{" "}
                <code>/farms</code>.
              </li>
              <li>
                <strong>Gestão de plantações:</strong> Adicione, liste e
                modifique plantações dentro das fazendas, incluindo a
                possibilidade de buscar plantações por data de colheita, usando
                o endpoint <code>/crops</code>.
              </li>
              <li>
                <strong>Controle de fertilizantes:</strong> Registre e associe
                fertilizantes às plantações, além de listar todos os
                fertilizantes disponíveis. O acesso a essa funcionalidade é
                restrito a usuários com o role ADMIN, via{" "}
                <code>/fertilizers</code>.
              </li>
              <li>
                <strong>Autenticação e controle de acesso:</strong> Realize o
                login e autentique-se para acessar os dados das fazendas,
                plantações e fertilizantes de forma segura, com tokens JWT.
              </li>
            </ul>

            <p className="text-lg text-black-900 text-center">
              A plataforma Agrix é ideal para agricultores e gestores agrícolas
              que buscam uma solução prática e segura para a administração de
              suas propriedades e recursos.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
