import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  // Recupera o nome do usuário do localStorage
  const userName = localStorage.getItem("username");

  return (
    <header className="bg-teal-900 text-white p-3 font-quicksand">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
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
        <div className="flex items-center space-x-4">
          {/* Nome do usuário exibido em telas grandes */}
          <span className="hidden lg:block text-white">{userName}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white-700"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
