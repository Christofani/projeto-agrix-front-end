import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userName = localStorage.getItem("username");
  const navigate = useNavigate();

  // Função para deslogar o usuário
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  // Função para ver o usuário
  const handleViewUser = () => {
    navigate("/edit-user");
  };

  return (
    <header className="bg-teal-900 text-white p-3 font-quicksand">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Navegação */}
        <nav className="flex space-x-2">
          <Link to="/home" className="hover:bg-teal-700 px-2 py-1 rounded-md">
            Home
          </Link>
          <Link to="/farms" className="hover:bg-teal-700 px-2 py-1 rounded-md">
            Farms
          </Link>
          <Link to="/crops" className="hover:bg-teal-700 px-2 py-1 rounded-md">
            Crops
          </Link>
          <Link
            to="/fertilizers"
            className="hover:bg-teal-700 px-2 py-1 rounded-md"
          >
            Fertilizers
          </Link>
        </nav>

        {/* Ícone do usuário e nome */}
        <div className="relative flex items-center space-x-4 cursor-pointer">
          {/* Nome do usuário exibido em telas grandes */}
          <span
            className="hidden lg:block text-white cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {userName}
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white-700 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>

          {/* Card de opções - exibido de forma absoluta */}
          {isMenuOpen && (
            <div className="absolute right-0 bg-teal-500 shadow-md rounded mt-40 w-40 p-2 z-10 flex flex-col items-center justify-center">
              <button
                onClick={handleViewUser}
                className="w-full p-2 hover:bg-teal-600 rounded"
              >
                Ver Usuário
              </button>
              <button
                onClick={handleLogout}
                className="w-full p-2 hover:bg-teal-600 rounded flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
