import React, { useState } from "react";

const Home: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="h-full">
      <div
        className="mx-auto p-4 bg-white shadow-md font-quicksand 
        bg-cover bg-center relative"
        style={{
          backgroundImage: `url('/fundoPlantas.png')`,
        }}
      >
        <main className="max-w-4xl mx-auto p-6 shadow-md rounded-lg font-quicksand backdrop-opacity-40 backdrop-invert bg-white/25">
          <h1 className="text-2xl sm:text-4xl md:text-4xl xl:text-4xl font-semibold text-center text-green-900 mb-6 p-2">
            Bem-vindo à <span className="font-extrabold">Agrix</span>
          </h1>
          <div className="">
            <p className="text-lg text-black-900 text-center mb-6">
              A <strong>API Agrix</strong> oferece uma plataforma completa para
              gerenciar fazendas, plantações e fertilizantes, com autenticação e
              controle de acesso integrados. Entre as principais funcionalidades
              da API, destacam-se:
            </p>

            <div className="text-center">
              <div
                className={`text-black-900 mb-6 ${
                  !showMore ? "line-clamp-4 sm-390:block" : ""
                }`}
              >
                <ul className="list-disc list-inside">
                  <li>
                    <strong>Gerenciamento de fazendas:</strong> Crie, liste,
                    visualize, atualize e delete fazendas através dos endpoints
                    em <code>/farms</code>.
                  </li>
                  <li>
                    <strong>Gestão de plantações:</strong> Adicione, liste e
                    modifique plantações dentro das fazendas, incluindo a
                    possibilidade de buscar plantações por data de colheita,
                    usando o endpoint <code>/crops</code>.
                  </li>
                  <li>
                    <strong>Controle de fertilizantes:</strong> Registre e
                    associe fertilizantes às plantações, além de listar todos os
                    fertilizantes disponíveis. O acesso a essa funcionalidade é
                    restrito a usuários com o role ADMIN, via{" "}
                    <code>/fertilizers</code>.
                  </li>
                  <li>
                    <strong>Autenticação e controle de acesso:</strong> Realize
                    o login e autentique-se para acessar os dados das fazendas,
                    plantações e fertilizantes de forma segura, com tokens JWT.
                  </li>
                </ul>

                <p className="text-lg text-black-900 text-center mt-4">
                  A plataforma Agrix é ideal para agricultores e gestores
                  agrícolas que buscam uma solução prática e segura para a
                  administração de suas propriedades e recursos.
                </p>
              </div>

              {/* Botão "Ler mais" apenas em telas menores que 370px */}
              {!showMore && (
                <div className="flex justify-center sm-390:hidden">
                  <button
                    onClick={() => setShowMore(true)}
                    className="text-green-600 font-bold"
                  >
                    Ler mais
                  </button>
                </div>
              )}
            </div>

            {/* Todo o conteúdo abaixo é ocultado até o clique em telas móveis */}
            <div className={`${showMore ? "" : "hidden"}`}>
              {/* Botão "Ler menos" apenas em dispositivos móveis */}
              {showMore && (
                <div className="flex justify-center sm-390:hidden mt-4">
                  <button
                    onClick={() => setShowMore(false)}
                    className="text-green-600 font-bold"
                  >
                    Ler menos
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
