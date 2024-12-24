import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  // Recupera o nome do usuário armazenado no localStorage
  const username = localStorage.getItem('username') || 'Usuário';

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <nav className="flex space-x-4">
          <Link to="/home" className="hover:bg-blue-700 px-3 py-2 rounded-md">Home</Link>
          <Link to="/farms" className="hover:bg-blue-700 px-3 py-2 rounded-md">Farms</Link>
          <Link to="/crops" className="hover:bg-blue-700 px-3 py-2 rounded-md">Crops</Link>
          <Link to="/fertilizers" className="hover:bg-blue-700 px-3 py-2 rounded-md">Fertilizers</Link>
        </nav>
        <div className="text-right">
          <span>Bem-vindo, {username}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

